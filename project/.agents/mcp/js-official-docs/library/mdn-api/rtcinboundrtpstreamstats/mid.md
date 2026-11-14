---
title: "RTCInboundRtpStreamStats: mid property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcinboundrtpstreamstats/mid/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCInboundRtpStreamStats: mid property

The **`mid`** property of the `RTCInboundRtpStreamStats` dictionary is a string that contains the media id negotiated between the local and remote peers.
This uniquely identifies the pairing of source and destination for the transceiver's stream.

## Value

The value of the corresponding `RTCRtpTransceiver.mid`, unless that value is null, in which case this statistic property is not present.
