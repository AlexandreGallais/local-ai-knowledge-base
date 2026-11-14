---
title: "RTCInboundRtpStreamStats: codecId property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcinboundrtpstreamstats/codecid/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCInboundRtpStreamStats: codecId property

The **`codecId`** property of the `RTCInboundRtpStreamStats` dictionary is a string that uniquely identifies the object that was inspected to produce the data in the `RTCCodecStats` for the RTP stream.

`RTCInboundRtpStreamStats` and `RTCCodecStats` objects are correlated by iterating the `RTCStatsReport` to find the statistics objects where `RTCInboundRtpStreamStats.codecId` is equal to `RTCCodecStats.id`.

## Value

A string that contains the `id` of the object that was inspected to produce the `RTCCodecStats` object associated with this RTP stream.
