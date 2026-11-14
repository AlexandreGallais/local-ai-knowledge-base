---
title: "NavigationPreloadManager: disable() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/navigationpreloadmanager/disable/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# NavigationPreloadManager: disable() method

The **`disable()`** method of the `NavigationPreloadManager` interface halts the automatic preloading of service-worker-managed resources previously started using `enable()`
It returns a promise that resolves with `undefined`.

The method may be called in the service worker's `activate` event handler (before the `fetch` event handler can be called).

## Syntax

```js
disable()
```

### Parameters

None.

### Return value

A `Promise` that resolves with `undefined`.

### Exceptions

- `InvalidStateError` `DOMException`
    There is no active worker associated with the registration to which this `NavigationPreloadManager` belongs.

## Examples

The code below shows how to disable preloading, after first using `ServiceWorkerRegistration.navigationPreload` to test that it is supported.

```js
addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      if (self.registration.navigationPreload) {
        // Disable navigation preloads!
        await self.registration.navigationPreload.disable();
      }
    })(),
  );
});
```

## See also

- `NavigationPreloadManager.enable()`
