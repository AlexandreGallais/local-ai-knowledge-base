---
title: "RTCOutboundRtpStreamStats: nackCount property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcoutboundrtpstreamstats/nackcount/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCOutboundRtpStreamStats: nackCount property

The **`nackCount`** property of the
`RTCOutboundRtpStreamStats` dictionary is a numeric value indicating the
number of times the `RTCRtpSender` described by this object received a
**NACK** packet from the remote receiver.

A NACK (Negative
ACKnowledgement, also called "Generic NACK") packet is used by the
`RTCRtpReceiver` to inform the sender that one or more RTP
packets it sent were lost in transport.

## Value

An integer value indicating how many times the sender received a NACK packet from the
receiver, indicating the loss of one or more packets.
