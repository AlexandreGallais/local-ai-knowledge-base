---
title: "WindowClient: focus() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/windowclient/focus/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WindowClient: focus() method

The **`focus()`** method of the `WindowClient`
interface gives user input focus to the current client and returns a
`Promise` that resolves to the existing
`WindowClient`.

## Syntax

```js
focus()
```

### Parameters

None.

### Return value

A `Promise` that resolves to the existing `WindowClient`.

### Exceptions

- `InvalidAccessError` `DOMException`
    The promise is rejected with this exception if none of the windows in the app's origin have transient activation.

## Security requirements

- At least one window in the app's origin must have transient activation.

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
          if (client.url === "/" && "focus" in client) return client.focus();
        }
        if (clients.openWindow) return clients.openWindow("/");
      }),
  );
});
```
