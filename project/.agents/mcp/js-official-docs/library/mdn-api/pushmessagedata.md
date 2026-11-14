---
title: "PushMessageData"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/pushmessagedata/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PushMessageData

The **`PushMessageData`** interface of the Push API provides methods which let you retrieve the push data sent by a server in various formats.

Unlike the similar methods in the Fetch API, which only allow the method to be invoked once, these methods can be called multiple times.

Messages received through the Push API are sent encrypted by push services and then automatically decrypted by browsers before they are made accessible through the methods of the `PushMessageData` interface.

## Instance properties

None.

## Instance methods

- `PushMessageData.arrayBuffer()`
    Extracts the data as an `ArrayBuffer` object.
- `PushMessageData.blob()`
    Extracts the data as a `Blob` object.
- `PushMessageData.bytes()`
    Extracts the data as a `Uint8Array` object.
- `PushMessageData.json()`
    Extracts the data as a JSON object.
- `PushMessageData.text()`
    Extracts the data as a plain text string.

## Examples

```js
self.addEventListener("push", (event) => {
  const obj = event.data.json();

  if (obj.action === "subscribe" || obj.action === "unsubscribe") {
    fireNotification(obj, event);
    port.postMessage(obj);
  } else if (obj.action === "init" || obj.action === "chatMsg") {
    port.postMessage(obj);
  }
});
```
