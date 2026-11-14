---
title: "ServiceWorkerContainer: messageerror event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/serviceworkercontainer/messageerror_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ServiceWorkerContainer: messageerror event

The **`messageerror`** event is fired to the `ServiceWorkerContainer` when an incoming message sent to the associated worker can't be deserialized.

This event is not cancelable and does not bubble.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("messageerror", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onmessageerror = (event) => { }
```

## Event type

A `MessageEvent`. Inherits from `Event`.

## Examples

In this example the service worker get the client's ID from a `fetch` event and then sends it a message using `Client.postMessage`:

```js
// service-worker.js
async function messageClient(clientId) {
  const client = await self.clients.get(clientId);
  client.postMessage("Hi client!");
}

self.addEventListener("fetch", (event) => {
  messageClient(event.clientId);
  event.respondWith(() => {
    // …
  });
});
```

The service worker can listen for the message deserialization error by listening to the `messageerror` event:

```js
// main.js
navigator.serviceWorker.addEventListener("messageerror", (event) => {
  console.error("Receive message from service worker failed!");
});
```

Alternatively, the script can listen for the message deserialization error using `onmessageerror` (but note that this replaces other event listeners added using `onmessageerror`, if any):

```js
// main.js
navigator.serviceWorker.onmessageerror = (event) => {
  console.error("Receive message from service worker failed!");
};
```

## See also

- `message`
- `Client.postMessage()`
- Using Service Workers
- Service workers basic code example
- Using Web Workers
