---
title: "RTCOutboundRtpStreamStats: keyFramesEncoded property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcoutboundrtpstreamstats/keyframesencoded/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCOutboundRtpStreamStats: keyFramesEncoded property

The **`keyFramesEncoded`** property of the `RTCOutboundRtpStreamStats` dictionary represents the total number of key <example-value> successfully encoded in this RTP media stream.
This includes, for example, key <example-value> in VP8 (6386) or IDR-frames in H.264 (6184).

Note that the number of delta frames is calculated by subtracting this value from the total number of frames (`framesEncoded` - `keyFramesEncoded`).

> **Note:**
> The value does not exist for audio.

## Value

A positive integer.
