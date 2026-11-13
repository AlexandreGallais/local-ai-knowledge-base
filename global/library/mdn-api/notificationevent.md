---
title: "NotificationEvent"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/notificationevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# NotificationEvent

The **`NotificationEvent`** interface of the `Notifications API` represents a notification event dispatched on the `ServiceWorkerGlobalScope` of a `ServiceWorker`.

This interface inherits from the `ExtendableEvent` interface.

> **Note:**
> Only persistent notification events, fired at the `ServiceWorkerGlobalScope` object, implement the `NotificationEvent` interface. Non-persistent notification events, fired at the `Notification` object, implement the `Event` interface.

## Constructor

- `NotificationEvent()`
    Creates a new `NotificationEvent` object.

## Instance properties

_Also inherits properties from its parent interface, `ExtendableEvent`_.

- `NotificationEvent.notification` (read-only)
    Returns a `Notification` object representing the notification that was clicked to fire the event.
- `NotificationEvent.action` (read-only)
    Returns the string ID of the notification button the user clicked. This value returns an empty string if the user clicked the notification somewhere other than an action button, or the notification does not have a button.

## Instance methods

_Also inherits methods from its parent interface, `ExtendableEvent`_.

## Example

```js
self.addEventListener("notificationclick", (event) => {
  console.log(`On notification click: ${event.notification.tag}`);
  event.notification.close();

  // This looks to see if the current is already open and
  // focuses if it is
  event.waitUntil(
    clients
      .matchAll({
        type: "window",
      })
      .then((clientList) => {
        for (const client of clientList) {
          if (client.url === "/" && "focus" in client) return client.focus();
        }
        if (clients.openWindow) return clients.openWindow("/");
      }),
  );
});
```

## Specifications

> **Note:**
> This interface is specified in the Notifications API, but accessed through `ServiceWorkerGlobalScope`.
