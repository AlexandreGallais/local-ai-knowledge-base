---
title: "CacheStorage: keys() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cachestorage/keys/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CacheStorage: keys() method

The **`keys()`** method of the `CacheStorage` interface returns a `Promise` that will resolve with an array containing strings corresponding to all of the named `Cache` objects tracked by the `CacheStorage` object in the order they were created.
Use this method to iterate over a list of all `Cache` objects.

You can access `CacheStorage` through the `Window.caches` property in windows or through the `WorkerGlobalScope.caches` property in workers.

## Syntax

```js
keys()
```

### Parameters

None.

### Return value

A `Promise` that resolves with an array of the `Cache` names inside the `CacheStorage` object.

## Examples

In this code snippet we wait for an `activate` event, and then run a `waitUntil()` block that clears up any old, unused caches before a new service worker is activated.
Here we have an allowlist containing the names of the caches we want to keep (`cacheAllowlist`).
We return the keys of the caches in the `CacheStorage` object using `keys()`, then check each key to see if it is in the allowlist.
If not, we delete it using `CacheStorage.delete()`.

```js
this.addEventListener("activate", (event) => {
  const cacheAllowlist = ["v2"];

  event.waitUntil(
    caches.keys().then((keyList) =>
      Promise.all(
        keyList.map((key) => {
          if (!cacheAllowlist.includes(key)) {
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
