---
title: "WindowClient: focused property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/windowclient/focused/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WindowClient: focused property

The **`focused`** read-only property of the
`WindowClient` interface is a boolean value that indicates whether
the current client has focus.

## Value

A boolean value.

## Examples

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
          if (client.url === "/" && "focus" in client) {
            if (!client.focused) return client.focus();
          }
        }

        if (clients.openWindow) return clients.openWindow("/");
      }),
  );
});
```
