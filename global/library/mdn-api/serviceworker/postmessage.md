---
title: "ServiceWorker: postMessage() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/serviceworker/postmessage/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ServiceWorker: postMessage() method

The **`postMessage()`** method of the `ServiceWorker` interface sends a message to the worker. The first parameter is the data to send to the worker. The data may be any JavaScript object which can be handled by the structured clone algorithm.

The service worker can send back information to its clients by using the `postMessage()` method. The message will not be sent back to this `ServiceWorker` object but to the associated `ServiceWorkerContainer` available via `navigator.serviceWorker`.

## Syntax

```js
postMessage(message)
postMessage(message, transfer)
postMessage(message, options)
```

### Parameters

- `message`
    The object to deliver to the worker; this will be in the `data` field in the event delivered to the `message` event. This may be any JavaScript object handled by the structured clone algorithm.

    The `message` parameter is mandatory. If the data to be passed to the worker is unimportant, `null` or `undefined` must be passed explicitly.

    > **Note:**
    > A service worker is not in the same agent cluster as its client, and therefore cannot share memory. `SharedArrayBuffer` objects, or buffer views backed by one, cannot be posted across agent clusters. Trying to do so will generate a `messageerror` event containing a `DataCloneError` `DOMException` on the receiving end.

- `transfer` (optional)
    An optional array of transferable objects to transfer ownership of. The ownership of these objects is given to the destination side and they are no longer usable on the sending side. These transferable objects are not automatically sent; they must either be contained in the message or be accessible to the recipient via other means, such as `MessagePort` via `MessageEvent.ports`.
- `options` (optional)
    An optional object containing the following properties:
    - `transfer` (optional)
        Has the same meaning as the `transfer` parameter.

### Return value

None (`undefined`).

### Exceptions

- `SyntaxError`
    Thrown if the `message` parameter is not provided.

## Examples

In this example a `ServiceWorker` is created and a message is immediately sent:

```js
navigator.serviceWorker.register("service-worker.js");

navigator.serviceWorker.ready.then((registration) => {
  registration.active.postMessage(
    "Test message sent immediately after creation",
  );
});
```

In order to receive the message, the service worker, in `service-worker.js` has to listen to the `message` event on its global scope.

```js
// This must be in `service-worker.js`
addEventListener("message", (event) => {
  console.log(`Message received: ${event.data}`);
});
```

Note that the service worker can send back messages to the main thread using the `postMessage()` method. To receive it, the main thread needs to listen for a `message` event on the `ServiceWorkerContainer` object.

## See also

- The `ServiceWorker` interface it belongs to.
- Its counterpart, the `postMessage()` method that a service worker must use to send a message back to the associated `ServiceWorkerContainer`.
