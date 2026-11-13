---
title: "RTCInboundRtpStreamStats: framesPerSecond property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcinboundrtpstreamstats/framespersecond/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCInboundRtpStreamStats: framesPerSecond property

The **`framesPerSecond`** property of the `RTCInboundRtpStreamStats` dictionary indicates the number of frames decoded in the last second.

Note that this may be lower than the media source frame rate, which is provided in `RTCVideoSourceStats.framesPerSecond`.

> **Note:**
> The value is undefined for audio streams.

## Value

A positive integer.
