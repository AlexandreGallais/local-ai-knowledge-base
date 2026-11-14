---
title: "WindowClient: visibilityState property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/windowclient/visibilitystate/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WindowClient: visibilityState property

The **`visibilityState`** read-only property of the
`WindowClient` interface indicates the visibility of the current client.
This value can be one of `"hidden"`, `"visible"`, or
`"prerender"`.

## Value

A string (See `Document.visibilityState` for values).

## Examples

```js
event.waitUntil(
  clients
    .matchAll({
      type: "window",
    })
    .then((clientList) => {
      for (const client of clientList) {
        if (client.url === "/" && "focus" in client) {
          if (client.visibilityState === "hidden") return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow("/");
      }
    }),
);
```
