---
title: "Client: postMessage() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/client/postmessage/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Client: postMessage() method

The **`postMessage()`** method of the
`Client` interface allows a service worker to send a message to a client
(a `Window`, `Worker`, or `SharedWorker`). The
message is received in the `message` event on
`navigator.serviceWorker`.

## Syntax

```js
postMessage(message)
postMessage(message, transfer)
postMessage(message, options)
```

### Parameters

- `message`
    The message to send to the client. This can be any structured-cloneable type.

    > **Note:**
    > A service worker is not in the same agent cluster as its client, and therefore cannot share memory. `SharedArrayBuffer` objects, or buffer views backed by one, cannot be posted across agent clusters. Trying to do so will generate a `messageerror` event containing a `DataCloneError` `DOMException` on the receiving end.

- `transfer` (optional)
    An optional array of transferable objects to transfer ownership of. The ownership of these objects is given to the destination side and they are no longer usable on the sending side. These transferable objects are not automatically sent; they must either be contained in the message or be accessible to the recipient via other means, such as `MessagePort` via `MessageEvent.ports`.
- `options` (optional)
    An optional object containing the following properties:
    - `transfer` (optional)
        Has the same meaning as the `transfer` parameter.

### Return value

None (`undefined`).

## Examples

The code below sends a message from a service worker to a client. The client is fetched using the `get()` method on `clients`, which is a global in service worker scope.

```js
addEventListener("fetch", (event) => {
  event.waitUntil(
    (async () => {
      // Exit early if we don't have access to the client.
      // Eg, if it's cross-origin.
      if (!event.clientId) return;

      // Get the client.
      const client = await self.clients.get(event.clientId);
      // Exit early if we don't get the client.
      // Eg, if it closed.
      if (!client) return;

      // Send a message to the client.
      client.postMessage({
        msg: "Hey I just got a fetch from you!",
        url: event.request.url,
      });
    })(),
  );
});
```

Receiving that message:

```js
navigator.serviceWorker.addEventListener("message", (event) => {
  console.log(event.data.msg, event.data.url);
});
```
