---
title: "Worker: message event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/worker/message_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Worker: message event

The `message` event is fired on a `Worker` object when the worker's parent receives a message from its worker (i.e., when the worker sends a message using `DedicatedWorkerGlobalScope.postMessage()`).

This event is not cancellable and does not bubble.

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

This code creates a new worker and listens to messages from it using `addEventListener()`:

```js
const worker = new Worker("static/scripts/worker.js");

worker.addEventListener("message", (event) => {
  console.log(`Received message from worker: ${event.data}`);
});
```

Alternatively, it could listen using the `onmessage` event handler property (but note that this replaces other event listeners added using `onmessage`, if any):

```js
const worker = new Worker("static/scripts/worker.js");

worker.onmessage = (event) => {
  console.log(`Received message from worker: ${event.data}`);
};
```

The worker posts messages using `self.postMessage()`:

```js
// static/scripts/worker.js

self.postMessage("I'm alive!");
```

## See also

- Related events: `messageerror`.
- `DedicatedWorkerGlobalScope.postMessage()`.
