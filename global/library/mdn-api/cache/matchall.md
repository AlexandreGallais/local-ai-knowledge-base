---
title: "Cache: matchAll() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cache/matchall/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Cache: matchAll() method

The **`matchAll()`** method of the `Cache`
interface returns a `Promise` that resolves to an array of all matching
responses in the `Cache` object.

## Syntax

```js
matchAll()
matchAll(request)
matchAll(request, options)
```

### Parameters

- `request` (optional)
    The `Request` for which you are attempting to find responses in the
    `Cache`. This can be a `Request` object or a URL. If this
    argument is omitted, you will get a copy of all responses in this cache.
- `options` (optional)
    An options object allowing you to set specific control options for the matching
    performed. The available options are:
    - `ignoreSearch`
        A boolean value that specifies whether the
        matching process should ignore the query string in the URL. If set to
        `true`, the `?value=bar` part of
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
        header matching — i.e., if the URL matches you will get a match regardless of the
        `Response` object having a `VARY` header or not. It
        defaults to `false`.

### Return value

A `Promise` that resolves to an array of all matching responses in the
`Cache` object.

> **Note:**
> `Cache.match()` is basically identical to
> `Cache.matchAll()`, except that rather than resolving with an array of all
> matching responses, it resolves with the first matching response only (that is,
> `response[0]`).

## Examples

The following example retrieves all responses in the `v1` cache matching the URL `/`, even including potential query parameters. By using `{ ignoreSearch: true }`, using `matchAll` would retrieve `/` as well as `/?value=bar`.

It then logs the number of matching responses.

```js
caches
  .open("v1")
  .then((cache) => cache.matchAll("/", { ignoreSearch: true }))
  .then((responses) => {
    console.log(`Found ${responses.length} matching responses`);
  });
```

## See also

- Using Service Workers
- `Cache`
- `Window.caches` and `WorkerGlobalScope.caches`
