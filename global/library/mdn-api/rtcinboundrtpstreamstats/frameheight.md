---
title: "RTCInboundRtpStreamStats: frameHeight property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcinboundrtpstreamstats/frameheight/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCInboundRtpStreamStats: frameHeight property

The **`frameHeight`** property of the `RTCInboundRtpStreamStats` dictionary indicates the height of the last decoded frame, in pixels.

Note that the resolution of the encoded frame may be lower than that of the media source, which is provided in `RTCVideoSourceStats.height`.

> **Note:**
> The property is undefined for audio streams, and before the first frame is decoded.

## Value

A positive integer, in pixels.
