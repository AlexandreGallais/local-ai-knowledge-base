---
title: "Request: referrerPolicy property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/request/referrerpolicy/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Request: referrerPolicy property

The **`referrerPolicy`** read-only property of the
`Request` interface returns the referrer policy, which governs what
referrer information, sent in the `Referer` header, should be included
with the request.

## Value

A string representing the request's `referrerPolicy`. For
more information and possible values, see the `Referrer-Policy` HTTP
header page.

## Examples

In the following snippet, we create a new request using the
`Request()` constructor (for an image file in the same directory as
the script), then save the request referrer policy in a variable:

```js
const myRequest = new Request("flowers.jpg");
const myReferrer = myRequest.referrerPolicy; // returns "" by default
```

## See also

- ServiceWorker API
- HTTP access control (CORS)
- HTTP
