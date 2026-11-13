---
title: "RTCOutboundRtpStreamStats: active property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcoutboundrtpstreamstats/active/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCOutboundRtpStreamStats: active property

The **`active`** property of the `RTCOutboundRtpStreamStats` dictionary is a boolean that indicates whether this RTP stream is configured to be sent, or is disabled.

For example, this would be `false` if the track corresponding to the stream had its `MediaStreamTrack.enabled` property set to `false`.
Note that an active stream may still not be sending if, for example, the stream is limited by network conditions.

## Value

`true` if the stream is enabled for sending, `false` otherwise.
