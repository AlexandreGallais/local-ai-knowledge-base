---
title: "NotificationEvent: notification property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/notificationevent/notification/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# NotificationEvent: notification property

The **`notification`** read-only property of the `NotificationEvent` interface returns the instance of the `Notification` that was clicked to fire the event. The `Notification` provides read-only access to many properties that were set at the instantiation time of the Notification such as `tag` and `data` attributes that allow you to store information for deferred use in the `notificationclick` event.

## Value

A `Notification` object.

## Examples

```js
self.addEventListener("notificationclick", (event) => {
  console.log("On notification click");

  // Data can be attached to the notification so that you
  // can process it in the notificationclick handler.
  console.log(`Notification Tag: ${event.notification.tag}`);
  console.log(`Notification Data: ${event.notification.data}`);
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
