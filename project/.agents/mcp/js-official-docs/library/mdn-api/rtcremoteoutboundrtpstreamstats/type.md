---
title: "RTCRemoteOutboundRtpStreamStats: type property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcremoteoutboundrtpstreamstats/type/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCRemoteOutboundRtpStreamStats: type property

The **`type`** property of the `RTCRemoteOutboundRtpStreamStats` dictionary is a string with the value `"remote-outbound-rtp"`.

Different statistics are obtained by iterating the `RTCStatsReport` object returned by a call to `RTCPeerConnection.getStats()`.
The type indicates the set of statistics available through the object in a particular iteration step.
A value of `"remote-outbound-rtp"` indicates that the statistics available in the current step are those defined in `RTCRemoteOutboundRtpStreamStats`.

## Value

A string with the value `"remote-outbound-rtp"`.
