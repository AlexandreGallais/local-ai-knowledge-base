---
title: "WebSocket: binaryType property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/websocket/binarytype/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WebSocket: binaryType property

The **`WebSocket.binaryType`** property controls the type of
binary data being received over the WebSocket connection.

## Value

A string:

- `"blob"`
    Use `Blob` objects for binary data. This is the default value.
- `"arraybuffer"`
    Use `ArrayBuffer` objects for binary data.

## Examples

```js
// Create WebSocket connection.
const socket = new WebSocket("ws://localhost:8080");

// Change binary type from "blob" to "arraybuffer"
socket.binaryType = "arraybuffer";

// Listen for messages
socket.addEventListener("message", (event) => {
  if (event.data instanceof ArrayBuffer) {
    // binary frame
    const view = new DataView(event.data);
    console.log(view.getInt32(0));
  } else {
    // text frame
    console.log(event.data);
  }
});
```
