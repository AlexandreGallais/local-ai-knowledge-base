---
title: "ServiceWorkerGlobalScope: activate event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/serviceworkerglobalscope/activate_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ServiceWorkerGlobalScope: activate event

The **`activate`** event of the `ServiceWorkerGlobalScope` interface is fired when a `ServiceWorkerRegistration` acquires a new `ServiceWorkerRegistration.active` worker.

This event is not cancelable and does not bubble.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("activate", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onactivate = (event) => { }
```

## Event type

An `ExtendableEvent`. Inherits from `Event`.

## Examples

The following snippet shows how you could use an `activate` event handler to upgrade a cache.

```js
self.addEventListener("activate", (event) => {
  const cacheAllowlist = ["v2"];

  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheAllowlist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
          return undefined;
        }),
      ),
    ),
  );
});
```

You can also set up the event handler using the `onactivate` property (but note that this replaces other event listeners added using `onactivate`, if any):

```js
self.onactivate = (event) => {
  // …
};
```

## See also

- `install` event
- `ServiceWorkerGlobalScope`
- Service Worker API
