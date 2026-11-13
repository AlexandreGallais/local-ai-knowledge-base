---
title: "WorkerLocation: hostname property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/workerlocation/hostname/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WorkerLocation: hostname property

The **`hostname`** property of a `WorkerLocation` object returns the `hostname` part of the worker's location.

## Value

A string.

## Examples

```js
// In a Web worker, on the page http://localhost:8080/
const result = location.hostname; // Returns 'localhost'
```

## See also

- The `WorkerLocation` interface it belongs to.
