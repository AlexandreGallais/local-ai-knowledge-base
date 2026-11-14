---
title: "Window: caches property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/window/caches/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Window: caches property

The **`caches`** read-only property of the `Window` interface returns the `CacheStorage` object associated with the current context.
This object enables functionality such as storing assets for offline use, and generating custom responses to requests.

## Value

A `CacheStorage` object.

## Examples

The following example shows how a window can retrieve cached data.

```js
caches.open("v1").then((cache) => cache.match("/list"));
```

## See also

- Service Workers
- `CacheStorage`
- `Cache`
