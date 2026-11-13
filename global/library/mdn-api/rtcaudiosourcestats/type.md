---
title: "RTCAudioSourceStats: type property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcaudiosourcestats/type/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCAudioSourceStats: type property

The **`type`** property of the `RTCAudioSourceStats` dictionary is a string with value `media-source`.

The type of `media-source` identifies the type of statistics as either `RTCAudioSourceStats` or `RTCVideoSourceStats` when iterating the `RTCStatsReport` returned by `RTCRtpSender.getStats()` or `RTCPeerConnection.getStats()`.
The type of stats can further be differentiated using the `kind`, which will be `audio` for `RTCAudioSourceStats`.

## Value

A string with the value `media-source`.
