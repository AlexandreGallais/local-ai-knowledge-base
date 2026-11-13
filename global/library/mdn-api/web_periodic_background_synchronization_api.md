---
title: "Web Periodic Background Synchronization API"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/web_periodic_background_synchronization_api/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Web Periodic Background Synchronization API

The **Web Periodic Background Synchronization API** provides a way to register tasks to be run in a `service worker` at periodic intervals with network connectivity. These tasks are referred to as periodic background sync requests.

## Concepts and Usage

The Periodic Background Sync API allows web applications to alert their service worker to make any updates, at a periodic time interval. Uses may include fetching latest content while a device is connected to Wi-Fi, or allowing background updates to an application.

The minimum time interval is set when the API is invoked; however the user agent might also take into account other factors which affect when the service worker receives the event. For instance previous website engagement, or connection to a known network.

The `PeriodicSyncManager` interface is available through `ServiceWorkerRegistration.periodicSync`. A unique tag identifier is set to 'name' the sync event, which can then be listened for within the `ServiceWorker` script. Once the event is received you can then run any functionality available, such as updating caches or fetching new resources.

As this API relies on service workers, functionality provided by this API is only available in a secure context.

## Interfaces

- `PeriodicSyncManager` (experimental)
    Registers tasks to be run in a service worker at periodic intervals with network connectivity. These tasks are referred to as periodic background sync requests.
- `PeriodicSyncEvent` (experimental)
    Represents a synchronization event, sent to the `global scope` of a `ServiceWorker`. It provides a way to run tasks in the service worker with network connectivity.

### Extensions to other interfaces

The following additions to the `Service Worker API` are specified in the Periodic Background Sync specification to provide an entry point for using Periodic Background Sync.

- `ServiceWorkerRegistration.periodicSync` (read-only) (experimental)
    Returns a reference to the `PeriodicSyncManager` interface for registering tasks to run at specific intervals.
- `periodicsync` event (experimental)
    Occurs at periodic intervals, which were specified when registering a `PeriodicSyncManager`.

## Security considerations

Access to periodic background sync is controlled by the `periodic-background-sync` permission.
You can use the Permissions API to check whether this permission is granted:

```js
const status = await navigator.permissions.query({
  name: "periodic-background-sync",
});
```

In Chrome, the permission is granted only to an installed web app that has been launched as a separate application.
Chrome also uses the site's engagement score to determine whether and how often to fire periodic sync events.

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

### Listening for a Periodic Background Sync within a Service Worker

The following example shows how to respond to a periodic sync event in the service worker.

```js
self.addEventListener("periodicsync", (event) => {
  if (event.tag === "get-latest-news") {
    event.waitUntil(fetchAndCacheLatestNews());
  }
});
```

## See also

- An article on using Periodic Background Sync
