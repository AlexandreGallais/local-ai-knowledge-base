---
title: "RTCInboundRtpStreamStats: kind property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcinboundrtpstreamstats/kind/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCInboundRtpStreamStats: kind property

The **`kind`** property of the `RTCInboundRtpStreamStats` dictionary is a string indicating whether the described RTP stream contains audio or video media.

This string will always be the same as the `kind` of the `MediaStreamTrack` object carried by the stream.
It will also match the media type of the codec associated with this statistics objects (i.e., the MIME type of the associated codec's `RTCCodecStats.mimeType` property).

## Value

The kind is always one of:

- `"audio"`
    The stream contains audio media.
- `"video"`
    The stream contains video media.
