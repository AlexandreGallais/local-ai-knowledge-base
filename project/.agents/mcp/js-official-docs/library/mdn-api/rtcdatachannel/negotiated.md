---
title: "RTCDataChannel: negotiated property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcdatachannel/negotiated/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCDataChannel: negotiated property

The read-only `RTCDataChannel` property
**`negotiated`** indicates whether the
`RTCDataChannel`'s connection was negotiated by the Web app
(`true`) or by the WebRTC layer (`false`). **The
default is `false`.**

See Creating a data channel for further information about this property.

## Value

`true` if the `RTCDataChannel`'s connection was negotiated by
the Web app itself; `false` if the negotiation was handled by the WebRTC
layer. The default is `false`.

## Example

The code snippet below checks the value of `negotiated`; if it's
`true`, a function called `shutdownRemoteChannel()` is called
with the channel's `id`; presumably this would be
implemented to transmit a shutdown signal to the remote peer prior to terminating the
connection.

```js
if (dataChannel.negotiated) {
  shutdownRemoteChannel(dataChannel.id);
}
```

## See also

- WebRTC
- Using WebRTC data channels
- `RTCDataChannel`
- `RTCPeerConnection.createDataChannel()`
