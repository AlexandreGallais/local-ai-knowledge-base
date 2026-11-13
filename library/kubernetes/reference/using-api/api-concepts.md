---
title: "Kubernetes API Concepts (part 1 of 7)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/using-api/api-concepts.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Kubernetes API Concepts

The Kubernetes API is a resource-based (RESTful) programmatic interface
provided via HTTP. It supports retrieving, creating, updating, and deleting
primary resources via the standard HTTP verbs (POST, PUT, PATCH, DELETE,
GET).

For some resources, the API includes additional subresources that allow
fine-grained authorization (such as separate views for Pod details and
log retrievals), and can accept and serve those resources in different
representations for convenience or efficiency.

Kubernetes supports efficient change notifications on resources via
_watches_:

Kubernetes also provides consistent list operations so that API clients can
effectively cache, track, and synchronize the state of resources.

You can view the API reference online,
or read on to learn about the API in general.

## Kubernetes API terminology {#standard-api-terminology}

Kubernetes generally leverages common RESTful terminology to describe the
API concepts:

* A *resource type* is the name used in the URL (`pods`, `namespaces`, `services`)
* All resource types have a concrete representation (their object schema) which is called a *kind*
* A list of instances of a resource type is known as a *collection*
* A single instance of a resource type is called a *resource*, and also usually represents an *object*
* For some resource types, the API includes one or more *sub-resources*, which are represented as URI paths below the resource

Most Kubernetes API resource types are
objects –
they represent a concrete instance of a concept on the cluster, like a
pod or namespace. A smaller number of API resource types are *virtual* in
that they often represent operations on objects, rather than objects, such
as a permission check
(use a POST with a JSON-encoded body of `SubjectAccessReview` to the
`subjectaccessreviews` resource), or the `eviction` sub-resource of a Pod
(used to trigger
API-initiated eviction).

### Object names

All objects you can create via the API have a unique object
name to allow idempotent creation and
retrieval, except that virtual resource types may not have unique names if they are
not retrievable, or do not rely on idempotency.

Within a namespace, an object's
unique identity is defined by the tuple of its **API Group**, **Resource**,
**Namespace**, and **Name**.

* **Cross-Group:** You can have two objects with the same name if they belong to
different API Groups (for example, `apps` vs. `example.com`).
* **Cross-Version:** Different API Versions (such as `v1` and `v1beta1`) of the
same Group and Resource represent the same underlying data. Creating an object
with the same name in a different version of the same group results in a name
clash, as they share the same identity in storage.

Some objects are not namespaced (for example: Nodes), and so their names must
be unique across the whole cluster.

### API verbs

Almost all object resource types support the standard HTTP verbs - GET, POST, PUT, PATCH,
and DELETE. Kubernetes also uses its own verbs, which are often written in lowercase to distinguish
them from HTTP verbs.

Kubernetes uses the term **list** to describe the action of returning a collection of
resources, to distinguish it from retrieving a single resource which is usually called
a **get**. If you sent an HTTP GET request with the `?watch` query parameter,
Kubernetes calls this a **watch** and not a **get**
(see Efficient detection of changes for more details).

For PUT requests, Kubernetes internally classifies these as either **create** or **update**
based on the state of the existing object. An **update** is different from a **patch**; the
HTTP verb for a **patch** is PATCH.

## Resource URIs

All resource types are either scoped by the cluster (`/apis/GROUP/VERSION/*`) or to a
namespace (`/apis/GROUP/VERSION/namespaces/NAMESPACE/*`). A namespace-scoped resource
type will be deleted when its namespace is deleted and access to that resource type
is controlled by authorization checks on the namespace scope.

Note: core resources use `/api` instead of `/apis` and omit the GROUP path segment.

Examples:

* `/api/v1/namespaces`
* `/api/v1/pods`
* `/api/v1/namespaces/my-namespace/pods`
* `/apis/apps/v1/deployments`
* `/apis/apps/v1/namespaces/my-namespace/deployments`
* `/apis/apps/v1/namespaces/my-namespace/deployments/my-deployment`

You can also access collections of resources (for example: listing all Nodes).
The following paths are used to retrieve collections and resources:

* Cluster-scoped resources:

  * `GET /apis/GROUP/VERSION/RESOURCETYPE` - return the collection of resources of the resource type
  * `GET /apis/GROUP/VERSION/RESOURCETYPE/NAME` - return the resource with NAME under the resource type

* Namespace-scoped resources:

  * `GET /apis/GROUP/VERSION/RESOURCETYPE` - return the collection of all
    instances of the resource type across all namespaces
  * `GET /apis/GROUP/VERSION/namespaces/NAMESPACE/RESOURCETYPE` - return
    collection of all instances of the resource type in NAMESPACE
  * `GET /apis/GROUP/VERSION/namespaces/NAMESPACE/RESOURCETYPE/NAME` -
    return the instance of the resource type with NAME in NAMESPACE

Since a namespace is a cluster-scoped resource type, you can retrieve the list
(“collection”) of all namespaces with `GET /api/v1/namespaces` and details about
a particular namespace with `GET /api/v1/namespaces/NAME`.

* Cluster-scoped subresource: `GET /apis/GROUP/VERSION/RESOURCETYPE/NAME/SUBRESOURCE`
* Namespace-scoped subresource: `GET /apis/GROUP/VERSION/namespaces/NAMESPACE/RESOURCETYPE/NAME/SUBRESOURCE`

The verbs supported for each subresource will differ depending on the object -
see the API reference for more information. It
is not possible to access sub-resources across multiple resources - generally a new
virtual resource type would be used if that becomes necessary.

## HTTP media types {#alternate-representations-of-resources}

Over HTTP, Kubernetes supports JSON, YAML, CBOR and Protobuf wire encodings.

By default, Kubernetes returns objects in JSON serialization, using the
`application/json` media type. Although JSON is the default, clients may request a response in
YAML, or use the more efficient binary Protobuf representation for better performance at scale.

The Kubernetes API implements standard HTTP content type negotiation: passing an
`Accept` header with a `GET` call will request that the server tries to return
a response in your preferred media type. If you want to send an object in Protobuf to
the server for a `PUT` or `POST` request, you must set the `Content-Type` request header
appropriately.

If you request an available media type, the API server returns a response with a suitable
`Content-Type`; if none of the media types you request are supported, the API server returns
a `406 Not acceptable` error message.
All built-in resource types support the `application/json` media type.

#### Chunked encoding of collections

For JSON and Protobuf encoding, Kubernetes implements custom encoders that write item, by item.
The feature doesn't change the output, but allows API server to avoid loading whole LIST response into memory.
Using other types of encoding (including pretty representation of JSON)
should be avoided for large collections of resources (>100MB) as it can have negative performance impact.

### JSON resource encoding {#json-encoding}

The Kubernetes API defaults to using JSON for encoding
HTTP message bodies.

For example:

1. List all of the pods on a cluster, without specifying a preferred format

   ```
   GET /api/v1/pods
   ```

   ```
   200 OK
   Content-Type: application/json

   … JSON encoded collection of Pods (PodList object)
   ```

1. Create a pod by sending JSON to the server, requesting a JSON response.

   ```
   POST /api/v1/namespaces/test/pods
   Content-Type: application/json
   Accept: application/json
   … JSON encoded Pod object
   ```

   ```
   200 OK
   Content-Type: application/json

   {
     "kind": "Pod",
     "apiVersion": "v1",
     …
   }
   ```

You can also request table and metadata-only
representations of this encoding.

### YAML resource encoding {#yaml-encoding}

Kubernetes also supports the `application/yaml`
media type for both requests and responses. `YAML`
can be used for defining Kubernetes manifests and API interactions.

For example:

1. List all of the pods on a cluster in YAML format

   ```
   GET /api/v1/pods
   Accept: application/yaml
   ```

   ```
   200 OK
   Content-Type: application/yaml

   … YAML encoded collection of Pods (PodList object)
   ```

1. Create a pod by sending YAML-encoded data to the server, requesting a YAML response:

   ```
   POST /api/v1/namespaces/test/pods
   Content-Type: application/yaml
   Accept: application/yaml
   … YAML encoded Pod object
   ```

   ```
   200 OK
   Content-Type: application/yaml

   apiVersion: v1
   kind: Pod
   metadata:
     name: my-pod
     …
   ```

You can also request table and metadata-only
representations of this encoding.

### Kubernetes Protobuf encoding {#protobuf-encoding}

Kubernetes uses an envelope wrapper to encode Protobuf responses.
That wrapper starts with a 4 byte magic number to help identify content in disk or in etcd as Protobuf
(as opposed to JSON). The 4 byte magic number data is followed by a Protobuf encoded wrapper message, which
describes the encoding and type of the underlying object. Within the Protobuf wrapper message,
the inner object data is recorded using the `raw` field of Unknown (see the IDL
for more detail).

For example:

1. List all of the pods on a cluster in Protobuf format.

   ```
   GET /api/v1/pods
   Accept: application/vnd.kubernetes.protobuf
   ```

   ```
   200 OK
   Content-Type: application/vnd.kubernetes.protobuf

   … binary encoded collection of Pods (PodList object)
   ```

1. Create a pod by sending Protobuf encoded data to the server, but request a response
   in JSON.

   ```
   POST /api/v1/namespaces/test/pods
   Content-Type: application/vnd.kubernetes.protobuf
   Accept: application/json
   … binary encoded Pod object
   ```

   ```
   200 OK
   Content-Type: application/json

   {
     "kind": "Pod",
     "apiVersion": "v1",
     ...
   }
   ```

You can use both techniques together and use Kubernetes' Protobuf encoding to interact with any API that
supports it, for both reads and writes. Only some API resource types are compatible
with Protobuf.

The wrapper format is:

```
A four byte magic number prefix:
  Bytes 0-3: "k8s\x00" [0x6b, 0x38, 0x73, 0x00]

An encoded Protobuf message with the following IDL:
  message Unknown {
    // typeMeta should have the string values for "kind" and "apiVersion" as set on the JSON object
    optional TypeMeta typeMeta = 1;

    // raw will hold the complete serialized object in protobuf. See the protobuf definitions in the client libraries for a given kind.
    optional bytes raw = 2;

    // contentEncoding is encoding used for the raw data. Unspecified means no encoding.
    optional string contentEncoding = 3;

    // contentType is the serialization method used to serialize 'raw'. Unspecified means application/vnd.kubernetes.protobuf and is usually
    // omitted.
    optional string contentType = 4;
  }

  message TypeMeta {
    // apiVersion is the group/version for this type
    optional string apiVersion = 1;
    // kind is the name of the object schema. A protobuf definition should exist for this object.
    optional string kind = 2;
  }
```

**Note:**
Clients that receive a response in `application/vnd.kubernetes.protobuf` that does
not match the expected prefix should reject the response, as future versions may need
to alter the serialization format in an incompatible way and will do so by changing
the prefix.

You can also request table and metadata-only
representations of this encoding.

#### Compatibility with Kubernetes Protobuf {#protobuf-encoding-compatibility}

Not all API resource types support Kubernetes' Protobuf encoding; specifically, Protobuf isn't
available for resources that are defined as
CustomResourceDefinitions
or are served via the
aggregation layer.

As a client, if you might need to work with extension types you should specify multiple
content types in the request `Accept` header to support fallback to JSON.
For example:

```
Accept: application/vnd.kubernetes.protobuf, application/json
```

### CBOR resource encoding {#cbor-encoding}

**Feature state:**

With the `CBORServingAndStorage` feature gate
enabled, request and response bodies for all built-in resource types and all resources defined by a
CustomResourceDefinition may be encoded to the
CBOR binary data format. CBOR is also supported at the
aggregation layer if it is enabled in
individual aggregated API servers.

Clients should indicate the IANA media type `application/cbor` in the `Content-Type` HTTP request
header when the request body contains a single CBOR
encoded data item, and in the `Accept` HTTP request
header when prepared to accept a CBOR encoded data item in the response. API servers will use
`application/cbor` in the `Content-Type` HTTP response header when the response body contains a
CBOR-encoded object.

If an API server encodes its response to a watch request using
CBOR, the response body will be a CBOR Sequence and the
`Content-Type` HTTP response header will use the IANA media type `application/cbor-seq`. Each entry
of the sequence (if any) is a single CBOR-encoded watch event.

In addition to the existing `application/apply-patch+yaml` media type for YAML-encoded
server-side apply configurations, API servers that enable CBOR will accept the
`application/apply-patch+cbor` media type for CBOR-encoded server-side apply configurations. There
is no supported CBOR equivalent for `application/json-patch+json` or `application/merge-patch+json`,
or `application/strategic-merge-patch+json`.

You can also request table and metadata-only
representations of this encoding.
