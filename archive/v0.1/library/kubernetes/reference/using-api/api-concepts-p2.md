---
title: "Kubernetes API Concepts (part 2 of 7)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/using-api/api-concepts.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Kubernetes API Concepts (part 2 of 7)

## Efficient detection of changes

The Kubernetes API allows clients to make an initial request for an object or a
collection, and then to track changes since that initial request: a **watch**. Clients
can send a **list** or a **get** and then make a follow-up **watch** request.

To make this change tracking possible, every Kubernetes object has a `resourceVersion`
field representing the version of that resource as stored in the underlying persistence
layer. When retrieving a collection of resources (either namespace or cluster scoped),
the response from the API server contains a `resourceVersion` value. The client can
use that `resourceVersion` to initiate a **watch** against the API server.

When you send a **watch** request, the API server responds with a stream of
changes. These changes itemize the outcome of operations (such as **create**, **delete**,
and **update**) that occurred after the `resourceVersion` you specified as a parameter
to the **watch** request. The overall **watch** mechanism allows a client to fetch
the current state and then subscribe to subsequent changes, without missing any events.

If a client **watch** is disconnected then that client can start a new **watch** from
the last returned `resourceVersion`; the client could also perform a fresh **get** /
**list** request and begin again. See Resource Version Semantics
for more detail.

For example:

1. List all of the pods in a given namespace.

   ```http
   GET /api/v1/namespaces/test/pods
   ---
   200 OK
   Content-Type: application/json

   {
     "kind": "PodList",
     "apiVersion": "v1",
     "metadata": {"resourceVersion":"10245"},
     "items": [...]
   }
   ```

2. Starting from resource version 10245, receive notifications of any API operations
   (such as **create**, **delete**, **patch** or **update**) that affect Pods in the
   _test_ namespace. Each change notification is a JSON document. The HTTP response body
   (served as `application/json`) consists a series of JSON documents.

   ```http
   GET /api/v1/namespaces/test/pods?watch=1&resourceVersion=10245
   ---
   200 OK
   Transfer-Encoding: chunked
   Content-Type: application/json

   {
     "type": "ADDED",
     "object": {"kind": "Pod", "apiVersion": "v1", "metadata": {"resourceVersion": "10596", ...}, ...}
   }
   {
     "type": "MODIFIED",
     "object": {"kind": "Pod", "apiVersion": "v1", "metadata": {"resourceVersion": "11020", ...}, ...}
   }
   ...
   ```

A given Kubernetes server will only preserve a historical record of changes for a
limited time. Clusters using etcd 3 preserve changes in the last 5 minutes by default.
When the requested **watch** operations fail because the historical version of that
resource is not available, clients must handle the case by recognizing the status code
`410 Gone`, clearing their local cache, performing a new **get** or **list** operation,
and starting the **watch** from the `resourceVersion` that was returned.

For subscribing to collections, Kubernetes client libraries typically offer some form
of standard tool for this **list**-then-**watch** logic. (In the Go client library,
this is called a `Reflector` and is located in the `k8s.io/client-go/tools/cache` package.)

### Watch bookmarks {#watch-bookmarks}

To mitigate the impact of short history window, the Kubernetes API provides a watch
event named `BOOKMARK`. It is a special kind of event to mark that all changes up
to a given `resourceVersion` the client is requesting have already been sent. The
document representing the `BOOKMARK` event is of the type requested by the request,
but only includes a `.metadata.resourceVersion` field. For example:

```http
GET /api/v1/namespaces/test/pods?watch=1&resourceVersion=10245&allowWatchBookmarks=true
---
200 OK
Transfer-Encoding: chunked
Content-Type: application/json

{
  "type": "ADDED",
  "object": {"kind": "Pod", "apiVersion": "v1", "metadata": {"resourceVersion": "10596", ...}, ...}
}
...
{
  "type": "BOOKMARK",
  "object": {"kind": "Pod", "apiVersion": "v1", "metadata": {"resourceVersion": "12746"} }
}
```

As a client, you can request `BOOKMARK` events by setting the
`allowWatchBookmarks=true` query parameter to a **watch** request, but you shouldn't
assume bookmarks are returned at any specific interval, nor can clients assume that
the API server will send any `BOOKMARK` event even when requested.

## Streaming lists

**Feature state:**

On large clusters, retrieving the collection of some resource types may result in
a significant increase of resource usage (primarily RAM) on the control plane.
To alleviate the impact and simplify the user experience of the **list** + **watch**
pattern, Kubernetes v1.32 promotes to beta the feature that allows requesting the initial state
(previously requested via the **list** request) as part of the **watch** request.

On the client-side the initial state can be requested by specifying `sendInitialEvents=true` as query string parameter
in a **watch** request. If set, the API server starts the watch stream with synthetic init
events (of type `ADDED`) to build the whole state of all existing objects followed by a
`BOOKMARK` event
(if requested via `allowWatchBookmarks=true` option). The bookmark event includes the resource version
to which is synced. After sending the bookmark event, the API server continues as for any other **watch**
request.

When you set `sendInitialEvents=true` in the query string, Kubernetes also requires that you set
`resourceVersionMatch` to `NotOlderThan` value.
If you provided `resourceVersion` in the query string without providing a value or don't provide
it at all, this is interpreted as a request for _consistent read_;
the bookmark event is sent when the state is synced at least to the moment of a consistent read
from when the request started to be processed. If you specify `resourceVersion` (in the query string),
the bookmark event is sent when the state is synced at least to the provided resource version.

### Example {#example-streaming-lists}

An example: you want to watch a collection of Pods. For that collection, the current resource version
is 10245 and there are two pods: `foo` and `bar`. Then sending the following request (explicitly requesting
_consistent read_ by setting empty resource version using `resourceVersion=`) could result
in the following sequence of events:

```http
GET /api/v1/namespaces/test/pods?watch=1&sendInitialEvents=true&allowWatchBookmarks=true&resourceVersion=&resourceVersionMatch=NotOlderThan
---
200 OK
Transfer-Encoding: chunked
Content-Type: application/json

{
  "type": "ADDED",
  "object": {"kind": "Pod", "apiVersion": "v1", "metadata": {"resourceVersion": "8467", "name": "foo"}, ...}
}
{
  "type": "ADDED",
  "object": {"kind": "Pod", "apiVersion": "v1", "metadata": {"resourceVersion": "5726", "name": "bar"}, ...}
}
{
  "type": "BOOKMARK",
  "object": {"kind": "Pod", "apiVersion": "v1", "metadata": {"resourceVersion": "10245"} }
}
...
<followed by regular watch stream starting from resourceVersion="10245">
```

## Sharded list and watch {#sharded-list-and-watch}

**Feature state:**

On large clusters, controllers that watch high-cardinality resource types (such as Pods
or Endpoints) may consume significant network bandwidth and CPU by receiving and
deserializing the full event stream, even when they only need a subset of objects.
Sharded list and watch allows horizontally scaled controllers to split the workload
so that each replica only receives the events it is responsible for.

Kubernetes  introduces an alpha feature that allows clients
to request a **filtered shard** of objects from the API server, using hash-based
partitioning on metadata fields. To use this feature, enable the `ShardedListAndWatch`
feature gate on the
API server. When enabled, the API server filters both list responses and watch event
streams server-side, delivering only the objects and events whose hashed metadata value
falls within the requested range.

### The shardSelector field

The `ShardSelector` field on
`ListOptions`
accepts a CEL-based expression using the `shardRange()` function:

```
shardRange(<field-path>, '<hex-start>', '<hex-end>')
```

Where:

- **`<field-path>`** is the metadata field to hash, using CEL-style object-rooted syntax.
  Currently supported paths are:
  - `object.metadata.uid`
  - `object.metadata.namespace`
- **`<hex-start>`** is the inclusive lower bound of the hash range, as a `0x`-prefixed
  16-digit lowercase hex string (for example, `'0x0000000000000000'`).
- **`<hex-end>`** is the exclusive upper bound, as a `0x`-prefixed hex string. The maximum
  value is `'0x10000000000000000'` (2^64).

The API server computes a deterministic 64-bit
FNV-1a
hash of the specified field value and returns only objects whose hash falls within the
range `[start, end)`. The hash function produces the same result for the same input
across all API server instances, so sharded requests are safe to use with multiple
API server replicas.

You can combine multiple ranges with `||` (logical OR) to cover non-contiguous parts of
the hash space. All ranges in a single expression must use the same field path.

### Using sharded list and watch in controllers {#sharded-list-and-watch-controllers}

Controllers typically use informers
to list and watch resources. To shard the workload across replicas, each replica
injects the `ShardSelector` field into the `ListOptions` used by its informers.

The standard way to do this is with `WithTweakListOptions` when constructing a
shared informer factory. The tweak function runs before every list and watch call
the informer makes, so the shard selector is applied consistently:

```go
import (
    metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
    "k8s.io/client-go/informers"
)

// shardSelector is determined by the replica's identity (e.g. from a
// StatefulSet ordinal or lease-based assignment). Each replica claims a
// non-overlapping range of the hash space.
shardSelector := "shardRange(object.metadata.uid, '0x0000000000000000', '0x8000000000000000')"

factory := informers.NewSharedInformerFactoryWithOptions(client, resyncPeriod,
    informers.WithTweakListOptions(func(opts *metav1.ListOptions) {
        opts.ShardSelector = shardSelector
    }),
)
```

With this configuration, every informer created from the factory only lists and
watches objects whose hashed UID falls within the assigned range. Each replica
receives a disjoint subset of the full collection, reducing per-replica network
traffic and memory usage.

For a 2-replica deployment, the selectors would be:

```go
// Replica 0: lower half of the hash space
"shardRange(object.metadata.uid, '0x0000000000000000', '0x8000000000000000')"

// Replica 1: upper half of the hash space
"shardRange(object.metadata.uid, '0x8000000000000000', '0x10000000000000000')"
```

A single replica can also handle non-contiguous ranges using `||`:

```go
"shardRange(object.metadata.uid, '0x0000000000000000', '0x4000000000000000') || " +
    "shardRange(object.metadata.uid, '0x8000000000000000', '0xc000000000000000')"
```

### Shard information in responses

When the API server honors a `ShardSelector`, the list response includes a `shardInfo`
field in the list `metadata`. This echoes back the selector so clients can verify which
shard they received. For watch streams, the shard selector applies equally: the API
server only sends events for objects whose hash falls within the requested range.

```json
{
  "kind": "PodList",
  "apiVersion": "v1",
  "metadata": {
    "resourceVersion": "10245",
    "shardInfo": {
      "selector": "shardRange(object.metadata.uid, '0x0000000000000000', '0x8000000000000000')"
    }
  },
  "items": [...]
}
```

**Note:**
A list response that contains `shardInfo` represents a filtered subset of the full
collection. Clients should not treat sharded list responses as a complete representation
of the resource type.

### Detecting server support

If the API server does not support sharded list and watch (because the feature gate is
not enabled, or the server is an older version), the `ShardSelector` field is ignored
and the server returns the full, unfiltered result set. Clients can detect this by
checking for the presence of `shardInfo` in the list response metadata. If `shardInfo`
is absent, the server did not honor the shard selector and the client received the
complete, unfiltered collection. In this case, the client should be prepared to handle
the full result set, for example by applying client-side filtering to discard objects
outside its assigned shard range.

## Response compression

**Feature state:**

`APIResponseCompression` is an option that allows the API server to compress the responses for **get**
and **list** requests, reducing the network bandwidth and improving the performance of large-scale clusters.
It is enabled by default since Kubernetes 1.16 and it can be disabled by including
`APIResponseCompression=false` in the `--feature-gates` flag on the API server.

API response compression can significantly reduce the size of the response, especially for large resources or
collections.
For example, a **list** request for pods can return hundreds of kilobytes or even megabytes of data,
depending on the number of pods and their attributes. By compressing the response, the network bandwidth
can be saved and the latency can be reduced.

To verify if `APIResponseCompression` is working, you can send a **get** or **list** request to the
API server with an `Accept-Encoding` header, and check the response size and headers. For example:

```http
GET /api/v1/pods
Accept-Encoding: gzip
---
200 OK
Content-Type: application/json
content-encoding: gzip
...
```

The `content-encoding` header indicates that the response is compressed with `gzip`.
