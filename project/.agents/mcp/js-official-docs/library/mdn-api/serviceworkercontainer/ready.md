---
title: "ServiceWorkerContainer: ready property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/serviceworkercontainer/ready/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ServiceWorkerContainer: ready property

The **`ready`** read-only property of the `ServiceWorkerContainer` interface provides a way of delaying code execution until a service worker is active.

The property returns a `Promise` that will never reject, and which waits indefinitely until the `ServiceWorkerRegistration` associated with the current page has an `active` worker.
Once that condition is met, it resolves with the `ServiceWorkerRegistration`.

## Value

A `Promise` that will never reject, and which may eventually resolve with a `ServiceWorkerRegistration` when there is an active service worker.

## Examples

### Deferring code until there is an active service worker

```js
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.ready.then((registration) => {
    console.log(`A service worker is active: ${registration.active}`);

    // At this point, you can call methods that require an active
    // service worker, like registration.pushManager.subscribe()
  });
} else {
  console.error("Service workers are not supported.");
}
```
