---
title: "Request: headers property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/request/headers/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Request: headers property

The **`headers`** read-only property of the
`Request` interface contains the `Headers` object associated
with the request.

## Value

A `Headers` object.

## Examples

In the following snippet, we create a new request using the
`Request()` constructor (for an image file in the same directory as
the script), then save the request headers in a variable:

```js
const myRequest = new Request("flowers.jpg");
const myHeaders = myRequest.headers; // Headers {}
```

To add a header to the `Headers` object we use
`Headers.append`; we then create a new `Request` along with a
2nd init parameter, passing headers in as an init option:

```js
const myHeaders = new Headers();
myHeaders.append("Content-Type", "image/jpeg");

const myInit = {
  method: "GET",
  headers: myHeaders,
  mode: "cors",
  cache: "default",
};

const myRequest = new Request("flowers.jpg", myInit);

const myContentType = myRequest.headers.get("Content-Type"); // returns 'image/jpeg'
```

## See also

- ServiceWorker API
- HTTP access control (CORS)
- HTTP
