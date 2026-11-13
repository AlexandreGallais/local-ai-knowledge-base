---
title: "RTCInboundRtpStreamStats: concealedSamples property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcinboundrtpstreamstats/concealedsamples/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCInboundRtpStreamStats: concealedSamples property

The **`concealedSamples`** property of the `RTCInboundRtpStreamStats` dictionary indicates the total number of concealed samples for the received audio track over the lifetime of this stats object.

A concealed sample is a sample that was lost or arrived too late to be played out, and therefore had to be replaced with a locally generated synthesized sample.
Note that lost samples are reported in `packetsLost`, while late packets are reported in `fecPacketsDiscarded`.

> **Note:**
> The value is undefined for video streams.

## Value

A positive integer.

## See also

- `RTCInboundRtpStreamStats.silentConcealedSamples`
- `RTCInboundRtpStreamStats.concealmentEvents`
- Packet loss concealment on Wikipedia
