---
title: "Response: formData() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/response/formdata/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Response: formData() method

The **`formData()`** method of the `Response` interface
takes a `Response` stream and reads it to completion. It returns a promise
that resolves with a `FormData` object.

> **Note:**
> This is mainly relevant to service workers. If a user submits
> a form and a service worker intercepts the request, you could for example call
> `formData()` on it to obtain a key-value map, modify some fields, then send
> the form onwards to the server (or use it locally).

## Syntax

```js
formData()
```

### Parameters

None.

### Return value

A `Promise` that resolves with a `FormData` object.

### Exceptions

- `AbortError` `DOMException`
    The request was aborted.
- `TypeError`
    Thrown for one of the following reasons:
    - The response body is disturbed or locked.
    - There was an error decoding the body content (for example, because the `Content-Encoding` header is incorrect).
    - The MIME type of the body cannot be determined from the `Content-Type` headers included in the response, or is not `application/x-www-form-urlencoded` or `multipart/form-data`.
    - The body cannot be parsed as a `FormData` object.

## Examples

TBD.

## See also

- ServiceWorker API
- HTTP access control (CORS)
- HTTP
