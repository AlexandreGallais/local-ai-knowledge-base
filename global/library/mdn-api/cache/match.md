---
title: "Cache: match() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cache/match/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Cache: match() method

The **`match()`** method of the `Cache` interface returns a `Promise` that resolves to the `Response` associated with the first matching request in the `Cache` object.
If no match is found, the `Promise` resolves to `undefined`.

## Syntax

```js
match(request)
match(request, options)
```

### Parameters

- `request`
    The `Request` for which you are attempting to find responses in the
    `Cache`. This can be a `Request` object or a URL string.
- `options` (optional)
    An object that sets options for the `match` operation.
    The available options are:
    - `ignoreSearch`
        A boolean value that specifies whether to
        ignore the query string in the URL. For example, if set to
        `true` the `?value=bar` part of
        `https://example.com/?value=bar` would be ignored when performing a match.
        It defaults to `false`.
    - `ignoreMethod`
        A boolean value that, when set to
        `true`, prevents matching operations from validating the
        `Request` `http` method (normally only `GET`
        and `HEAD` are allowed.) It defaults to `false`.
    - `ignoreVary`
        A boolean value that when set to
        `true` tells the matching operation not to perform `VARY`
        header matching — i.e., if the URL matches you will get a match regardless of
        whether the `Response` object has a `VARY` header. It
        defaults to `false`.

### Return value

A `Promise` that resolves to the first `Response` that matches
the request or to `undefined` if no match is found.

> **Note:**
> `Cache.match()` is basically identical to
> `Cache.matchAll()`, except that rather than resolving with an array of
> all matching responses, it resolves with the first matching response only (that is,
> `response[0]`).

## Examples

This example is taken from the custom offline page example (live demo). It uses a cache to supply selected data when a request fails. A
`catch()` clause is triggered when the call to `fetch()` throws an
exception. Inside the `catch()` clause, `match()` is used to
return the correct response.

In this example, only HTML documents retrieved with the GET HTTP verb will be
cached. If our `if ()` condition is false, then this fetch handler won't
intercept the request. If there are any other fetch handlers registered, they will get a
chance to call `event.respondWith()`. If no fetch handlers call
`event.respondWith()`, the request will be handled by the browser as if there
were no service worker involvement. If `fetch()` returns a valid HTTP
response with a response code in the 4xx or 5xx range, the `catch()` will
NOT be called.

```js
self.addEventListener("fetch", (event) => {
  // We only want to call event.respondWith() if this is a GET request for an HTML document.
  if (
    event.request.method === "GET" &&
    event.request.headers.get("accept").includes("text/html")
  ) {
    console.log("Handling fetch event for", event.request.url);
    event.respondWith(
      fetch(event.request).catch((e) => {
        console.error("Fetch failed; returning offline page instead.", e);
        return caches
          .open(OFFLINE_CACHE)
          .then((cache) => cache.match(OFFLINE_URL));
      }),
    );
  }
});
```

## See also

- Using Service Workers
- `Cache`
- `Window.caches` and `WorkerGlobalScope.caches`
