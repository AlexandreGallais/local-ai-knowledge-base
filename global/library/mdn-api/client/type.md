---
title: "Client: type property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/client/type/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Client: type property

The **`type`** read-only property of the `Client`
interface indicates the type of client the service worker is controlling.

## Value

A string, representing the client type. The value can be one of

- `"window"`
- `"worker"`
- `"sharedworker"`

## Examples

```js
// service worker client (e.g. a document)
function sendMessage(message) {
  return new Promise((resolve, reject) => {
    // note that this is the ServiceWorker.postMessage version
    navigator.serviceWorker.controller.postMessage(message);
    window.serviceWorker.onMessage = (e) => {
      resolve(e.data);
    };
  });
}

// controlling service worker
self.addEventListener("message", (e) => {
  // e.source is a client object
  e.source.postMessage(`Hello! Your message was: ${e.data}`);
  // Let's also post the type value back to the client
  e.source.postMessage(e.source.type);
});
```
