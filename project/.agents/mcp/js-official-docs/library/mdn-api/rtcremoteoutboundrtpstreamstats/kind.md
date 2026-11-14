---
title: "RTCRemoteOutboundRtpStreamStats: kind property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcremoteoutboundrtpstreamstats/kind/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCRemoteOutboundRtpStreamStats: kind property

The **`kind`** property of the `RTCRemoteOutboundRtpStreamStats` dictionary is a string indicating whether the described RTP stream contains audio or video media.

This string will always be the same as the `kind` of the `MediaStreamTrack` object carried by the stream.
It will also match the statistics object's `RTCCodecStats.codec` property's media type.

## Value

The kinds is always one of:

- `"audio"`
    The stream contains audio media.
- `"video"`
    The stream contains video media.
