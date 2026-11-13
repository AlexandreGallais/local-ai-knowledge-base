---
title: "Client: url property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/client/url/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Client: url property

The **`url`** read-only property of the `Client` interface returns the URL of the current service worker client.

Note that the `url` property is not updated unless a new page is actually loaded. This means that it will not be updated if the user navigates within the same page using a URL fragment, or if a single-page app (SPA) intercepts a navigation event (for example, using the Navigation API) and updates the page content using client-side code.

## Value

A string.

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
            return client.focus();
          }
        }
        if (clients.openWindow) {
          return clients.openWindow("/");
        }
      }),
  );
});
```
