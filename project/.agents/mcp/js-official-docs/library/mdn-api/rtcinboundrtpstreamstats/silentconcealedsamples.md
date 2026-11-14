---
title: "RTCInboundRtpStreamStats: silentConcealedSamples property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcinboundrtpstreamstats/silentconcealedsamples/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCInboundRtpStreamStats: silentConcealedSamples property

The **`silentConcealedSamples`** property of the `RTCInboundRtpStreamStats` dictionary indicates the total number of silent concealed samples for the received audio track over the lifetime of this stats object.

A concealed sample is a sample that was lost or arrived too late to be played out, and therefore had to be replaced with a locally generated synthesized sample.
A silent concealed sample is one where the inserted sample is either silent or comfort noise.

> **Note:**
> The value is undefined for video streams.

## Value

A positive integer.

## See also

- `RTCInboundRtpStreamStats.concealedSamples`
- `RTCInboundRtpStreamStats.concealmentEvents`
- Packet loss concealment on Wikipedia
