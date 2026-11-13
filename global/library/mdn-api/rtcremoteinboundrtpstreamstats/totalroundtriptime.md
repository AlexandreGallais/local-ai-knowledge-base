---
title: "RTCRemoteInboundRtpStreamStats: totalRoundTripTime property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcremoteinboundrtpstreamstats/totalroundtriptime/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCRemoteInboundRtpStreamStats: totalRoundTripTime property

The **`totalRoundTripTime`** property of the `RTCRemoteInboundRtpStreamStats` dictionary indicates the cumulative number sum of all round trip time (RTT) measurements since the beginning of the session, in seconds.

The individual round trip time is calculated based on the RTCP timestamps in the RTCP Receiver Report (RR), hence requires a DLSR value other than 0.
The average RTT can be computed by dividing `totalRoundTripTime` by `roundTripTimeMeasurements`.

## Value

A number indicating the total round trip time for the session, in seconds.

## See also

- RR: Receiver Report RTCP Packet
