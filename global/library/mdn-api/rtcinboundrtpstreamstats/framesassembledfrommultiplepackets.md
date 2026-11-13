---
title: "RTCInboundRtpStreamStats: framesAssembledFromMultiplePackets property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcinboundrtpstreamstats/framesassembledfrommultiplepackets/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCInboundRtpStreamStats: framesAssembledFromMultiplePackets property

The **`framesAssembledFromMultiplePackets`** property of the `RTCInboundRtpStreamStats` dictionary indicates the total number of correctly decoded frames for this RTP stream that were assembled from more than one RTP packet.

This property can be used with `totalAssemblyTime` to determine the average assembly time: `totalAssemblyTime / framesAssembledFromMultiplePacket`.
A higher average assembly time might indicate network issues or inefficiencies in the receiving pipeline.

> **Note:**
> The value is undefined for audio streams.

## Value

A positive integer.
