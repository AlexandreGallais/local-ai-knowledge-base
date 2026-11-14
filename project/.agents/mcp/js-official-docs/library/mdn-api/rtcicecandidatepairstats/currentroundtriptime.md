---
title: "RTCIceCandidatePairStats: currentRoundTripTime property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcicecandidatepairstats/currentroundtriptime/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCIceCandidatePairStats: currentRoundTripTime property

The **`currentRoundTripTime`** property of the `RTCIceCandidatePairStats` dictionary indicates the number of seconds it takes for data to be sent by this peer to the remote peer and back over the connection described by this pair of ICE candidates.

## Value

A number indicating the round-trip time, in seconds, for the connection described by the pair of candidates for which this `RTCIceCandidatePairStats` object offers statistics.

This value is computed by observing the time that elapsed between the most recent STUN request being sent to the remote peer and the response to that request arriving.
This information may come from ongoing STUN connectivity checks as well as from consent requests made when the connection was initially being opened.
