---
title: "RTCDataChannel: maxPacketLifeTime property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcdatachannel/maxpacketlifetime/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCDataChannel: maxPacketLifeTime property

The read-only `RTCDataChannel` property
**`maxPacketLifeTime`** returns the amount of time, in
milliseconds, the browser is allowed to take to attempt to transmit a message, as set
when the data channel was created, or `null`. This limits how long
the browser can continue to attempt to transmit and retransmit the message before giving
up.

## Value

The number of milliseconds over which the browser may continue to attempt to transmit
the message until it either succeeds or gives up. If not set when
`RTCPeerConnection.createDataChannel()` was called to create the data
channel, this value is `null`.

## See also

- WebRTC
- `RTCDataChannel`
- `RTCDataChannel.maxRetransmits`
- `RTCPeerConnection.createDataChannel()`
