---
title: "RTCDataChannelStats: type property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcdatachannelstats/type/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCDataChannelStats: type property

The **`type`** property of the `RTCDataChannelStats` dictionary is a string with the value `"data-channel"`.

Different statistics are obtained by iterating the `RTCStatsReport` object returned by a call to `RTCPeerConnection.getStats()`.
The type indicates the set of statistics available through the object in a particular iteration step.
A value of `"data-channel"` indicates that the statistics available in the current step are those defined in `RTCDataChannelStats`.

## Value

A string with the value `"data-channel"`.
