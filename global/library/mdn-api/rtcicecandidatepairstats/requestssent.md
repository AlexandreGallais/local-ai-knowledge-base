---
title: "RTCIceCandidatePairStats: requestsSent property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcicecandidatepairstats/requestssent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCIceCandidatePairStats: requestsSent property

The **`requestsSent`** property of the `RTCIceCandidatePairStats` dictionary indicates the total number of STUN connectivity check requests that have been sent so far on the connection described by this pair of candidates.

## Value

An integer value which specifies the number of STUN connectivity requests that have been sent to date on the connection described by this pair of ICE candidates.

> **Note:**
> The reported number of requests _does not_ include retransmissions.
> If a request had to be repeated due to network issues, it will not be counted multiple times here.
> This differs from `requestsReceived`, which _does_ include retransmissions.
