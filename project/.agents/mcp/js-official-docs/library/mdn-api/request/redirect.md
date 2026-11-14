---
title: "Request: redirect property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/request/redirect/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Request: redirect property

The **`redirect`** read-only property of the `Request` interface contains the mode for how redirects are handled.

## Value

A `RequestRedirect` enum value, which can be one of the following strings:

- `follow`
- `error`
- `manual`

If not specified when the request is created, it takes the default value of `follow`.

## Examples

In the following snippet, we create a new request using the `Request()` constructor (for an image file in the same directory as the script), then save the request `redirect` value in a variable:

```js
const myRequest = new Request("flowers.jpg");
const myCred = myRequest.redirect;
```

## See also

- ServiceWorker API
- HTTP access control (CORS)
- HTTP
