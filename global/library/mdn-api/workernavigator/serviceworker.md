---
title: "WorkerNavigator: serviceWorker property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/workernavigator/serviceworker/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WorkerNavigator: serviceWorker property

The **`serviceWorker`** read-only property of the `WorkerNavigator` interface returns the `ServiceWorkerContainer` object for the associated document, which provides access to registration, removal, upgrade, and communication with the `ServiceWorker`.

The feature may not be available in private mode.

## Value

`ServiceWorkerContainer`.

## Examples

This code checks if the browser supports using service worker in workers.

```js
if ("serviceWorker" in navigator) {
  // Supported!
}
```

## See also

- `Service Worker API`
- Using Service Workers
