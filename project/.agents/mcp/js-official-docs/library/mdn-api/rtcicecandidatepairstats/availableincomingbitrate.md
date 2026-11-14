---
title: "RTCIceCandidatePairStats: availableIncomingBitrate property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcicecandidatepairstats/availableincomingbitrate/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCIceCandidatePairStats: availableIncomingBitrate property

The **`availableIncomingBitrate`** property of the `RTCIceCandidatePairStats` dictionary indicates the available inbound capacity of the network connection represented by the candidate pair.
The higher the value, the more bandwidth you can assume is available for incoming data.

You can get the outgoing available bitrate from `availableOutgoingBitrate`.

## Value

A number which approximates the amount of available bandwidth for incoming data on the network connection described by the `RTCIceCandidatePair`.
The value is reported in bits per second and is computed over a 1-second interval.

The value returned is calculated by adding up the available bit rate for every RTP stream using the connection described by this candidate pair.
The returned value doesn't take into account overhead introduced by underlying protocols, including IP, UDP, or TCP.

> **Note:**
> The returned value is computed using a method similar—but not identical—to the Transport Independent Application Specific Maximum (TIAS) described in 6.2.
