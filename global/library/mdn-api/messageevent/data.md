---
title: "MessageEvent: data property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/messageevent/data/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MessageEvent: data property

The **`data`** read-only property of the
`MessageEvent` interface represents the data sent by the message emitter.

## Value

The data sent by the message emitter; this can be any data type, depending on what originated this event.

## Examples

```js
myWorker.onmessage = (e) => {
  result.textContent = e.data;
  console.log("Message received from worker");
};
```

## See also

- `ExtendableMessageEvent` — similar to this interface but used in
  interfaces that needs to give more flexibility to authors.
