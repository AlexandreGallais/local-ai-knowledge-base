---
title: "Kubernetes API Concepts (part 6 of 7)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/using-api/api-concepts.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Kubernetes API Concepts (part 6 of 7)

## Resource versions

Resource versions are strings that identify the server's internal version of an
object. Resource versions can be used by clients to determine when objects have
changed, or to express data consistency requirements when getting, listing and
watching resources. Resource versions must be passed unmodified back to the
server.

Resource version strings are orderable as monotonically increasing integers
within the same resource type for all types served by kube-apiserver. This
includes built-in API types and types backed by custom resource definitions.
Both resource versions must be from objects of the same API group and resource
type. For example, two Deployments from the apps API group can have their
resource versions compared, but a Pod and a Deployment cannot. Provided that two
objects are retrieved from the same API resource type, you can compare them even
if they are in different namespaces.

If you are using API resources served by an extension API server, the client
needs to check whether the resource version string parses as a decimal number
(there are more details on that in the next few paragraphs). If either of two
resource version strings does not parse as a decimal number, the two strings can
be checked for equality but you **cannot** rely on comparisons for ordering.

Starting with Kubernetes 1.35, orderability of resource versions for all
Kubernetes types is included in Certified
Kubernetes
requirements. Base API objects and custom resources **must** be orderable as a
monotonically increasing integer for any 1.35+ APIServer implementation in order
to pass <example-value> tests.

In order to compare two resource version strings:

Ensure they meet the following requirements:
* Both resource versions must be from the same resource type as described above
* Both must start with a digit 1-9 and contain only digits 0-9
* Resource versions are compared as arbitrary bitsize decimal integers

To compare them without relying on a fixed bitsize one can compare them as
strings. The bitsize must not be assumed to be some fixed amount.

A lexicographical comparison can be used instead as shown here:
* If they are not of equal length, the longer one is greater (for example, "123" > "23")
* If they are of equal length, the lexicographically greater one is greater (for example, "234" > "123")

Some examples of resource version comparisons that should work:
* "2345678901234567890123456789012345678901" > "345678901234567890123456789012345678901"
* "345678901234567890123456789012345678901" == "345678901234567890123456789012345678901"
* "345678901234567890123456789012345678900" < "345678901234567890123456789012345678901"

A helper method is available for
client-go
to perform this comparison.

### `resourceVersion` fields in metadata {#resourceversion-in-metadata}

Clients find resource versions in resources, including the resources from the response
stream for a **watch**, or when using **list** to enumerate resources.

v1.meta/ObjectMeta -
The `metadata.resourceVersion` of a resource instance identifies the resource version the instance was last modified at.

v1.meta/ListMeta -
The `metadata.resourceVersion` of a resource collection (the response to a **list**) identifies the
resource version at which the collection was constructed.

### `resourceVersion` parameters in query strings {#the-resourceversion-parameter}

The **get**, **list**, and **watch** operations support the `resourceVersion` parameter.
From version v1.19, Kubernetes API servers also support the `resourceVersionMatch`
parameter on _list_ requests.

The API server interprets the `resourceVersion` parameter differently depending
on the operation you request, and on the value of `resourceVersion`. If you set
`resourceVersionMatch` then this also affects the way matching happens.

### Semantics for **get** and **list**

For **get** and **list**, the semantics of `resourceVersion` are:

**get:**

| resourceVersion unset | resourceVersion="0" | resourceVersion="{value other than 0}" |
|-----------------------|---------------------|----------------------------------------|
| Most Recent           | Any                 | Not older than                         |

**list:**

From version v1.19, Kubernetes API servers support the `resourceVersionMatch` parameter
on _list_ requests. If you set both `resourceVersion` and `resourceVersionMatch`, the
`resourceVersionMatch` parameter determines how the API server interprets
`resourceVersion`.

You should always set the `resourceVersionMatch` parameter when setting
`resourceVersion` on a **list** request. However, be prepared to handle the case
where the API server that responds is unaware of `resourceVersionMatch`
and ignores it.

Unless you have strong consistency requirements, using `resourceVersionMatch=NotOlderThan` and
a known `resourceVersion` is preferable since it can achieve better performance and scalability
of your cluster than leaving `resourceVersion` and `resourceVersionMatch` unset, which requires
quorum read to be served.

Setting the `resourceVersionMatch` parameter without setting `resourceVersion` is not valid.

This table explains the behavior of **list** requests with various combinations of
`resourceVersion` and `resourceVersionMatch`:

| resourceVersionMatch param          | paging params                  | resourceVersion not set | resourceVersion="0" | resourceVersion="{value other than 0}" |
|-------------------------------------|--------------------------------|-------------------------|---------------------|----------------------------------------|
| _unset_                             | _limit unset_                  | Most Recent             | Any                 | Not older than                         |
| _unset_                             | limit=\<n\>, _continue unset_  | Most Recent             | Any                 | Exact                                  |
| _unset_                             | limit=\<n\>, continue=\<token\>| Continuation            | Continuation        | Invalid, HTTP `400 Bad Request`        |
| `resourceVersionMatch=Exact`        | _limit unset_                  | Invalid                 | Invalid             | Exact                                  |
| `resourceVersionMatch=Exact`        | limit=\<n\>, _continue unset_  | Invalid                 | Invalid             | Exact                                  |
| `resourceVersionMatch=NotOlderThan` | _limit unset_                  | Invalid                 | Any                 | Not older than                         |
| `resourceVersionMatch=NotOlderThan` | limit=\<n\>, _continue unset_  | Invalid                 | Any                 | Not older than                         |

**Note:**
If your cluster's API server does not honor the `resourceVersionMatch` parameter,
the behavior is the same as if you did not set it.

The meaning of the **get** and **list** semantics are:

Any
: Return data at any resource version. The newest available resource version is preferred,
  but strong consistency is not required; data at any resource version may be served. It is possible
  for the request to return data at a much older resource version that the client has previously
  observed, particularly in high availability configurations, due to partitions or stale
  caches. Clients that cannot tolerate this should not use this semantic.
  Always served from _watch cache_, improving performance and reducing etcd load.

Most recent
: Return data at the most recent resource version. The returned data must be
  consistent (in detail: served from etcd via a quorum read).
  For etcd v3.4.31+ and v3.5.13+, Kubernetes  serves “most recent” reads from the _watch cache_:
  an internal, in-memory store within the API server that caches and mirrors the state of data
  persisted into etcd. Kubernetes requests progress notification to maintain cache consistency against
  the etcd persistence layer. Kubernetes v1.28 through to v1.30 also supported this
  feature, although as Alpha it was not recommended for production nor enabled by default until the v1.31 release.

Not older than
: Return data at least as new as the provided `resourceVersion`. The newest
  available data is preferred, but any data not older than the provided `resourceVersion` may be
  served. For **list** requests to servers that honor the `resourceVersionMatch` parameter, this
  guarantees that the collection's `.metadata.resourceVersion` is not older than the requested
  `resourceVersion`, but does not make any guarantee about the `.metadata.resourceVersion` of any
  of the items in that collection.
  Always served from _watch cache_, improving performance and reducing etcd load.

Exact
: Return data at the exact resource version provided. If the provided `resourceVersion` is
  unavailable, the server responds with HTTP `410 Gone`. For **list** requests to servers that honor the
  `resourceVersionMatch` parameter, this guarantees that the collection's `.metadata.resourceVersion`
  is the same as the `resourceVersion` you requested in the query string. That guarantee does
  not apply to the `.metadata.resourceVersion` of any items within that collection.
  With the `ListFromCacheSnapshot` feature gate enabled by default,
  API server will attempt to serve the response from snapshots if one is available with `resourceVersion` older than requested.
  This improves performance and reduces etcd load. API server starts with no snapshots,
  creates a new snapshot on every watch event and keeps them until it detects etcd is compacted or if cache is full with events older than 75 seconds.
  If the provided `resourceVersion` is unavailable, the server will fallback to etcd.

Continuation
: Return the next page of data for a paginated list request, ensuring consistency with the exact `resourceVersion` established by the initial request in the sequence.
  Response to **list** requests with limit include _continue token_, that encodes the  `resourceVersion` and last observed position from which to resume the list.
  If the `resourceVersion` in the provided _continue token_ is unavailable, the server responds with HTTP `410 Gone`.
  With the `ListFromCacheSnapshot` feature gate enabled by default,
  API server will attempt to serve the response from snapshots if one is available with `resourceVersion` older than requested.
  This improves performance and reduces etcd load. API server starts with no snapshots,
  creates a new snapshot on every watch event and keeps them until it detects etcd is compacted or if cache is full with events older than 75 seconds.
  If the `resourceVersion` in provided _continue token_ is unavailable, the server will fallback to etcd.

**Note:**
When you **list** resources and receive a collection response, the response includes the
list metadata
of the collection as well as
object metadata
for each item in that collection. For individual objects found within a collection response,
`.metadata.resourceVersion` tracks when that object was last updated, and not how up-to-date
the object is when served.

When using `resourceVersionMatch=NotOlderThan` and limit is set, clients must
handle HTTP `410 Gone` responses. For example, the client might retry with a
newer `resourceVersion` or fall back to `resourceVersion=""`.

When using `resourceVersionMatch=Exact` and `limit` is unset, clients must
verify that the collection's `.metadata.resourceVersion` matches
the requested `resourceVersion`, and handle the case where it does not. For
example, the client might fall back to a request with `limit` set.

### Semantics for **watch**

For **watch**, the semantics of resource version are:

**watch:**

| resourceVersion unset               | resourceVersion="0"        | resourceVersion="{value other than 0}" |
|-------------------------------------|----------------------------|----------------------------------------|
| Get State and Start at Most Recent  | Get State and Start at Any | Start at Exact                         |

The meaning of those **watch** semantics are:

Get State and Start at Any
: Start a **watch** at any resource version; the most recent resource version
  available is preferred, but not required. Any starting resource version is
  allowed. It is possible for the **watch** to start at a much older resource
  version that the client has previously observed, particularly in high availability
  configurations, due to partitions or stale caches. Clients that cannot tolerate
  this apparent rewinding should not start a **watch** with this semantic. To
  establish initial state, the **watch** begins with synthetic "Added" events for
  all resource instances that exist at the starting resource version. All following
  watch events are for all changes that occurred after the resource version the
  **watch** started at.

  **Caution:**
  **watches** initialized this way may return arbitrarily stale
  data. Please review this semantic before using it, and favor the other semantics
  where possible.

Get State and Start at Most Recent
: Start a **watch** at the most recent resource version, which must be consistent
  (in detail: served from etcd via a quorum read). To establish initial state,
  the **watch** begins with synthetic "Added" events of all resources instances
  that exist at the starting resource version. All following watch events are for
  all changes that occurred after the resource version the **watch** started at.

Start at Exact
: Start a **watch** at an exact resource version. The watch events are for all changes
  after the provided resource version. Unlike "Get State and Start at Most Recent"
  and "Get State and Start at Any", the **watch** is not started with synthetic
  "Added" events for the provided resource version. The client is assumed to already
  have the initial state at the starting resource version since the client provided
  the resource version.

### "410 Gone" responses

Servers are not required to serve all older resource versions and may return a HTTP
`410 (Gone)` status code if a client requests a `resourceVersion` older than the
server has retained. Clients must be able to tolerate `410 (Gone)` responses. See
Efficient detection of changes for details on
how to handle `410 (Gone)` responses when watching resources.

If you request a `resourceVersion` outside the applicable limit then, depending
on whether a request is served from cache or not, the API server may reply with a
`410 Gone` HTTP response.
