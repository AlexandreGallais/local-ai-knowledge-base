---
title: "MessageEvent: ports property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/messageevent/ports/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MessageEvent: ports property

The **`ports`** read-only property of the
`MessageEvent` interface is an array of `MessagePort` objects
containing all `MessagePort` objects sent with the message, in order.

## Value

An array of `MessagePort` objects.

## Examples

```js
onconnect = (e) => {
  const port = e.ports[0];

  port.addEventListener("message", (e) => {
    const workerResult = `Result: ${e.data[0] * e.data[1]}`;
    port.postMessage(workerResult);
  });

  port.start(); // Required when using addEventListener. Otherwise called implicitly by onmessage setter.
};
```

## See also

- `ExtendableMessageEvent` — similar to this interface but used in
  interfaces that needs to give more flexibility to authors.
