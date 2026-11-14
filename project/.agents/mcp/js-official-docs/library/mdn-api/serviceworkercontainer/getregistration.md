---
title: "ServiceWorkerContainer: getRegistration() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/serviceworkercontainer/getregistration/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ServiceWorkerContainer: getRegistration() method

The **`getRegistration()`** method of the
`ServiceWorkerContainer` interface gets a
`ServiceWorkerRegistration` object whose scope URL matches the provided
client URL. The method returns a `Promise` that resolves to
a `ServiceWorkerRegistration` or `undefined`.

## Syntax

```js
getRegistration()
getRegistration(clientURL)
```

### Parameters

- `clientURL` (optional)
    The registration whose scope matches this URL will be returned. Relative URLs are resolved with the current client as the base. If this parameter is not provided, the current client's URL will be used by default.

### Return value

A `Promise` that resolves to a `ServiceWorkerRegistration`
object or `undefined`.

## Examples

```js
navigator.serviceWorker.getRegistration("/app").then((registration) => {
  if (registration) {
    document.querySelector("#status").textContent =
      "ServiceWorkerRegistration found.";
  }
});
```
