---
title: "Request: keepalive property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/request/keepalive/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Request: keepalive property

The **`keepalive`** read-only property of the `Request` interface contains the request's `keepalive` setting (`true` or `false`), which indicates whether the browser will keep the associated request alive if the page that initiated it is unloaded before the request is complete.

This enables a `fetch()` request to, for example, send analytics at the end of a session even if the user navigates away from or closes the page.
This has some advantages over using `Navigator.sendBeacon()` for the same purpose, including allowing you to use HTTP methods other than `POST`, customize request properties, and access the server response via the fetch `Promise` fulfillment.
It is also available in service workers.

## Value

A boolean value indicating the `keepalive` status of the request.

## Examples

### Create a Request with keepalive

In the following snippet, we create a new request using the `Request()` constructor with `keepalive` set to `true`, then save the `keepalive` value of the request in a variable:

```js
const options = {
  keepalive: true,
};

const myRequest = new Request("flowers.jpg", options);
let myKeepAlive = myRequest.keepalive; // true
```

## See also

- ServiceWorker API
- HTTP access control (CORS)
- HTTP
