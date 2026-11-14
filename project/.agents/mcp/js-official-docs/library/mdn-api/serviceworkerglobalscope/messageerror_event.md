---
title: "ServiceWorkerGlobalScope: messageerror event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/serviceworkerglobalscope/messageerror_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ServiceWorkerGlobalScope: messageerror event

The **`messageerror`** event of the `ServiceWorkerGlobalScope` interface occurs when incoming messages can't be deserialized.

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

The service worker can listen for the message deserialization error by listening to the `messageerror` event:

```js
// service-worker.js
self.addEventListener("messageerror", (event) => {
  // event is an ExtendableMessageEvent object
  console.error("Message deserialization failed");
});
```

Alternatively, the script can listen for the message deserialization error using `onmessageerror` (but note that this replaces other event listeners added using `onmessageerror`, if any):

```js
// service-worker.js
self.onmessageerror = (event) => {
  // event is an ExtendableMessageEvent object
  console.error("Message deserialization failed");
};
```

## See also

- `message`
- `ServiceWorker.postMessage()`
- Using Service Workers
- Service workers basic code example
- Using web workers
