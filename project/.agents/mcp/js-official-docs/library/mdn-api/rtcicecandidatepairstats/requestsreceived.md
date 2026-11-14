---
title: "RTCIceCandidatePairStats: requestsReceived property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcicecandidatepairstats/requestsreceived/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCIceCandidatePairStats: requestsReceived property

The **`requestsReceived`** property of the `RTCIceCandidatePairStats` dictionary indicates the total number of STUN connectivity check requests that have been received so far on the connection described by this pairing of candidates.

## Value

An integer value which specifies the number of STUN connectivity and/or consent requests that have been received to date on the connection described by this pair of ICE candidates.

Because there's no way to tell the difference between requests made to check connectivity and requests made to check consent, the returned figure includes both.

> **Note:**
> The reported number of requests includes retransmissions.
> If a request had to be repeated due to network issues, it will be counted multiple times here.
> This differs from `requestsSent`, which _does not_ include retransmissions.
