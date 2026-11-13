---
title: "RTCInboundRtpStreamStats: frameWidth property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcinboundrtpstreamstats/framewidth/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCInboundRtpStreamStats: frameWidth property

The **`frameWidth`** property of the `RTCInboundRtpStreamStats` dictionary indicates the width of the last decoded frame, in pixels.

Note that the resolution of the encoded frame may be lower than that of the media source, which is provided in `RTCVideoSourceStats.width`.

> **Note:**
> The value is undefined for audio streams, or before the first frame is encoded.

## Value

A positive integer, in pixels.
