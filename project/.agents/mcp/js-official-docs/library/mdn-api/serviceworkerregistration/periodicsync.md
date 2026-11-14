---
title: "ServiceWorkerRegistration: periodicSync property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/serviceworkerregistration/periodicsync/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ServiceWorkerRegistration: periodicSync property

The **`periodicSync`** read-only property of
the `ServiceWorkerRegistration` interface returns a reference to the
`PeriodicSyncManager` interface, which allows for registering of tasks to
run at specific intervals.

## Value

A `PeriodicSyncManager` object.

## Examples

You can access the property from either your main script or the registered service
worker.

Here is an example from the main script:

```js
// reference registration
const registration = await navigator.serviceWorker.ready;

// feature detection
if ("periodicSync" in registration) {
  // Background Periodic Sync functionality
  const periodicSync = registration.periodicSync;
}
```

From the service worker:

```js
// service worker script

const periodicSync = self.registration.periodicSync;
```

## See also

- Richer offline experiences with the Periodic Background Sync API
