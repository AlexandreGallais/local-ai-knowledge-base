---
title: "PeriodicSyncManager"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/periodicsyncmanager/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PeriodicSyncManager

The **`PeriodicSyncManager`** interface of the `Web Periodic Background Synchronization API` provides a way to register tasks to be run in a service worker at periodic intervals with network connectivity. These tasks are referred to as periodic background sync requests. Access `PeriodicSyncManager` through the `ServiceWorkerRegistration.periodicSync`.

## Instance properties

None.

## Instance methods

- `PeriodicSyncManager.register()` (experimental)
    Registers a periodic sync request with the browser with the specified tag and options. Returns a `Promise` that resolves when the registration completes.
- `PeriodicSyncManager.getTags()` (experimental)
    Returns a `Promise` that resolves with a list of `strings` representing the tags that are currently registered for periodic syncing.
- `PeriodicSyncManager.unregister()` (experimental)
    Unregisters the periodic sync request corresponding to the specified tag and returns a `Promise` that resolves when unregistration completes.

## Examples

The following examples show how to use the interface.

### Requesting a Periodic Background Sync

The following asynchronous function registers a periodic background sync at a minimum interval of one day from a browsing context:

```js
async function registerPeriodicNewsCheck() {
  const registration = await navigator.serviceWorker.ready;
  try {
    await registration.periodicSync.register("get-latest-news", {
      minInterval: 24 * 60 * 60 * 1000,
    });
  } catch {
    console.log("Periodic Sync could not be registered!");
  }
}
```

### Verifying a Background Periodic Sync by Tag

This code checks to see if a Periodic Background Sync task with a given tag is registered.

```js
navigator.serviceWorker.ready.then((registration) => {
  registration.periodicSync.getTags().then((tags) => {
    if (tags.includes("get-latest-news")) skipDownloadingLatestNewsOnPageLoad();
  });
});
```

### Removing a Periodic Background Sync Task

The following code removes a Periodic Background Sync task to stop articles syncing in the background.

```js
navigator.serviceWorker.ready.then((registration) => {
  registration.periodicSync.unregister("get-latest-news");
});
```

## See also

- Richer offline experiences with the Periodic Background Sync API
