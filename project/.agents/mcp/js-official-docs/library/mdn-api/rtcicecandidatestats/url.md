---
title: "RTCIceCandidateStats: url property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcicecandidatestats/url/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCIceCandidateStats: url property

The `RTCIceCandidateStats` dictionary's
**`url`** property specifies the URL of the
ICE server from which the described candidate was obtained. This
property is _only_ available for local candidates.

## Value

A string specifying the URL of the ICE server from which the
candidate described by the `RTCIceCandidateStats` was obtained. This is the
same URL that would be received in the `icecandidate` event's
`url` property.

> **Note:**
> This property does not exist for remote candidates.
