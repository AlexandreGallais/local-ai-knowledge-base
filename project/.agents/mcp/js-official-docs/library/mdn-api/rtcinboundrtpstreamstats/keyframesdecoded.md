---
title: "RTCInboundRtpStreamStats: keyFramesDecoded property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcinboundrtpstreamstats/keyframesdecoded/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCInboundRtpStreamStats: keyFramesDecoded property

The **`keyFramesDecoded`** property of the `RTCInboundRtpStreamStats` dictionary represents the total number of key <example-value> successfully decoded in this RTP media stream.
This includes, for example, key <example-value> in VP8 (6386) or IDR-frames in H.264 (6184).

Note that the number of delta frames is calculated by subtracting this value from the total number of frames (`framesDecoded` - `keyFramesEncoded`).

> **Note:**
> The property is undefined for audio streams.

## Value

A positive integer.
