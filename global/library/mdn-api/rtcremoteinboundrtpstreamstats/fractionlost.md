---
title: "RTCRemoteInboundRtpStreamStats: fractionLost property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcremoteinboundrtpstreamstats/fractionlost/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCRemoteInboundRtpStreamStats: fractionLost property

The **`fractionLost`** property of the `RTCRemoteInboundRtpStreamStats` dictionary provides a value that can be used to determine the fraction of packets lost for this synchronization source (SSRC) in the last reporting interval.

To convert the value to a percentage, divide it by 256 and multiply by 100.
For example, a value of 20 indicates a 7.8% packet loss.

Note that the value may not be precisely accurate due to the way that it is calculated, but it does provide a quick and convenient measure of the link quality.

## Value

A number giving the fraction packet loss in the last reporting interval, multiplied by 256.
The value is 0 if the calculated packet loss is negative.

> **Note:**
> The value comes from the 8-bit `fraction lost` field of the last Sender Report (SR) or Receiver Report (RR) RTCP packet.
> The algorithm for calculating the value is defined in RFC 3550, Appendix A.3: Determining Number of Packets Expected and Lost.

## See also

- SR: Sender Report RTCP Packet
- RR: Receiver Report RTCP Packet
