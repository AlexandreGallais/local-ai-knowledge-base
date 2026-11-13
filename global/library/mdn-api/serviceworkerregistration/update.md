---
title: "ServiceWorkerRegistration: update() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/serviceworkerregistration/update/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ServiceWorkerRegistration: update() method

The **`update()`** method of the
`ServiceWorkerRegistration` interface attempts to update the service
worker. It fetches the worker's script URL, and if the new worker is not byte-by-byte
identical to the current worker, it installs the new worker. The fetch of the worker
bypasses any browser caches if the previous fetch occurred over 24 hours ago.

## Syntax

```js
update()
```

### Parameters

None.

### Return value

A `Promise` that resolves with a `ServiceWorkerRegistration`
object.

## Examples

The following simple example registers a service worker example then adds an event
handler to a button so you can explicitly update the service worker whenever desired:

```js
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js", { scope: "/" })
    .then((registration) => {
      // registration worked
      console.log("Registration succeeded.");
      button.onclick = () => {
        registration.update();
      };
    })
    .catch((error) => {
      // registration failed
      console.error(`Registration failed with ${error}`);
    });
}
```

## See also

- Using Service Workers
- Service workers basic code example
- Using web workers
