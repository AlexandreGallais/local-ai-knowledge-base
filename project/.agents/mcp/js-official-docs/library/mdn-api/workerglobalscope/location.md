---
title: "WorkerGlobalScope: location property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/workerglobalscope/location/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WorkerGlobalScope: location property

The read-only **`location`** property of the `WorkerGlobalScope` interface returns the `WorkerLocation` associated with the worker. It is a specific location object, mostly a subset of the `Location` for browsing scopes, but adapted to workers.

## Value

A `WorkerLocation` object.

## Examples

If you called the following in a document served at `localhost:8000`

```js
console.log(location);
```

inside a worker (which would basically be the equivalent of `self.console.log(self.location);`, as these are being called on the worker scope, which can be referenced with `WorkerGlobalScope.self`), you will get a `WorkerLocation` object written to the console — something like the following:

```plain
WorkerLocation {hash: "", search: "", pathname: "/worker.js", port: "8000", hostname: "localhost"…}
  hash: ""
  host: "localhost:8000"
  hostname: "localhost"
  href: "http://localhost:8000/worker.js"
  origin: "http://localhost:8000"
  pathname: "/worker.js"
  port: "8000"
  protocol: "http:"
  search: ""
  __proto__: WorkerLocation
```

You could use this location object to return more information about the document's location, as you might do with a normal `Location` object.

> **Note:**
> Firefox has a bug with using `console.log` inside shared/service workers (see Firefox bug 1058644), which may return strange results, but this should be fixed soon.

## See also

- `WorkerGlobalScope`
