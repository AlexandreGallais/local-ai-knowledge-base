---
title: "RTCIceCandidateStats: localCandidateId property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcicecandidatepairstats/localcandidateid/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCIceCandidateStats: localCandidateId property

The **`localCandidateId`** property of the `RTCIceCandidatePairStats` dictionary is a string that uniquely identifies the local ICE candidate which was analyzed to generate the `RTCIceCandidateStats` used to compute the statistics for this pair of candidates.

## Value

A string giving a unique identifier for the local `RTCIceCandidate` for the connection described by this `RTCIceCandidatePairStats` object.

This candidate is the source of one of the two `RTCIceCandidateStats` objects that were used to compute the contents of this `RTCIceCandidatePairStats` object.
