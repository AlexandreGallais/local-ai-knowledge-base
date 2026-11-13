---
title: "Cache: put() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cache/put/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Cache: put() method

The **`put()`** method of the
`Cache` interface allows key/value pairs to be added to the current
`Cache` object.

Often, you will just want to `fetch()`
one or more requests, then add the result straight to your cache. In such cases you are
better off using
`Cache.add()`/`Cache.addAll()`, as
they are shorthand functions for one or more of these operations.

```js
fetch(url).then((response) => {
  if (!response.ok) {
    throw new TypeError("Bad response status");
  }
  return cache.put(url, response);
});
```

> **Note:**
> `put()` will overwrite any key/value pair
> previously stored in the cache that matches the request.

> **Note:**
> `Cache.add`/`Cache.addAll` do not
> cache responses with `Response.status` values that are not in the 200
> range, whereas `Cache.put` lets you store any request/response pair. As a
> result, `Cache.add`/`Cache.addAll` can't be used to store
> opaque responses, whereas `Cache.put` can.

## Syntax

```js
put(request, response)
```

### Parameters

- `request`
    The `Request` object or URL that you want to add to the cache.
- `response`
    The `Response` you want to match up to the request.

### Return value

A `Promise` that resolves with `undefined`.

### Exceptions

- `TypeError`
    Returned if the URL scheme is not `http` or `https`.

## Examples

This example is from the MDN simple-service-worker example (see simple-service-worker running live).
Here we wait for a `FetchEvent` to fire. We construct a custom response
like so:

1. Check whether a match for the request is found in the `CacheStorage`
   using `CacheStorage.match()`. If so, serve that.
2. If not, open the `v1` cache using `open()`, put the default
   network request in the cache using `Cache.put()` and return a
   clone of the default network request using `return response.clone()`. Clone
   is needed because `put()` consumes the response body.
3. If this fails (e.g., because the network is down), return a fallback response.

```js
let response;
const cachedResponse = caches
  .match(event.request)
  .then((r) => (r !== undefined ? r : fetch(event.request)))
  .then((r) => {
    response = r;
    caches.open("v1").then((cache) => cache.put(event.request, response));
    return response.clone();
  })
  .catch(() => caches.match("/gallery/myLittleVader.jpg"));
```

## See also

- Using Service Workers
- `Cache`
- `Window.caches` and `WorkerGlobalScope.caches`
