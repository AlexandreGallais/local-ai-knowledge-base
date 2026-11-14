---
title: "CacheStorage: delete() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cachestorage/delete/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CacheStorage: delete() method

The **`delete()`** method of the `CacheStorage` interface finds the `Cache` object matching the `cacheName`, and if found, deletes the `Cache` object and returns a `Promise` that resolves to `true`.
If no `Cache` object is found, it resolves to `false`.

You can access `CacheStorage` through the `Window.caches` property in windows or through the `WorkerGlobalScope.caches` property in workers.

## Syntax

```js
delete(cacheName)
```

### Parameters

- `cacheName`
    The name of the cache you want to delete.

### Return value

A `Promise` that resolves to `true` if the `Cache`
object is found and deleted, and `false` otherwise.

## Examples

In this code snippet we wait for an activate event, and then run a
`waitUntil()` block that clears up any old,
unused caches before a new service worker is activated. Here we have an array of cache
names we want to keep (`cachesToKeep`). We return the keys of the caches in
the `CacheStorage` object using `CacheStorage.keys`, then
check each key to see if it is in the array. If not, we delete it using
`delete()`.

```js
this.addEventListener("activate", (event) => {
  const cachesToKeep = ["v2"];

  event.waitUntil(
    caches.keys().then((keyList) =>
      Promise.all(
        keyList.map((key) => {
          if (!cachesToKeep.includes(key)) {
            return caches.delete(key);
          }
          return undefined;
        }),
      ),
    ),
  );
});
```

## See also

- Using Service Workers
- `Cache`
- `Window.caches` and `WorkerGlobalScope.caches`
