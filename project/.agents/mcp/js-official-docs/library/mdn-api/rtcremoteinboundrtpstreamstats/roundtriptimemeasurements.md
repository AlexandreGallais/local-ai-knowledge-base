---
title: "RTCRemoteInboundRtpStreamStats: roundTripTimeMeasurements property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcremoteinboundrtpstreamstats/roundtriptimemeasurements/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCRemoteInboundRtpStreamStats: roundTripTimeMeasurements property

The **`roundTripTimeMeasurements`** property of the `RTCRemoteInboundRtpStreamStats` dictionary contains a positive integer value that represents the total number valid round trip time measurements received for this synchronizing source.

The count can be used as a measure of the availability and reliability of round-trip-time measurement data.

## Value

A positive number indicating the number of valid round trip time measurements.

This is the count of _RTCP Receiver Reports (RR)_ received for this synchronizing source that contain a non-zero value for the "delay since last SR (DLSR)" field.

## See also

- RR: Receiver Report RTCP Packet
