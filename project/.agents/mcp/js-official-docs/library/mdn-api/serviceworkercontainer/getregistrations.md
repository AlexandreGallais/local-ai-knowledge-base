---
title: "ServiceWorkerContainer: getRegistrations() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/serviceworkercontainer/getregistrations/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ServiceWorkerContainer: getRegistrations() method

The **`getRegistrations()`** method of the
`ServiceWorkerContainer` interface gets all
`ServiceWorkerRegistration`s associated with a
`ServiceWorkerContainer`, in an array. The method returns a
`Promise` that resolves to an array of
`ServiceWorkerRegistration`.

## Syntax

```js
getRegistrations()
```

### Parameters

None.

### Return value

A `Promise` that resolves to an array of
`ServiceWorkerRegistration` objects.

## Examples

```js
navigator.serviceWorker.getRegistrations().then((registrations) => {
  document.querySelector("#status").textContent =
    "ServiceWorkerRegistrations found.";
});
```
