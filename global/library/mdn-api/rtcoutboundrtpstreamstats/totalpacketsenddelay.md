---
title: "RTCOutboundRtpStreamStats: totalPacketSendDelay property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcoutboundrtpstreamstats/totalpacketsenddelay/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCOutboundRtpStreamStats: totalPacketSendDelay property

The **`totalPacketSendDelay`** property of the `RTCOutboundRtpStreamStats` dictionary represents the total time in seconds that packets have spent buffered locally before being transmitted.

The individual packet delay is the time between a packet being emitted from the RTP packetizer and it being handed over to the OS network socket.
The individual delay is added to `totalPacketSendDelay` when `packetsSent` is incremented.

> **Note:**
> The property is undefined for audio streams.

## Value

The delay in seconds, represented as a number.
