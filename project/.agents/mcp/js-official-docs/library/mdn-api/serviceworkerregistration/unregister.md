---
title: "ServiceWorkerRegistration: unregister() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/serviceworkerregistration/unregister/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ServiceWorkerRegistration: unregister() method

The **`unregister()`** method of the
`ServiceWorkerRegistration` interface unregisters the service worker
registration and returns a `Promise`. The promise will resolve to
`false` if no registration was found, otherwise it resolves to
`true` irrespective of whether unregistration happened or not (it may not
unregister if someone else just called `ServiceWorkerContainer.register()`
with the same scope.) The service worker will finish any ongoing operations before it is
unregistered.

## Syntax

```js
unregister()
```

### Parameters

None.

### Return value

`Promise` resolves with a boolean indicating whether the service worker has
unregistered or not.

## Examples

The following simple example registers a service worker example, but then immediately
unregisters it again:

```js
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js", { scope: "/" })
    .then((registration) => {
      // registration worked
      console.log("Registration succeeded.");
      registration.unregister().then((boolean) => {
        // if boolean = true, unregister is successful
      });
    })
    .catch((error) => {
      // registration failed
      console.error(`Registration failed with ${error}`);
    });
}
```

## See also

- Using Service Workers
- Service workers basic code example
- Using web workers
