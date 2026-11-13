---
title: "WindowClient"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/windowclient/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WindowClient

The `WindowClient` interface of the ServiceWorker API represents the scope of a service worker client that is a document in a browsing context, controlled by an active worker. The service worker client independently selects and uses a service worker for its own loading and sub-resources.

## Instance properties

_`WindowClient` inherits properties from its parent interface, `Client`._

- `WindowClient.ancestorOrigins` (read-only) (experimental)
    An array of strings that indicates the ancestor origins of the browsing context represented by this `WindowClient` in reverse order.
- `WindowClient.focused` (read-only)
    A boolean that indicates whether the current client has focus.
- `WindowClient.visibilityState` (read-only)
    Indicates the visibility of the current client. This value can be one of `"hidden"` or `"visible"`.

## Instance methods

_`WindowClient` inherits methods from its parent interface, `Client`._

- `WindowClient.focus()`
    Gives user input focus to the current client.
- `WindowClient.navigate()`
    Loads a specified URL into a controlled client page.

## Example

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
            client.focus();
            break;
          }
        }
        if (clients.openWindow) return clients.openWindow("/");
      }),
  );
});
```

## See also

- Using Service Workers
- Service workers basic code example
- Using web workers
- Channel Messaging API
