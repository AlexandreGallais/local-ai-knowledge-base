---
title: "RTCOutboundRtpStreamStats: retransmittedBytesSent property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcoutboundrtpstreamstats/retransmittedbytessent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCOutboundRtpStreamStats: retransmittedBytesSent property

The **`retransmittedBytesSent`** property of the `RTCOutboundRtpStreamStats` dictionary represents the total number of payload bytes retransmitted for the source associated with this stream.

RTX (Retransmission) is one of several mechanisms that WebRTC uses for retransmitting lost payload bytes, and broadly refers to support for the special packets defined in 4588.
RTX has to be negotiated between the sender and receiver during initial handshake.
If RTX has not been negotiated the retransmitted bytes will be sent over the same SSRC; otherwise the bytes are sent on a separate SSRC but are still accounted for in this property.

The retransmitted bytes sent are included in the count reported by `bytesSent`.

## Value

A positive integer indicating the number of retransmitted payload bytes for the source.
