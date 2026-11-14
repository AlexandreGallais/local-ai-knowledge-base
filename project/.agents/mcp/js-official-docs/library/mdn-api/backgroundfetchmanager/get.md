---
title: "BackgroundFetchManager: get() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/backgroundfetchmanager/get/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# BackgroundFetchManager: get() method

The **`get()`** method of the `BackgroundFetchManager` interface returns a `Promise` that resolves with the `BackgroundFetchRegistration` associated with the provided `id` or `undefined` if the `id` is not found.

## Syntax

```js
get(id)
```

### Parameters

- `id`
    The ID of a `BackgroundFetchRegistration` defined by calling `fetch()`.

### Return value

A `Promise` that resolves with a `BackgroundFetchRegistration` or `undefined`.

## Examples

The following example shows how to use `get()` to retrieve a `BackgroundFetchRegistration`. With an active service worker, use the `ServiceWorkerRegistration.backgroundFetch` to access the `BackgroundFetchManager` object and call its `get()` method.

```js
navigator.serviceWorker.ready.then(async (swReg) => {
  const bgFetch = await swReg.backgroundFetch.get("my-fetch");
});
// my code block
```
