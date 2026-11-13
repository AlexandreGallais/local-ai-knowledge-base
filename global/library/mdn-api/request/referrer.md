---
title: "Request: referrer property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/request/referrer/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Request: referrer property

The **`referrer`** read-only property of the
`Request` interface is set by the user agent to be the referrer of the
Request. (e.g., `client`, `no-referrer`, or a URL.)

> **Note:**
> If `referrer`'s value is `no-referrer`,
> it returns an empty string.

## Value

A string representing the request's referrer.

## Examples

In the following snippet, we create a new request using the
`Request()` constructor (for an image file in the same directory as
the script), then save the request referrer in a variable:

```js
const myRequest = new Request("flowers.jpg");
const myReferrer = myRequest.referrer; // returns "about:client" by default
```

## See also

- ServiceWorker API
- HTTP access control (CORS)
- HTTP
