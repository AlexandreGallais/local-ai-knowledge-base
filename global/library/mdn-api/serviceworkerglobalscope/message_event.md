---
title: "ServiceWorkerGlobalScope: message event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/serviceworkerglobalscope/message_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ServiceWorkerGlobalScope: message event

The **`message`** event of the `ServiceWorkerGlobalScope` interface occurs when incoming messages are received. Controlled pages can use the `ServiceWorker.postMessage()` method to send messages to service workers.
The service worker can optionally send a response back via the `Client.postMessage()`, corresponding to the controlled page.

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

An `ExtendableMessageEvent`. Inherits from `ExtendableEvent`.

## Examples

In the below example a page gets a handle to the `ServiceWorker` object via `ServiceWorkerRegistration.active`, and then calls its `postMessage()` function.

```js
// main.js
if (navigator.serviceWorker) {
  navigator.serviceWorker.register("service-worker.js");

  navigator.serviceWorker.addEventListener("message", (event) => {
    // event is a MessageEvent object
    console.log(`The service worker sent me a message: ${event.data}`);
  });

  navigator.serviceWorker.ready.then((registration) => {
    registration.active.postMessage("Hi service worker");
  });
}
```

The service worker can receive the message by listening to the `message` event:

```js
// service-worker.js
addEventListener("message", (event) => {
  // event is an ExtendableMessageEvent object
  console.log(`The client sent me a message: ${event.data}`);

  event.source.postMessage("Hi client");
});
```

Alternatively, the script can listen for the message using `onmessage` (but note that this replaces other event listeners added using `onmessage`, if any):

```js
// service-worker.js
self.onmessage = (event) => {
  // event is an ExtendableMessageEvent object
  console.log(`The client sent me a message: ${event.data}`);

  event.source.postMessage("Hi client");
};
```

## See also

- Using Service Workers
- Service workers basic code example
- Using web workers
