---
title: "XMLHttpRequest: setRequestHeader() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xmlhttprequest/setrequestheader/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XMLHttpRequest: setRequestHeader() method

The `XMLHttpRequest` method **`setRequestHeader()`** sets the value of an HTTP request header.
When using `setRequestHeader()`, you must call it after calling `open()`, but before calling `send()`.
If this method is called several times with the same header, the values are merged into one single request header.

Each time you call `setRequestHeader()` after the first time you call it, the specified text is appended to the end of the existing header's content.

If no `Accept` header has been set using this, an `Accept` header with the type `"*/*"` is sent with the request when `send()` is called.

For security reasons, there are several forbidden request headers whose values are controlled by the user agent. Any attempt to set a value for one of those headers from frontend JavaScript code will be ignored without warning or error.

In addition, the `Authorization` HTTP header may be added to a request, but will be removed if the request is redirected cross-origin.

> **Note:**
> For your custom fields, you may encounter a "**not allowed by Access-Control-Allow-Headers in preflight response**" exception when you send requests across domains.
> In this situation, you need to set up the `Access-Control-Allow-Headers` in your response header at server side.

## Syntax

```js
setRequestHeader(header, value)
```

### Parameters

- `header`
    The name of the header whose value is to be set.
- `value`
    The value to set as the body of the header.

### Return value

None (`undefined`).

## See also

- Using XMLHttpRequest
- HTML in XMLHttpRequest
