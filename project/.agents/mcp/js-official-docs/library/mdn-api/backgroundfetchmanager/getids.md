---
title: "BackgroundFetchManager: getIds() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/backgroundfetchmanager/getids/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# BackgroundFetchManager: getIds() method

The **`getIds()`** method of the `BackgroundFetchManager` interface returns the IDs of all registered background fetches.

## Syntax

```js
getIds()
```

### Parameters

None.

### Return value

A `Promise` that resolves with an `Array` of `strings`.

### Exceptions

None.

## Examples

The following example shows how to retrieve the IDs of all registered background fetches. With an active service worker, use the `ServiceWorkerRegistration.backgroundFetch` property to access the `BackgroundFetchManager` object and call its `getIds()` method.

```js
navigator.serviceWorker.ready.then(async (swReg) => {
  const ids = await swReg.backgroundFetch.getIds();
});
```
