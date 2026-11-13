---
title: "Clients"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/clients/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Clients

The `Clients` interface provides access to `Client` objects. Access it via ``self`.clients` within a service worker.

## Instance methods

- `Clients.get()`
    Returns a `Promise` for a `Client` matching a given `id`.
- `Clients.matchAll()`
    Returns a `Promise` for an array of `Client` objects. An options argument allows you to control the types of clients returned.
- `Clients.openWindow()`
    Opens a new browser window for a given URL and returns a `Promise` for the new `WindowClient`.
- `Clients.claim()`
    Allows an active service worker to set itself as the `controller` for all clients within its `scope`.

## Examples

The following example shows an existing chat window or creates a new one when the user clicks a notification.

```js
addEventListener("notificationclick", (event) => {
  event.waitUntil(
    (async () => {
      const allClients = await clients.matchAll({
        includeUncontrolled: true,
      });

      let chatClient;

      // Let's see if we already have a chat window open:
      for (const client of allClients) {
        const url = new URL(client.url);

        if (url.pathname === "/chat/") {
          // Excellent, let's use it!
          client.focus();
          chatClient = client;
          break;
        }
      }

      // If we didn't find an existing chat window,
      // open a new one:
      chatClient ??= await clients.openWindow("/chat/");

      // Message the client:
      chatClient.postMessage("New chat messages!");
    })(),
  );
});
```

## See also

- Using Service Workers
