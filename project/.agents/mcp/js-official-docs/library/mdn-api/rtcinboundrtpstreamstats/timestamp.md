---
title: "RTCInboundRtpStreamStats: timestamp property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcinboundrtpstreamstats/timestamp/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCInboundRtpStreamStats: timestamp property

The **`timestamp`** property of the `RTCInboundRtpStreamStats` dictionary is a `DOMHighResTimeStamp` object specifying the time at which the data in the object was sampled.

## Value

A `DOMHighResTimeStamp` value indicating the time at which the activity described by the statistics in this object was recorded, in milliseconds elapsed since the beginning of January 1, 1970, UTC.

The value should be accurate to within a few milliseconds but may not be entirely precise, either because of hardware or operating system limitations or because of fingerprinting protection in the form of reduced clock precision or accuracy.
