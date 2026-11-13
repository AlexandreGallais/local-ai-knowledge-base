---
title: "NavigationPreloadManager: enable() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/navigationpreloadmanager/enable/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# NavigationPreloadManager: enable() method

The **`enable()`** method of the `NavigationPreloadManager` interface is used to enable preloading of resources managed by the service worker.
It returns a promise that resolves with `undefined`.

The method should be called in the service worker's `activate` event handler, which ensures it is called before any `fetch` event handler can fire.

## Syntax

```js
enable()
```

### Parameters

None.

### Return value

A `Promise` that resolves with `undefined`.

### Exceptions

- `InvalidStateError` `DOMException`
    There is no active worker associated with the registration to which this `NavigationPreloadManager` belongs.

## Examples

The code below shows how to enable preloading, after first using `ServiceWorkerRegistration.navigationPreload` to test that it is supported.

```js
addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      if (self.registration.navigationPreload) {
        // Enable navigation preloads!
        await self.registration.navigationPreload.enable();
      }
    })(),
  );
});
```

## See also

- `NavigationPreloadManager.disable()`
