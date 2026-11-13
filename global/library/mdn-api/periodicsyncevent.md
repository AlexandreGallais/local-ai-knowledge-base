---
title: "PeriodicSyncEvent"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/periodicsyncevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PeriodicSyncEvent

The **`PeriodicSyncEvent`** interface of the `Web Periodic Background Synchronization API` provides a way to run tasks in the service worker with network connectivity.

An instance of this event is passed to the `periodicsync` handler. This happens periodically, at an interval greater than or equal to that set in the `PeriodicSyncManager.register()` method. Other implementation-specific factors such as the user's engagement with the site decide the actual interval.

## Constructor

- `PeriodicSyncEvent()` (experimental)
    Creates a new `PeriodicSyncEvent` object. This constructor is not typically used. The browser creates these objects itself and provides them to `onperiodicsync` callback.

## Instance properties

_Inherits properties from its parent, `ExtendableEvent`._

- `PeriodicSyncEvent.tag` (read-only) (experimental)
    Returns the developer-defined identifier for this `PeriodicSyncEvent`. Multiple tags can be used by the web app to run different periodic tasks at different frequencies.

## Instance methods

_Inherits methods from its parent, `ExtendableEvent`._

## Examples

The following example shows how to respond to a periodic sync event in the service worker.

```js
self.addEventListener("periodicsync", (event) => {
  if (event.tag === "get-latest-news") {
    event.waitUntil(fetchAndCacheLatestNews());
  }
});
```

`fetchAndCacheLatestNews` is a developer defined function.

## See also

- Richer offline experiences with the Periodic Background Sync API
