---
title: "RTCDataChannel: maxRetransmits property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcdatachannel/maxretransmits/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCDataChannel: maxRetransmits property

The read-only `RTCDataChannel` property
**`maxRetransmits`** returns the maximum number of times the
browser should try to retransmit a message before giving up, as set when the data
channel was created, or `null`, which indicates that there is no
maximum. This can only be set when the `RTCDataChannel` is created
by calling `RTCPeerConnection.createDataChannel()`, using the
`maxRetransmits` field in the specified `options`.

## Value

The maximum number of times the browser will try to retransmit a message before giving
up, or `null` if not set when
`RTCPeerConnection.createDataChannel()` was called. The default is
`null`.

## See also

- WebRTC
- `RTCDataChannel`
- `RTCDataChannel.maxPacketLifetime`
- `RTCPeerConnection.createDataChannel()`
