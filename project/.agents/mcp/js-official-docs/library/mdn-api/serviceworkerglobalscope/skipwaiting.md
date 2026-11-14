---
title: "ServiceWorkerGlobalScope: skipWaiting() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/serviceworkerglobalscope/skipwaiting/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ServiceWorkerGlobalScope: skipWaiting() method

The **`skipWaiting()`** method of the `ServiceWorkerGlobalScope` interface forces the waiting service worker to become the active service worker.

Use this method with `Clients.claim()` to ensure that updates to the underlying service worker take effect immediately for both the current client and all other active clients.

## Syntax

```js
skipWaiting()
```

### Parameters

None.

### Return value

A `Promise` that resolves with `undefined` after trying to activate the newly installed service worker.

## Examples

While `self.skipWaiting()` can be called at any point during the service worker's execution, it will only have an effect if there's a newly installed service worker that might otherwise remain in the `waiting` state. Therefore, it's common to call `self.skipWaiting()` from inside of an `InstallEvent` handler.

The following example causes a newly installed service worker to progress into the `activating` state, regardless of whether there is already an active service worker.

```js
self.addEventListener("install", (event) => {
  // The promise that skipWaiting() returns can be safely ignored.
  self.skipWaiting();

  // Perform any other actions required for your
  // service worker to install, potentially inside
  // of event.waitUntil();
});
```

## See also

- Using Service Workers
- Service workers basic code example
- `Clients.claim()`
- Using web workers
