---
title: "ServiceWorkerContainer: controller property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/serviceworkercontainer/controller/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ServiceWorkerContainer: controller property

The **`controller`** read-only property of the `ServiceWorkerContainer` interface represents the active `service worker` controlling the current page (associated with this `ServiceWorkerContainer`), or `null` if the page has no active or activating service worker.

This is the same object returned by `ServiceWorkerRegistration.active`.

## Value

A `ServiceWorker` object if its state is `activating` or `activated`, or `null` if there is no active worker.

The property also returns `null` if the request is a force refresh (`Shift` + refresh)

## Examples

### Test if a page is controlled by a service worker

```js
if ("serviceWorker" in navigator) {
  // Do a one-off check to see if a service worker's in control.
  if (navigator.serviceWorker.controller) {
    console.log(
      `This page is currently controlled by: ${navigator.serviceWorker.controller}`,
    );
  } else {
    console.log("This page is not currently controlled by a service worker.");
  }
} else {
  console.log("Service workers are not supported.");
}
```
