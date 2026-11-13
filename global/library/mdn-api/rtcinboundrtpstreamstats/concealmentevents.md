---
title: "RTCInboundRtpStreamStats: concealmentEvents property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcinboundrtpstreamstats/concealmentevents/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCInboundRtpStreamStats: concealmentEvents property

The **`concealmentEvents`** property of the `RTCInboundRtpStreamStats` dictionary indicates the total number of concealment events for the received audio track over the lifetime of this stats object.

A concealed sample is a sample that was lost or arrived too late to be played out, and therefore had to be replaced with a locally generated synthesized sample.
Any number of consecutive concealed samples following a non-concealed sample comprise a single concealment event.
The value in this property will therefore be less than or equal to `concealedSamples`, which counts every sample.

> **Note:**
> The value is undefined for video streams.

## Value

A positive integer.

## See also

- `RTCInboundRtpStreamStats.concealedSamples`
- `RTCInboundRtpStreamStats.silentConcealedSamples`
- Packet loss concealment on Wikipedia
