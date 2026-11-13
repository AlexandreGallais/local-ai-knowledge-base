---
title: "ServiceWorkerRegistration: updateViaCache property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/serviceworkerregistration/updateviacache/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ServiceWorkerRegistration: updateViaCache property

The **`updateViaCache`** read-only property of the `ServiceWorkerRegistration` interface returns the value of the setting used to determine the circumstances in which the browser will consult the HTTP cache when it tries to update the service worker or any scripts that are imported via `importScripts()`.

## Value

Returns one of the following values:

- `imports`, meaning the HTTP cache is not consulted for updates to the service worker script, but is consulted for scripts imported using `importScripts()`. This is the default value.
- `all`, meaning the HTTP cache is consulted for updates to the service worker script and for scripts imported using `importScripts()`.
- `none`, meaning the HTTP cache is never consulted.

## Examples

The following example shows the use of updateViaCache.

```js
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/service-worker.js", {
      updateViaCache: "none",
    })
    .then((registration) => {
      registration.addEventListener("updatefound", () => {
        // If updatefound is fired, it means that there's
        // a new service worker being installed.
        console.log(`Value of updateViaCache: ${registration.updateViaCache}`);
      });
    })
    .catch((error) => {
      console.error(`Service worker registration failed: ${error}`);
    });
}
```

## See also

- Using Service Workers
- Service workers basic code example
- Using web workers
