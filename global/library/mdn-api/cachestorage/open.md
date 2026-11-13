---
title: "CacheStorage: open() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cachestorage/open/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CacheStorage: open() method

The **`open()`** method of the
`CacheStorage` interface returns a `Promise` that resolves to
the `Cache` object matching the `cacheName`.

You can access `CacheStorage` through the `Window.caches` property in windows or through the `WorkerGlobalScope.caches` property in workers.

> **Note:**
> If the specified `Cache` does not exist, a new
> cache is created with that `cacheName` and a `Promise` that
> resolves to this new `Cache` object is returned.

## Syntax

```js
open(cacheName)
```

### Parameters

- `cacheName`
    The name of the cache you want to open.

### Return value

A `Promise` that resolves to the requested `Cache` object.

## Examples

This example is from the MDN simple service worker example (see simple service worker running live).
Here we wait for an `InstallEvent` to fire, then runs
`waitUntil()` to handle the install process for
the app. This consists of calling `CacheStorage.open()` to create a new
cache, then using `Cache.addAll()` to add a series of assets to it.

```js
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open("v1")
      .then((cache) =>
        cache.addAll([
          "/",
          "/index.html",
          "/style.css",
          "/app.js",
          "/image-list.js",
          "/star-wars-logo.jpg",
          "/gallery/bountyHunters.jpg",
          "/gallery/myLittleVader.jpg",
          "/gallery/snowTroopers.jpg",
        ]),
      ),
  );
});
```

## See also

- Using Service Workers
- `Cache`
- `Window.caches` and `WorkerGlobalScope.caches`
