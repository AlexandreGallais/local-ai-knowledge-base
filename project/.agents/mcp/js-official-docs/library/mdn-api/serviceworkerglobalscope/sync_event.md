---
title: "ServiceWorkerGlobalScope: sync event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/serviceworkerglobalscope/sync_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ServiceWorkerGlobalScope: sync event

The **`sync`** event of the `ServiceWorkerGlobalScope` interface is fired when the page (or worker) that registered the event with the `SyncManager` is running and as soon as network connectivity is available.

This event is not cancelable and does not bubble.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("sync", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onsync = (event) => { }
```

## Event type

A `SyncEvent`. Inherits from `ExtendableEvent` and `Event`.

## Examples

The following example shows how to respond to a sync event in the service worker.

```js
self.addEventListener("sync", (event) => {
  if (event.tag === "sync-messages") {
    event.waitUntil(sendOutboxMessages());
  }
});
```

You can also set up the event handler using the `onsync` property (but note that this replaces other event listeners added using `onsync`, if any):

```js
self.onsync = (event) => {
  // …
};
```

## See also

- Richer offline experiences with the Periodic Background Sync API
