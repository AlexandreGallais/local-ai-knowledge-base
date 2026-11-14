---
title: "RTCRemoteInboundRtpStreamStats: timestamp property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcremoteinboundrtpstreamstats/timestamp/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCRemoteInboundRtpStreamStats: timestamp property

The **`timestamp`** property of the `RTCRemoteInboundRtpStreamStats` dictionary is a `DOMHighResTimeStamp` object specifying the time at which the data in the object was sampled.

For this object the timestamp is the time at which the _RTCP Receiver Report (RR)_ was received at the local end of the communication (the RR report is defined in 3550).

## Value

A `DOMHighResTimeStamp` value indicating the time at which the activity described by the statistics in this object was recorded, in milliseconds elapsed since the beginning of January 1, 1970, UTC.

The value should be accurate to within a few milliseconds but may not be entirely precise, either because of hardware or operating system limitations or because of fingerprinting protection in the form of reduced clock precision or accuracy.
