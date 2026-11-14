---
title: "RTCRemoteOutboundRtpStreamStats: roundTripTimeMeasurements property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcremoteoutboundrtpstreamstats/roundtriptimemeasurements/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCRemoteOutboundRtpStreamStats: roundTripTimeMeasurements property

The **`roundTripTimeMeasurements`** property of the `RTCRemoteOutboundRtpStreamStats` dictionary is a positive integer value that represents the total number valid round of trip time measurements received for this synchronizing source (SSRC).

The count can be used as a measure of the availability and reliability of round trip time measurement data.

## Value

A positive number indicating the number of valid round trip time measurements.

This is the number of _RTCP Sender Reports (SR)_ received for this SSRC that contain a "delay since last RR (DLRR)" field from which a valid round trip time can be derived (according to DLRR Report Block).
