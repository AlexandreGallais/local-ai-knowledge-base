---
title: "ServiceWorkerGlobalScope: periodicsync event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/serviceworkerglobalscope/periodicsync_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ServiceWorkerGlobalScope: periodicsync event

The **`periodicsync`** event of the `ServiceWorkerGlobalScope` interface is fired at timed intervals, specified when registering a `PeriodicSyncManager`.

This event is not cancelable and does not bubble.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("periodicsync", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onperiodicsync = (event) => { }
```

## Event type

A `PeriodicSyncEvent`. Inherits from `Event`.

## Examples

The following example shows how to respond to a periodic sync event in the service worker.

```js
self.addEventListener("periodicsync", (event) => {
  if (event.tag === "get-latest-news") {
    event.waitUntil(fetchAndCacheLatestNews());
  }
});
```

You can also set up the event handler using the `onperiodicsync` property (but note that this replaces other event listeners added using `onperiodicsync`, if any):

```js
self.onperiodicsync = (event) => {
  // …
};
```

## See also

- Richer offline experiences with the Periodic Background Sync API
