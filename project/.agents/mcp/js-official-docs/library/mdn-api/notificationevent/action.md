---
title: "NotificationEvent: action property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/notificationevent/action/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# NotificationEvent: action property

The **`action`** read-only property of the `NotificationEvent` interface returns the string ID of the notification button the user clicked. This value returns an empty string if the user clicked the notification somewhere other than an action button, or the notification does not have a button. The notification id is set during the creation of the Notification via the actions array attribute and can't be modified unless the notification is replaced.

## Value

A string.

## Examples

```js
self.registration.showNotification("New articles available", {
  actions: [{ action: "get", title: "Get now." }],
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  if (event.action === "get") {
    synchronizeReader();
  } else {
    clients.openWindow("/reader");
  }
});
```
