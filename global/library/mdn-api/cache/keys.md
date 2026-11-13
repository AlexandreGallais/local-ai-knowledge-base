---
title: "Cache: keys() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cache/keys/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Cache: keys() method

The **`keys()`** method of the `Cache` interface returns a
`Promise` that resolves to an array of `Request` objects
representing the keys of the `Cache`.

The requests are returned in the same order that they were inserted.

> **Note:**
> Requests with duplicate URLs but different headers can be
> returned if their responses have the `VARY` header set on them.

## Syntax

```js
keys()
keys(request)
keys(request, options)
```

### Parameters

- `request` (optional)
    The `Request` want to return, if a specific key is desired. This can be
    a `Request` object or a URL.
- `options` (optional)
    An object whose properties control how matching is done in the `keys`
    operation. The available options are:
    - `ignoreSearch`
        A boolean value that specifies whether the
        matching process should ignore the query string in the URL. If set to
        `true`, the `?value=bar` part of
        `https://example.com/?value=bar` would be ignored when performing a match.
        It defaults to `false`.
    - `ignoreMethod`
        A boolean value that, when set to
        `true`, prevents matching operations from validating the
        `Request` `HTTP` method (normally only `GET`
        and `HEAD` are allowed.) It defaults to `false`.
    - `ignoreVary`
        A boolean value that, when set to
        `true`, tells the matching operation not to perform `VARY`
        header matching. In other words, if the URL matches you will get a match
        regardless of whether the `Response` object has a `VARY`
        header. It defaults to `false`.
    - `cacheName`
        A string that represents a specific
        cache to search within. Note that this option is ignored by
        `Cache.keys()`.

### Return value

A `Promise` that resolves to an array of `Request`
objects.

## Examples

```js
caches
  .open("v1")
  .then((cache) => cache.keys())
  .then((keys) => {
    keys.forEach((request, index, array) => {
      cache.delete(request);
    });
  });
```

## See also

- Using Service Workers
- `Cache`
- `Window.caches` and `WorkerGlobalScope.caches`
