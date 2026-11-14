---
title: "Clients: claim() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/clients/claim/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Clients: claim() method

The **`claim()`** method of the `Clients` interface allows an active service worker to set itself as the `controller` for all clients within its `scope`.
This triggers a `controllerchange` event on `navigator.serviceWorker` in any clients that become controlled by this service worker.

When a service worker is initially registered, pages won't use it until they next
load. The `claim()` method causes those pages to be controlled immediately.
Be aware that this results in your service worker controlling pages that loaded
regularly over the network, or possibly via a different service worker.

## Syntax

```js
claim()
```

### Parameters

None.

### Return value

A `Promise` that resolves to `undefined`.

## Examples

The following example uses `claim()` inside service worker's `activate` event listener so that clients loaded in the same scope do not need to be reloaded before their fetches will go through this service worker.

```js
self.addEventListener("activate", (event) => {
  event.waitUntil(clients.claim());
});
```

## See also

- Using Service Workers
- The service worker lifecycle
- `self.skipWaiting()` - skip the service worker's waiting phase
