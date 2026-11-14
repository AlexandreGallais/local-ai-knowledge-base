---
title: "XMLHttpRequest: XMLHttpRequest() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xmlhttprequest/xmlhttprequest/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XMLHttpRequest: XMLHttpRequest() constructor

The **`XMLHttpRequest()`** constructor
creates a new `XMLHttpRequest`.

## Syntax

```js
new XMLHttpRequest()
// Non-standard
new XMLHttpRequest(options)
```

### Parameters

There are no standard parameters. However, Firefox allows a non-standard parameter:

- `options` (non-standard)
    An object that can contain the following flags:
    - `mozAnon`
        A boolean. When setting this flag to `true` will cause the browser not to expose the origin and user credentials when fetching resources. Most important, this means that cookies will not be sent unless explicitly added using `setRequestHeader`.
    - `mozSystem`
        A boolean. When setting this flag to `true`, the same origin policy will not be enforced on the request.

### Return value

A new `XMLHttpRequest` object. The object must be prepared by at least
calling `open()` to initialize it before calling
`send()` to send the request to the server.

## See also

- Using XMLHttpRequest
- HTML in XMLHttpRequest
