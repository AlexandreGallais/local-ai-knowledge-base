---
title: "ServiceWorkerRegistration: updatefound event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/serviceworkerregistration/updatefound_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ServiceWorkerRegistration: updatefound event

The **`updatefound`** event of the
`ServiceWorkerRegistration` interface is fired any time the `ServiceWorkerRegistration.installing` property acquires a new service worker.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("updatefound", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onupdatefound = (event) => { }
```

## Event type

A generic `Event`.

## Examples

```js
const registration = await navigator.serviceWorker.getRegistration();
if (registration) {
  registration.addEventListener("updatefound", () => {
    console.log("Service Worker update found!");
  });
}
```

## See also

- Using Service Workers
