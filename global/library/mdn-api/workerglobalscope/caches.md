---
title: "WorkerGlobalScope: caches property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/workerglobalscope/caches/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WorkerGlobalScope: caches property

The **`caches`** read-only property of the `WorkerGlobalScope` interface returns the `CacheStorage` object associated with the current context.
This object enables functionality such as storing assets for offline use, and generating custom responses to requests.

## Value

A `CacheStorage` object.

## Examples

The following example shows how you'd use a cache in a service worker context to store assets offline.

```js
self.addEventListener("install", (event) => {
  event.waitUntil(
    self.caches
      .open("v1")
      .then((cache) =>
        cache.addAll([
          "/",
          "/index.html",
          "/style.css",
          "/app.js",
          "/image-list.js",
          "/star-wars-logo.jpg",
          "/gallery/",
          "/gallery/bountyHunters.jpg",
          "/gallery/myLittleVader.jpg",
          "/gallery/snowTroopers.jpg",
        ]),
      ),
  );
});
```

## See also

- Service Workers
- `CacheStorage`
- `Cache`
