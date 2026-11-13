---
title: "ServiceWorkerGlobalScope: install event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/serviceworkerglobalscope/install_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ServiceWorkerGlobalScope: install event

The **`install`** event of the `ServiceWorkerGlobalScope` interface is fired when a `ServiceWorkerRegistration` acquires a new `ServiceWorkerRegistration.installing` worker.

This event is not cancelable and does not bubble.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("install", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
oninstall = (event) => { }
```

## Event type

An `ExtendableEvent`. Inherits from `Event`.

## Examples

The following snippet shows how an `install` event handler can be used to populate a cache with a number of responses, which the service worker can then use to serve assets offline:

```js
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open("v1")
      .then((cache) =>
        cache.addAll([
          "/",
          "/index.html",
          "/style.css",
          "/app.js",
          "/image-list.js",
          "/star-wars-logo.jpg",
          "/gallery/",
          "/gallery/bountyHunters.jpg",
          "/gallery/myLittleVader.jpg",
          "/gallery/snowTroopers.jpg",
        ]),
      ),
  );
});
```

You can also set up the event handler using the `oninstall` property (but note that this replaces other event listeners added using `oninstall`, if any):

```js
self.oninstall = (event) => {
  // …
};
```

## See also

- `activate` event
- `ServiceWorkerGlobalScope`
- Service Worker API
