---
title: "RTCIceCandidatePairStats: responsesSent property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcicecandidatepairstats/responsessent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCIceCandidatePairStats: responsesSent property

The **`responsesSent`** property of the `RTCIceCandidatePairStats` dictionary indicates the total number of STUN connectivity check responses that have been sent so far on the connection described by this pair of candidates.

## Value

An integer value indicating the number of times a response has been sent to a STUN connectivity check request.

> **Note:**
> Since it isn't possible to tell the difference between connectivity check requests and consent requests, this value includes both.
