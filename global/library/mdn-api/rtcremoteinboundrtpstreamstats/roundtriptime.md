---
title: "RTCRemoteInboundRtpStreamStats: roundTripTime property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcremoteinboundrtpstreamstats/roundtriptime/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCRemoteInboundRtpStreamStats: roundTripTime property

The **`roundTripTime`** property of the `RTCRemoteInboundRtpStreamStats` dictionary indicates the estimated round trip time (RTT) for this synchronization source (SSRC), in seconds.

The round trip time is calculated based on the RTCP timestamps in the RTCP Sender Report (SR), and requires a report with a Delay Since Last SR (DLSR) block that has a value other than 0.
The property does not exist until such a report has been received.

Note that the _average_ RTT for the session can be computed by dividing `totalRoundTripTime` by `roundTripTimeMeasurements`.

## Value

A number indicating the current estimated round trip time, in seconds.

## See also

- SR: Sender Report RTCP Packet
