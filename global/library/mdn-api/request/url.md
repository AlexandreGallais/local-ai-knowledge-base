---
title: "Request: url property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/request/url/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Request: url property

The **`url`** read-only property of the `Request`
interface contains the URL of the request.

## Value

A string indicating the URL of the request.

## Examples

In the following snippet, we create a new request using the
`Request()` constructor (for an image file in the same directory as
the script), then save the URL of the request in a variable:

```js
const myRequest = new Request("flowers.jpg");
const myURL = myRequest.url; // "https://github.com/mdn/dom-examples/tree/main/fetch/fetch-request/flowers.jpg"
```

## See also

- ServiceWorker API
- HTTP access control (CORS)
- HTTP
