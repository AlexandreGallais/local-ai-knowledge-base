---
title: "Response: redirect() static method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/response/redirect_static/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Response: redirect() static method

The **`redirect()`** static method of the `Response` interface returns a `Response` resulting in a redirect to the specified URL.

> **Note:**
> This can be used alongside the ServiceWorker API.
> A controlling service worker could intercept a page's request and redirect it as desired.
> This will actually lead to a real redirect if a service worker sends it upstream.

## Syntax

```js
Response.redirect(url)
Response.redirect(url, status)
```

### Parameters

- `url`
    The URL that the new response is to originate from.
- `status` (optional)
    An optional number indicating the status code for the response: one of `301`, `302`, `303`, `307`, or `308`. If omitted, `302 Found` is used by default.

### Return value

A `Response` object.

### Exceptions

- `RangeError`
    The specified status is not a redirect status.
- `TypeError`
    The specified URL is invalid.

## Examples

```js
Response.redirect("https://www.example.com", 302);
```

## See also

- ServiceWorker API
- HTTP access control (CORS)
- HTTP
