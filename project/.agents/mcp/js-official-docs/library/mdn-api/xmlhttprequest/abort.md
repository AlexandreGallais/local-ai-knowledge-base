---
title: "XMLHttpRequest: abort() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xmlhttprequest/abort/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XMLHttpRequest: abort() method

The **`XMLHttpRequest.abort()`** method aborts the request if
it has already been sent. When a request is aborted, its
`readyState` is changed to
`XMLHttpRequest.UNSENT` (0) and the request's
`status` code is set to 0.

If the request is still in progress (its `readyState` is not `XMLHttpRequest.DONE` or `XMLHttpRequest.UNSENT`), a `readystatechange` event, `abort`, and a `loadend` event are dispatched, in that order. For synchronous requests, no events are dispatched and an error is thrown instead.

## Syntax

```js
abort()
```

### Parameters

None.

### Return value

None (`undefined`).

## Examples

This example begins loading content from the MDN home page, then due to some condition,
aborts the transfer by calling `abort()`.

```js
const xhr = new XMLHttpRequest();
const method = "GET";
const url = "https://developer.mozilla.org/";
xhr.open(method, url, true);

xhr.send();

if (OH_NOES_WE_NEED_TO_CANCEL_RIGHT_NOW_OR_ELSE) {
  xhr.abort();
}
```

## See also

- Using XMLHttpRequest
