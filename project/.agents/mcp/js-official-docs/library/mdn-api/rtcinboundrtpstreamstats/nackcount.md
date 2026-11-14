---
title: "RTCInboundRtpStreamStats: nackCount property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcinboundrtpstreamstats/nackcount/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCInboundRtpStreamStats: nackCount property

The **`nackCount`** property of the `RTCInboundRtpStreamStats` dictionary indicates the number of times the receiver sent a **NACK** packet to the sender.

A NACK (Negative ACKnowledgement, also called "Generic NACK") packet tells the sender that one or more of the RTP packets it sent were lost in transport.

## Value

A positive integer.
