---
title: "Cache: add() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cache/add/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Cache: add() method

The **`add()`** method of the `Cache` interface takes a URL, retrieves it, and adds the resulting response object to the given cache.

The `add()` method is functionally equivalent to the following:

```js
fetch(url).then((response) => {
  if (!response.ok) {
    throw new TypeError("bad response status");
  }
  return cache.put(url, response);
});
```

For more complex operations, you'll need to use `Cache.put()` directly.

> **Note:**
> `add()` will overwrite any key/value pair previously stored in the cache that matches the request.

## Syntax

```js
add(request)
```

### Parameters

- `request`
    A request for the resource you want to add to the cache. This can be a `Request` object or a URL.

    This parameter is used as a parameter to the `Request()` constructor, so URLs follow the same rules as for that constructor. In particular, URLs may be relative to the base URL, which is the document's `baseURI` in a window context, or `WorkerGlobalScope.location` in a worker context.

### Return value

A `Promise` that resolves with `undefined`.

### Exceptions

- `TypeError`
    The URL scheme is not `http` or `https`.

    The Response status is not in the 200 range (i.e., not a successful response.) This occurs if the request does not return successfully, but also if the request is a _cross-origin no-cors_ request (in which case the reported status is always 0.)

## Examples

This code block waits for an `InstallEvent` to fire, then calls `waitUntil()` to handle the install process for the app. This consists of calling `CacheStorage.open` to create a new cache, then using `Cache.add` to add an asset to it.

```js
this.addEventListener("install", (event) => {
  event.waitUntil(caches.open("v1").then((cache) => cache.add("/index.html")));
});
```

## See also

- Using Service Workers
- `Cache`
- `Window.caches` and `WorkerGlobalScope.caches`
