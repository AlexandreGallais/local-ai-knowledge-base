---
title: "ServiceWorkerContainer: message event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/serviceworkercontainer/message_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ServiceWorkerContainer: message event

The **`message`** event is used in a page controlled by a service worker to receive messages from the service worker.

This event is not cancelable and does not bubble.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("message", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onmessage = (event) => { }
```

## Event type

A `MessageEvent`. Inherits from `Event`.

## Examples

In this example the service worker get the client's ID from a `fetch` event and then sends it a message using `Client.postMessage`:

```js
// service-worker.js
async function messageClient(clientId) {
  const client = await clients.get(clientId);
  client.postMessage("Hi client!");
}

addEventListener("fetch", (event) => {
  messageClient(event.clientId);
  event.respondWith(() => {
    // …
  });
});
```

The client can receive the message by listening to the `message` event:

```js
// main.js
navigator.serviceWorker.addEventListener("message", (message) => {
  console.log(message);
});
```

Alternatively, the client can receive the message with the `onmessage` event handler (but note that this replaces other event listeners added using `onmessage`, if any):

```js
// main.js
navigator.serviceWorker.onmessage = (message) => {
  console.log(message);
};
```

## See also

- Using Service Workers
- Service workers basic code example
- Using web workers
