---
title: "ServiceWorkerGlobalScope: notificationclose event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/serviceworkerglobalscope/notificationclose_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ServiceWorkerGlobalScope: notificationclose event

The **`notificationclose`** event of the `ServiceWorkerGlobalScope` interface fires when a user closes a displayed notification spawned by `ServiceWorkerRegistration.showNotification()`.

Notifications created on the main thread or in workers which aren't service workers
using the `Notification()` constructor will
instead receive a `close` event on the `Notification` object
itself.

This event is not cancelable and does not bubble.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("notificationclose", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onnotificationclose = (event) => { }
```

## Event type

A `NotificationEvent`. Inherits from `ExtendableEvent` and `Event`.

## Example

```js
// Inside a service worker.
self.onnotificationclose = (event) => {
  console.log("On notification close: ", event.notification.tag);
};
```
