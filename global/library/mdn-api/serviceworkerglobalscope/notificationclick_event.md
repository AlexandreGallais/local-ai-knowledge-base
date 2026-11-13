---
title: "ServiceWorkerGlobalScope: notificationclick event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/serviceworkerglobalscope/notificationclick_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ServiceWorkerGlobalScope: notificationclick event

The **`notificationclick`** event of the `ServiceWorkerGlobalScope` interface is fired to indicate that a system notification spawned by `ServiceWorkerRegistration.showNotification()` has been clicked.

Notifications created on the main thread or in workers which aren't service workers
using the `Notification()` constructor will
instead receive a `click` event on the `Notification` object
itself.

This event is not cancelable and does not bubble.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("notificationclick", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onnotificationclick = (event) => { }
```

## Event type

A `NotificationEvent`. Inherits from `ExtendableEvent` and `Event`.

## Examples

You can use the `notificationclick` event in an `addEventListener` method:

```js
self.addEventListener("notificationclick", (event) => {
  console.log("On notification click: ", event.notification.tag);
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
          if (
            client.url === new URL("/", self.location.origin).href &&
            "focus" in client
          ) {
            return client.focus();
          }
        }
        if (clients.openWindow) return clients.openWindow("/");
      }),
  );
});
```

Or use the `onnotificationclick` event handler property (but note that this replaces other event listeners added using `onnotificationclick`, if any):

```js
self.onnotificationclick = (event) => {
  console.log("On notification click: ", event.notification.tag);
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
          if (
            client.url === new URL("/", self.location.origin).href &&
            "focus" in client
          ) {
            return client.focus();
          }
        }
        if (clients.openWindow) return clients.openWindow("/");
      }),
  );
};
```

You can handle event actions using `event.action` within a `notificationclick` event handler:

```js
navigator.serviceWorker.register("sw.js");
Notification.requestPermission().then((result) => {
  if (result === "granted") {
    navigator.serviceWorker.ready.then((registration) => {
      // Show a notification that includes an action titled Archive.
      registration.showNotification("New mail from Alice", {
        actions: [
          {
            action: "archive",
            title: "Archive",
          },
        ],
      });
    });
  }
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  if (event.action === "archive") {
    // User selected the Archive action.
    archiveEmail();
  } else {
    // User selected (e.g., clicked in) the main body of notification.
    clients.openWindow("/inbox");
  }
});
```

## See also

- Service Worker API
- Notifications API
