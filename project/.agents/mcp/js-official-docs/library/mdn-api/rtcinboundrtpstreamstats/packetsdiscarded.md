---
title: "RTCInboundRtpStreamStats: packetsDiscarded property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcinboundrtpstreamstats/packetsdiscarded/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCInboundRtpStreamStats: packetsDiscarded property

The **`packetsDiscarded`** property of the `RTCInboundRtpStreamStats` dictionary indicates the cumulative number of RTP packets that have been discarded by the jitter buffer due to late or early-arrival, and are hence not played out.

The value does not include packets that are discarded to due to packet duplication.

## Value

A positive integer value.

This is calculated as defined in 3.2 (and appendix A.a.)

## See also

- `packetsLost`
- `packetsReceived`
