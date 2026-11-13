---
title: "RTCIceCandidateStats: type property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcicecandidatestats/type/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCIceCandidateStats: type property

The **`type`** property of the `RTCIceCandidateStats` dictionary is a string with the value `"local-candidate"`.

Different statistics are obtained by iterating the `RTCStatsReport` object returned by a call to `RTCPeerConnection.getStats()`.
The type indicates the set of statistics available through the object in a particular iteration step.
A value of `"local-candidate"` indicates that the statistics available in the current step are those defined in `RTCIceCandidateStats`.

## Value

A string with the value `"local-candidate"`.
