---
title: "DedicatedWorkerGlobalScope: message event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/dedicatedworkerglobalscope/message_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DedicatedWorkerGlobalScope: message event

The `message` event is fired on a `DedicatedWorkerGlobalScope` object when the worker receives a message from its parent (i.e., when the parent sends a message using `Worker.postMessage()`).

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

## Example

The following code snippet shows creation of a `Worker` object using the `Worker()` constructor. Messages are passed to the worker when the value inside the form input `first` changes. An `onmessage` handler is also present, to deal with messages are passed back from the worker.

```js
// main.js

const myWorker = new Worker("worker.js");

first.onchange = () => {
  myWorker.postMessage([first.value, second.value]);
  console.log("Message posted to worker");
};

myWorker.onmessage = (e) => {
  result.textContent = e.data;
  console.log("Message received from worker");
};
```

The worker assigns an `onmessage` handler to its global scope (but note that this replaces other event listeners added using `onmessage`, if any):

```js
// worker.js

self.onmessage = (e) => {
  console.log("Message received from main script");
  const workerResult = `Result: ${e.data[0] * e.data[1]}`;
  console.log("Posting message back to main script");
  postMessage(workerResult);
};
```

Alternatively, the worker script can listen for the message using `addEventListener()`:

```js
// worker.js

self.addEventListener("message", (e) => {
  console.log("Message received from main script");
  const workerResult = `Result: ${e.data[0] * e.data[1]}`;
  console.log("Posting message back to main script");
  postMessage(workerResult);
});
```

Notice how in the main script, `onmessage` has to be defined on `myWorker`, whereas inside the worker script you just need `onmessage` because the worker is effectively the global scope (`DedicatedWorkerGlobalScope`).

For a full example, see our Basic <example-value> worker example (run dedicated worker).

## See also

- `DedicatedWorkerGlobalScope`
- `WorkerGlobalScope`
- Related events: `messageerror`
- `Worker.postMessage()`
- Using channel messaging
