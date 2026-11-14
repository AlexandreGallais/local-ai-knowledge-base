---
title: "CacheStorage: has() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cachestorage/has/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CacheStorage: has() method

The **`has()`** method of the `CacheStorage`
interface returns a `Promise` that resolves to `true` if a
`Cache` object matches the `cacheName`.

You can access `CacheStorage` through the `Window.caches` property in windows or through the `WorkerGlobalScope.caches` property in workers.

## Syntax

```js
has(cacheName)
```

### Parameters

- `cacheName`
    A string representing the name of the `Cache` object you are looking for in the `CacheStorage`.

### Return value

A `Promise` that resolves to `true` if the cache exists or
`false` if not.

## Examples

The following example first checks whether a cache called 'v1' exists. If so, we add a
list of assets to it. If not then we run some kind of cache set-up function.

```js
caches
  .has("v1")
  .then((hasCache) => {
    if (!hasCache) {
      someCacheSetupFunction();
    } else {
      caches.open("v1").then((cache) => cache.addAll(myAssets));
    }
  })
  .catch(() => {
    // Handle exception here.
  });
```

## See also

- Using Service Workers
- `Cache`
- `Window.caches` and `WorkerGlobalScope.caches`
