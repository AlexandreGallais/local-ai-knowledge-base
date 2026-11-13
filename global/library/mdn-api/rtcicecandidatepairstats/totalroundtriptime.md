---
title: "RTCIceCandidatePairStats: totalRoundTripTime property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcicecandidatepairstats/totalroundtriptime/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCIceCandidatePairStats: totalRoundTripTime property

The **`totalRoundTripTime`** property of the `RTCIceCandidatePairStats` dictionary indicates the total time that has elapsed between sending STUN requests and receiving the responses, for all such requests that have been made so far on the pair of candidates described by this `RTCIceCandidatePairStats` object.

This value includes both connectivity check and consent check requests.

## Value

This real number indicates the total number of seconds which have elapsed between sending out STUN connectivity and consent check requests and receiving their responses, for all such requests made so far on the connection described by this candidate pair.

You can calculate the average round-trip time (RTT) by dividing this value by the value of the `responsesReceived` property:

```js
rtt =
  rtcIceCandidatePairStats.totalRoundTripTime /
  rtcIceCandidatePairStats.responsesReceived;
```
