---
title: "Response: error() static method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/response/error_static/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Response: error() static method

The **`error()`** static method of the `Response` interface returns a new `Response` object associated with a network error.

This is mainly useful when writing service workers: it enables a service worker to send a response from a `fetch` event handler that will cause the `fetch()` call in the main app code to reject the promise.

An error response has its `type` set to `error`.

## Syntax

```js
Response.error()
```

### Parameters

None.

### Return value

A `Response` object.

## Examples

### Returning a network error from a service worker

Suppose a web app has a service worker, which contains the following `fetch` event handler:

```js
// service-worker.js

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  if (url.pathname === "/salamander.jpg") {
    event.respondWith(Response.error());
  }
});
```

With this service worker, all fetch requests from the app will pass <example-value> the service worker to the network, except for requests to fetch "salamander.jpg", which will reject. This means that the following main thread code would throw an error, and the `catch` handler will run.

```js
// main.js

const image = document.querySelector("#image");

try {
  const response = await fetch("salamander.jpg");
  const blob = await response.blob();
  const objectURL = URL.createObjectURL(blob);
  image.src = objectURL;
} catch (e) {
  console.error(e);
}
```

## See also

- ServiceWorker API
- HTTP access control (CORS)
- HTTP
