---
title: "RTCOutboundRtpStreamStats: framesSent property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcoutboundrtpstreamstats/framessent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCOutboundRtpStreamStats: framesSent property

The **`framesSent`** property of the `RTCOutboundRtpStreamStats` dictionary indicates the total number of encoded frames sent on this RTP stream over its lifetime.

Note that this may be lower than the total number of media source frames, which is provided in `RTCVideoSourceStats.frames`.

> **Note:**
> The value does not exist for audio.

## Value

A positive number.
