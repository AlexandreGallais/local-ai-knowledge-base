---
title: "RTCRemoteOutboundRtpStreamStats: totalRoundTripTime property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcremoteoutboundrtpstreamstats/totalroundtriptime/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCRemoteOutboundRtpStreamStats: totalRoundTripTime property

The **`totalRoundTripTime`** property of the `RTCRemoteOutboundRtpStreamStats` dictionary indicates the sum of all round trip time (RTT) measurements since the beginning of the session, in seconds.

The individual round trip time is calculated based on RTCP timestamps in the DLRR report block of RTCP Sender Reports (SR).
The average RTT can be computed by dividing `totalRoundTripTime` by `roundTripTimeMeasurements`.

## Value

A number indicating the total round trip time for the session, in seconds.

## See also

- DLRR Report Block
