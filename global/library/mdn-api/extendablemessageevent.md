---
title: "ExtendableMessageEvent"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/extendablemessageevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ExtendableMessageEvent

The **`ExtendableMessageEvent`** interface of the Service Worker API represents the event object of a `message` event fired on a service worker (when a message is received on the `ServiceWorkerGlobalScope` from another context) — extends the lifetime of such events.

This interface inherits from the `ExtendableEvent` interface.

## Constructor

- `ExtendableMessageEvent()`
    Creates a new `ExtendableMessageEvent` object instance.

## Instance properties

_Inherits properties from its parent, `ExtendableEvent`_.

- `ExtendableMessageEvent.data` (read-only)
    Returns the event's data. It can be any data type. If dispatched in `messageerror` event, the property will be `null`.
- `ExtendableMessageEvent.origin` (read-only)
    Returns the origin of the `Client` that sent the message.
- `ExtendableMessageEvent.lastEventId` (read-only)
    Represents, in server-sent events, the last event ID of the event source.
- `ExtendableMessageEvent.source` (read-only)
    Returns a reference to the `Client` object that sent the message.
- `ExtendableMessageEvent.ports` (read-only)
    Returns the array containing the `MessagePort` objects representing the ports of the associated message channel.

## Instance methods

_Inherits methods from its parent, `ExtendableEvent`_.

## Examples

In the below example a page gets a handle to the `ServiceWorker` object via `ServiceWorkerRegistration.active`, and then calls its `postMessage()` function.

```js
// in the page being controlled
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
// in the service worker
addEventListener("message", (event) => {
  // event is an ExtendableMessageEvent object
  console.log(`The client sent me a message: ${event.data}`);

  event.source.postMessage("Hi client");
});
```

## See also

- Using Service Workers
- Service workers basic code example
- Channel Messaging
