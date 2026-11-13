---
title: "RTCInboundRtpStreamStats: transportId property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcinboundrtpstreamstats/transportid/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCInboundRtpStreamStats: transportId property

The **`transportId`** property of the `RTCInboundRtpStreamStats` dictionary is a string that uniquely identifies the associated `RTCTransportStats` statistics object for this RTP stream's underlying transport.

`RTCInboundRtpStreamStats` and `RTCTransportStats` objects are correlated by iterating the `RTCStatsReport` to find the statistics objects where `RTCInboundRtpStreamStats.transportId` is equal to `RTCTransportStats.id`.

## Value

A string that contains the `id` of the object that was inspected to produce the `RTCTransportStats` object associated with this RTP stream.
