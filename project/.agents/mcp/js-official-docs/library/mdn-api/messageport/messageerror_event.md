---
title: "MessagePort: messageerror event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/messageport/messageerror_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MessagePort: messageerror event

The **`messageerror`** event is fired on a `MessagePort` object when it receives a message that can't be deserialized.

This event is not cancellable and does not bubble.

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

### Attempting to share memory

A common cause of `messageerror` events is attempting to send a `SharedArrayBuffer` object, or a buffer view backed by one, across agent clusters. For example, a window is not in the same agent cluster as a shared worker it created, so suppose the page runs the following code:

```js
const worker = new SharedWorker("worker.js");
worker.port.start();
worker.port.addEventListener("message", (event) => {
  worker.port.postMessage(new SharedArrayBuffer(1024));
});
```

And `worker.js` contains the following code:

```js
self.addEventListener("connect", (event) => {
  console.log("Hello");
  const port = event.ports[0];
  port.start();
  port.postMessage("Port connected");
  port.addEventListener("messageerror", (event) => {
    console.log("Message error");
  });
});
```

Then the shared worker will receive a `messageerror` event when it tries to deserialize the message sent from the window.

> **Note:**
> You can use browser devtools to debug your SharedWorker, by entering a URL in your browser address bar to access the devtools workers inspector; for example, in Chrome, the URL `chrome://inspect/#workers`, and in Firefox, the URL `about:debugging#workers`.

## See also

- Related events: `message`.
- Using channel messaging
