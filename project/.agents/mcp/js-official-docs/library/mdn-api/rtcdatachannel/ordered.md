---
title: "RTCDataChannel: ordered property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcdatachannel/ordered/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCDataChannel: ordered property

The read-only `RTCDataChannel` property **`ordered`** indicates
whether or not the data channel guarantees in-order delivery of messages;
the default is `true`,
which indicates that the data channel is indeed ordered.
This is set when the `RTCDataChannel` is created,
by setting the `ordered` property
on the object passed as `RTCPeerConnection.createDataChannel()`'s `options` parameter.

## Value

A boolean value which is `true` if in-order delivery is
guaranteed and is otherwise `false`.

## Example

```js
const pc = new RTCPeerConnection();
const dc = pc.createDataChannel("my channel");

if (!dc.ordered) {
  // Handle unordered messaging
}
```

## See also

- WebRTC
- `RTCDataChannel`
- `RTCPeerConnection.createDataChannel()`
