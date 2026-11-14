---
title: "MessageEvent: source property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/messageevent/source/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MessageEvent: source property

The **`source`** read-only property of the
`MessageEvent` interface is a `MessageEventSource` (which can be
a WindowProxy, `MessagePort`, or
`ServiceWorker` object) representing the message emitter.

## Value

a `MessageEventSource` (which can be a WindowProxy,
`MessagePort`, or `ServiceWorker` object) representing the
message emitter.

## Examples

```js
myWorker.onmessage = (e) => {
  result.textContent = e.data;
  console.log("Message received from worker");
  console.log(e.source);
};
```

## See also

- `ExtendableMessageEvent` — similar to this interface but used in
  interfaces that needs to give more flexibility to authors.
