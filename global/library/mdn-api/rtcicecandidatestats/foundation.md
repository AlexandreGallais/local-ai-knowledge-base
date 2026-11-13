---
title: "RTCIceCandidateStats: foundation property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcicecandidatestats/foundation/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCIceCandidateStats: foundation property

The **`foundation`** property of the `RTCIceCandidateStats` interface is a string that allows correlation of candidates from a common network path on multiple `RTCIceTransport` objects.

It is the same for two candidates that are of the same type, are using the same transport protocol, originate from the same IP address, use ports that fall within the same range, and come from the same STUN server.

For more information see `RTCIceCandidate.foundation`.

## Value

A string representing the `foundation` of the corresponding `RTCIceCandidate`.
