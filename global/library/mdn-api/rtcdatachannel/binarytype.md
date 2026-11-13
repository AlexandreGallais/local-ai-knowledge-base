---
title: "RTCDataChannel: binaryType property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcdatachannel/binarytype/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCDataChannel: binaryType property

The property **`binaryType`** on the
`RTCDataChannel` interface is a string which specifies
the type of object which should be used to represent binary data received
on the `RTCDataChannel`. Values allowed by the
`WebSocket.binaryType` property are also permitted here:
`blob` if `Blob` objects are being used or
`arraybuffer` if `ArrayBuffer` objects are being used. The
default is `arraybuffer`.

When a binary message is received on the data channel, the resulting
`message` event's `MessageEvent.data` property is an object of
the type specified by the `binaryType`.

## Value

A string that can have one of these values:

- `"blob"`
    Received binary messages' contents will be contained in `Blob` objects.
- `"arraybuffer"`
    Received binary messages' contents will be contained in `ArrayBuffer`
    objects.

## Example

This code configures a data channel to receive binary data in
`ArrayBuffer` objects, and establishes a listener for `message`
events which constructs a string representing the received data as a list of hexadecimal
byte values.

```js
const dc = peerConnection.createDataChannel("Binary");
dc.binaryType = "arraybuffer";

dc.onmessage = (event) => {
  const byteArray = new Uint8Array(event.data);
  let hexString = "";

  byteArray.forEach((byte) => {
    hexString += `${byte.toString(16)} `;
  });
};
```

## See also

- WebRTC
- Using WebRTC data channels
- `RTCDataChannel`
- `RTCDataChannel.send()`
