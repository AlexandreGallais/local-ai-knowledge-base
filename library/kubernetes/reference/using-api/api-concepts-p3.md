---
title: "Kubernetes API Concepts (part 3 of 7)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/using-api/api-concepts.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Kubernetes API Concepts (part 3 of 7)

## Retrieving large results sets in chunks

**Feature state:**

On large clusters, retrieving the collection of some resource types may result in
very large responses that can impact the server and client. For instance, a cluster
may have tens of thousands of Pods, each of which is equivalent to roughly 2 KiB of
encoded JSON. Retrieving all pods across all namespaces may result in a very large
response (10-20MB) and consume a large amount of server resources.

The Kubernetes API server supports the ability to break a single large collection request
into many smaller chunks while preserving the consistency of the total request. Each
chunk can be returned sequentially which reduces both the total size of the request and
allows user-oriented clients to display results incrementally to improve responsiveness.

You can request that the API server handles a **list** by serving single collection
using pages (which Kubernetes calls _chunks_). To retrieve a single collection in
chunks, two query parameters `limit` and `continue` are supported on requests against
collections, and a response field `continue` is returned from all **list** operations
in the collection's `metadata` field. A client should specify the maximum results they
wish to receive in each chunk with `limit` and the server will return up to `limit`
resources in the result and include a `continue` value if there are more resources
in the collection.

As an API client, you can then pass this `continue` value to the API server on the
next request, to instruct the server to return the next page (_chunk_) of results. By
continuing until the server returns an empty `continue` value, you can retrieve the
entire collection.

Like a **watch** operation, a `continue` token will expire after a short amount
of time (by default 5 minutes) and return a `410 Gone` if more results cannot be
returned. In this case, the client will need to start from the beginning or omit the
`limit` parameter.

For example, if there are 1,253 pods on the cluster and you want to receive chunks
of 500 pods at a time, request those chunks as follows:

1. List all of the pods on a cluster, retrieving up to 500 pods each time.

   ```http
   GET /api/v1/pods?limit=500
   ---
   200 OK
   Content-Type: application/json

   {
     "kind": "PodList",
     "apiVersion": "v1",
     "metadata": {
       "resourceVersion":"10245",
       "continue": "ENCODED_CONTINUE_TOKEN",
       "remainingItemCount": 753,
       ...
     },
     "items": [...] // returns pods 1-500
   }
   ```

1. Continue the previous call, retrieving the next set of 500 pods.

   ```http
   GET /api/v1/pods?limit=500&continue=ENCODED_CONTINUE_TOKEN
   ---
   200 OK
   Content-Type: application/json

   {
     "kind": "PodList",
     "apiVersion": "v1",
     "metadata": {
       "resourceVersion":"10245",
       "continue": "ENCODED_CONTINUE_TOKEN_2",
       "remainingItemCount": 253,
       ...
     },
     "items": [...] // returns pods 501-1000
   }
   ```

1. Continue the previous call, retrieving the last 253 pods.

   ```http
   GET /api/v1/pods?limit=500&continue=ENCODED_CONTINUE_TOKEN_2
   ---
   200 OK
   Content-Type: application/json

   {
     "kind": "PodList",
     "apiVersion": "v1",
     "metadata": {
       "resourceVersion":"10245",
       "continue": "", // continue token is empty because we have reached the end of the list
       ...
     },
     "items": [...] // returns pods 1001-1253
   }
   ```

Notice that the `resourceVersion` of the collection remains constant across each request,
indicating the server is showing you a consistent snapshot of the pods. Pods that
are created, updated, or deleted after version `10245` would not be shown unless
you make a separate **list** request without the `continue` token. This allows you
to break large requests into smaller chunks and then perform a **watch** operation
on the full set without missing any updates.

`remainingItemCount` is the number of subsequent items in the collection that are not
included in this response. If the **list** request contained label or field
selectors then the number of
remaining items is unknown and the API server does not include a `remainingItemCount`
field in its response.
If the **list** is complete (either because it is not chunking, or because this is the
last chunk), then there are no more remaining items and the API server does not include a
`remainingItemCount` field in its response. The intended use of the `remainingItemCount`
is estimating the size of a collection.

## Collections

In Kubernetes terminology, the response you get from a **list** is
a _collection_. However, Kubernetes defines concrete kinds for
collections of different types of resource. Collections have a kind
named for the resource kind, with `List` appended.

When you query the API for a particular type, all items returned by that query are
of that type. For example, when you **list** Services, the collection response
has `kind` set to
`ServiceList`;
each item in that collection represents a single Service. For example:

```http
GET /api/v1/services
```

```yaml
{
  "kind": "ServiceList",
  "apiVersion": "v1",
  "metadata": {
    "resourceVersion": "2947301"
  },
  "items": [
    {
      "metadata": {
        "name": "kubernetes",
        "namespace": "default",
...
      "metadata": {
        "name": "kube-dns",
        "namespace": "kube-system",
...
```

There are dozens of collection types (such as `PodList`, `ServiceList`,
and `NodeList`) defined in the Kubernetes API.
You can get more information about each collection type from the
Kubernetes API documentation.

Some tools, such as `kubectl`, represent the Kubernetes collection
mechanism slightly differently from the Kubernetes API itself.
Because the output of `kubectl` might include the response from
multiple **list** operations at the API level, `kubectl` represents
a list of items using `kind: List`. For example:

```shell
kubectl get services -A -o yaml
```
```yaml
apiVersion: v1
kind: List
metadata:
  resourceVersion: ""
  selfLink: ""
items:
- apiVersion: v1
  kind: Service
  metadata:
    creationTimestamp: "2021-06-03T14:54:12Z"
    labels:
      component: apiserver
      provider: kubernetes
    name: kubernetes
    namespace: default
...
- apiVersion: v1
  kind: Service
  metadata:
    annotations:
      prometheus.io/port: "9153"
      prometheus.io/scrape: "true"
    creationTimestamp: "2021-06-03T14:54:14Z"
    labels:
      k8s-app: kube-dns
      kubernetes.io/cluster-service: "true"
      kubernetes.io/name: CoreDNS
    name: kube-dns
    namespace: kube-system
```

**Note:**
Keep in mind that the Kubernetes API does not have a `kind` named `List`.

`kind: List` is a client-side, internal implementation detail for processing
collections that might be of different kinds of object. Avoid depending on
`kind: List` in automation or other code.

## Table fetches

When you run `kubectl get`, the default output format is a simple tabular
representation of one or more instances of a particular resource type. In the past,
clients were required to reproduce the tabular and describe output implemented in
`kubectl` to perform simple lists of objects.
A few limitations of that approach include non-trivial logic when dealing with
certain objects. Additionally, types provided by API aggregation or third party
resources are not known at compile time. This means that generic implementations
had to be in place for types unrecognized by a client.

In order to avoid potential limitations as described above, clients may request
the Table representation of objects, delegating specific details of printing to the
server. The Kubernetes API implements standard HTTP content type negotiation: passing
an `Accept` header containing a value of `application/json;as=Table;g=meta.k8s.io;v=v1`
with a `GET` call will request that the server return objects in the Table content
type.

For example, list all of the pods on a cluster in the Table format.

```http
GET /api/v1/pods
Accept: application/json;as=Table;g=meta.k8s.io;v=v1
---
200 OK
Content-Type: application/json

{
    "kind": "Table",
    "apiVersion": "meta.k8s.io/v1",
    ...
    "columnDefinitions": [
        ...
    ]
}
```

For API resource types that do not have a custom Table definition known to the control
plane, the API server returns a default Table response that consists of the resource's
`name` and `creationTimestamp` fields.

```http
GET /apis/crd.example.com/v1alpha1/namespaces/default/resources
---
200 OK
Content-Type: application/json
...

{
    "kind": "Table",
    "apiVersion": "meta.k8s.io/v1",
    ...
    "columnDefinitions": [
        {
            "name": "Name",
            "type": "string",
            ...
        },
        {
            "name": "Created At",
            "type": "date",
            ...
        }
    ]
}
```

Not all API resource types support a Table response; for example, a
CustomResourceDefinitions
might not define field-to-table mappings, and an APIService that
extends the core Kubernetes API
might not serve Table responses at all. If you are implementing a client that
uses the Table information and must work against all resource types, including
extensions, you should make requests that specify multiple content types in the
`Accept` header. For example:

```
Accept: application/json;as=Table;g=meta.k8s.io;v=v1, application/json
```

If the client indicates it only accepts `...;as=Table;g=meta.k8s.io;v=v1`, servers
that don't support table responses will return a 406 error code.

If falling back to full objects in that case is desired, clients can add `,application/json`
(or any other supported encoding) to their Accept header, and handle either
table or full objects in the response:

```http
Accept: application/json;as=Table;g=meta.k8s.io;v=v1,application/json`
```

For more information on content type negotiation, see the
MDN Content Negotiation.

## Metadata-only fetches

To request partial object metadata, you can request metadata only responses in the `Accept`
header. The Kubernetes API implements a variation on HTTP content type negotiation.
As a client, you can provide an `Accept` header with the desired media type,
along with parameters that indicate you want only metadata.
For example: `Accept: application/json;as=PartialObjectMetadata;g=meta.k8s.io;v=v1`
for JSON for a specific object and:
`Accept: application/json;as=PartialObjectMetadataList;g=meta.k8s.io;v=v1` for a list.

**Note:**
`as=PartialObjectMetadata` should be used in specific resource requests, and `as=PartialObjectMetadataList` should be used for lists.

For example, to list all of the pods in a cluster, across all namespaces, but returning only the metadata for each pod:

```http
GET /api/v1/pods
Accept: application/json;as=PartialObjectMetadataList;g=meta.k8s.io;v=v1
---
200 OK
Content-Type: application/json

{
    "kind": "PartialObjectMetadataList",
    "apiVersion": "meta.k8s.io/v1",
    "metadata": {
        "resourceVersion": "...",
    },
    "items": [
        {
            "apiVersion": "meta.k8s.io/v1",
            "kind": "PartialObjectMetadata",
            "metadata": {
                "name": "pod-1",
                ...
            }
        },
        {
            "apiVersion": "meta.k8s.io/v1",
            "kind": "PartialObjectMetadata",
            "metadata": {
                "name": "pod-2",
                ...
            }
        }
    ]
}
```

For a request for a collection, the API server returns a PartialObjectMetadataList.
For a request for a single object, the API server returns a PartialObjectMetadata
representation of the
object. In both cases, the returned objects only contain the `metadata` field.
The `spec` and `status` fields are omitted.

This feature is useful for clients that only need to check for the existence of
an object, or that only need to read its metadata. It can significantly reduce
the size of the response from the API server.

You can request a metadata-only fetch for all available media types (JSON, YAML, CBOR and Kubernetes Protobuf).
For Protobuf, the
`Accept` header would be
`application/vnd.kubernetes.protobuf;as=PartialObjectMetadata;g=meta.k8s.io;v=v1`.

The Kubernetes API server supports partial fetching for nearly all of its built-in APIs.
However, you can use Kubernetes to access other API servers via the
aggregation layer, and those
APIs may not support partial fetches.

If a client uses the `Accept` header to **only** request a response `...;as=PartialObjectMetadata;g=meta.k8s.io;v=v1`,
and accesses an API that doesn't support partial responses, Kubernetes responds
with a 406 HTTP error.

If falling back to full objects in that case is desired, clients can add `,application/json`
(or any other supported encoding) to their Accept header, and handle either
PartialObjectMetadata or full objects in the response. It's a good idea to specify
that a partial response is preferred, using the `q` (_quality_) parameter. For example:

```http
Accept: application/json;as=PartialObjectMetadata;g=meta.k8s.io;v=v1, application/json;q=0.9
```

For more information on content type negotiation, see the
MDN Content Negotiation.
