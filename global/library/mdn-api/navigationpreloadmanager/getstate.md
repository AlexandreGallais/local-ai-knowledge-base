---
title: "NavigationPreloadManager: getState() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/navigationpreloadmanager/getstate/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# NavigationPreloadManager: getState() method

The **`getState()`** method of the `NavigationPreloadManager` interface returns a `Promise` that resolves to an object with properties that indicate whether preload is enabled and what value will be sent in the `Service-Worker-Navigation-Preload` HTTP header.

## Syntax

```js
getState()
```

### Parameters

None.

### Return value

A `Promise` that resolves with an object that has the following properties:

- `enabled`
    `true` if preloading is enabled, and `false` otherwise.
- `headerValue`
    A string containing the value that will be sent in the `Service-Worker-Navigation-Preload` HTTP header following a preloading `fetch()`.
    This defaults to `true` unless the value was changed using `NavigationPreloadManager.setHeaderValue()`.

### Exceptions

- `InvalidStateError` `DOMException`
    There is no active worker associated with the registration to which this `NavigationPreloadManager` belongs.

## Examples

The code below shows a request for the current state, made once the service worker is ready.

```js
navigator.serviceWorker.ready
  .then((registration) => registration.navigationPreload.getState())
  .then((state) => {
    console.log(state.enabled); // boolean
    console.log(state.headerValue); // string
  })
  .catch((e) =>
    console.error(`NavigationPreloadManager not supported: ${e.message}`),
  );
```
