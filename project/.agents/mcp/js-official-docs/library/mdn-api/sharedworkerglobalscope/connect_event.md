---
title: "SharedWorkerGlobalScope: connect event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/sharedworkerglobalscope/connect_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SharedWorkerGlobalScope: connect event

The **`connect`** event is fired in shared workers at their `SharedWorkerGlobalScope` when a new client connects.

This event is not cancelable and does not bubble.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("connect", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onconnect = (event) => { }
```

## Event type

A `MessageEvent`. Inherits from `Event`.

## Examples

This example shows a shared worker file — when a connection to the worker occurs from a main thread via a `MessagePort`, the `onconnect` event handler fires. The event object is a `MessageEvent`.

The connecting port can be referenced through the event object's `ports` parameter; this reference can have an `onmessage` handler attached to it to handle messages coming in through the port, and its `postMessage()` method can be used to send messages back to the main thread using the worker.

Using the `onconnect` event handler property (but note that this replaces other event listeners added using `onconnect`, if any):

```js
self.onconnect = (e) => {
  const port = e.ports[0];

  port.onmessage = (e) => {
    const workerResult = `Result: ${e.data[0] * e.data[1]}`;
    port.postMessage(workerResult);
  };

  port.start();
};
```

For a complete running example, see our Basic <example-value> worker example (run shared worker.)

### Using addEventListener()

You could also set up an event handler using the `addEventListener()` method:

```js
self.addEventListener("connect", (e) => {
  const port = e.ports[0];

  port.onmessage = (e) => {
    const workerResult = `Result: ${e.data[0] * e.data[1]}`;
    port.postMessage(workerResult);
  };
});
```

## See also

- Using web workers
- `SharedWorkerGlobalScope`
