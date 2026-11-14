---
title: "SyncManager: register() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/syncmanager/register/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SyncManager: register() method

The **`register()`** method of the `SyncManager` interface registers a synchronization event, triggering a `sync` event inside the associated service worker as soon as network connectivity is available.

## Syntax

```js
register(tag)
```

### Parameters

- `tag`
    An identifier for this synchronization event. This will be the value of the `tag` property of the `SyncEvent` that gets passed into the service worker's `sync` event handler.

### Return value

A `Promise` that resolves to `undefined`.

### Exceptions

- `InvalidStateError` `DOMException`
    Thrown if current service worker is not active.
- `NotAllowedError` `DOMException`
    Thrown if background sync has been disabled by the user.

## Examples

The following asynchronous function registers a background sync from a browsing context:

```js
async function syncMessagesLater() {
  const registration = await navigator.serviceWorker.ready;
  try {
    await registration.sync.register("sync-messages");
  } catch {
    console.log("Background Sync could not be registered!");
  }
}
```
