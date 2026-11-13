---
title: "Worker"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/worker/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Worker

The **`Worker`** interface of the Web Workers API represents a background task that can be created via script, which can send messages back to its creator.

Creating a worker is done by calling the `Worker("path/to/worker/script")` constructor.

Workers may themselves spawn new workers, as long as those workers are hosted at the same origin as the parent page.

Note that not all interfaces and functions are available to web workers. See Functions and classes available to Web Workers for details.

## Constructors

- `Worker()`
    Creates a dedicated web worker that executes the script at the specified URL. This also works for Blob URLs.

## Instance properties

_Inherits properties from its parent, `EventTarget`._

## Instance methods

_Inherits methods from its parent, `EventTarget`._

- `Worker.postMessage()`
    Sends a message — consisting of any JavaScript object — to the worker's inner scope.
- `Worker.terminate()`
    Immediately terminates the worker. This does not let worker finish its operations; it is halted at once. `ServiceWorker` instances do not support this method.

## Events

- `error`
    Fires when an error occurs in the worker.
- `message`
    Fires when the worker's parent receives a message from that worker.
- `messageerror`
    Fires when a `Worker` object receives a message that can't be deserialized.

## Example

The following code snippet creates a `Worker` object using the `Worker()` constructor, then uses the worker object:

```js
const myWorker = new Worker("/worker.js");
const first = document.querySelector("input#number1");
const second = document.querySelector("input#number2");

first.onchange = () => {
  myWorker.postMessage([first.value, second.value]);
  console.log("Message posted to worker");
};
```

For a full example, see our Basic <example-value> worker example (run dedicated worker).

## Browser compatibility

Support varies for different types of workers. See each worker type's page for specifics.

### Cross-origin worker error behavior

In early versions of the spec, loading a cross-origin worker script threw a `SecurityError`. Nowadays, an `error` event is thrown instead.

## See also

- Using Web Workers
- Functions and classes available to Web Workers
- Other kind of workers: `SharedWorker` and Service Worker.
- `OffscreenCanvas` interface
