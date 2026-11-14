---
title: "RTCOutboundRtpStreamStats: retransmittedPacketsSent property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcoutboundrtpstreamstats/retransmittedpacketssent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCOutboundRtpStreamStats: retransmittedPacketsSent property

The **`retransmittedPacketsSent`** property of the `RTCOutboundRtpStreamStats` dictionary represents the total number of packets retransmitted for the source associated with this stream.

RTX (Retransmission) is one of several mechanisms that WebRTC uses for retransmitting lost payload bytes, and broadly refers to support for the special packets defined in 4588.
RTX has to be negotiated between the sender and receiver during initial handshake.
If RTX has not been negotiated the retransmitted packets will be sent over the same SSRC; otherwise the bytes are sent on a separate SSRC but are still accounted for in this property.

The retransmitted packets are included in the count reported by `packetsSent`.

## Value

A positive integer indicating the number of retransmitted packets for the source.
