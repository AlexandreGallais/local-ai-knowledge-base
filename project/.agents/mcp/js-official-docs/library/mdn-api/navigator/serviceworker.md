---
title: "Navigator: serviceWorker property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/navigator/serviceworker/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Navigator: serviceWorker property

The **`serviceWorker`** read-only property of the `Navigator` interface returns the `ServiceWorkerContainer` object for the associated document, which provides access to registration, removal, upgrade, and communication with the `ServiceWorker`.

The feature may not be available in private mode.

Note that a worker can similarly access the `ServiceWorkerContainer` for a document using `WorkerNavigator.serviceWorker`.

## Value

`ServiceWorkerContainer`.

## Examples

This code checks if the browser supports service workers.

```js
if ("serviceWorker" in navigator) {
  // Supported!
}
```

## See also

- `Service Worker API`
- Using Service Workers
