---
title: "WorkerLocation: port property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/workerlocation/port/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WorkerLocation: port property

The **`port`** property of a `WorkerLocation` object returns the `port` part of the worker's location.

## Value

A string.

## Examples

```js
// In a Web worker, on the page http://localhost:8080/
const result = location.port; // Returns '8080'
```

## See also

- The `WorkerLocation` interface it belongs to.
