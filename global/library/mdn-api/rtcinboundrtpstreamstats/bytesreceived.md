---
title: "RTCInboundRtpStreamStats: bytesReceived property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcinboundrtpstreamstats/bytesreceived/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCInboundRtpStreamStats: bytesReceived property

The **`bytesReceived`** property of the `RTCInboundRtpStreamStats` dictionary indicates the total number of bytes received so far from this synchronization source (SSRC), not including header and padding bytes.

The value can be used to calculate an approximation of the average media data rate:

```js
avgDataRate = rtcInboundRtpStreamStats.bytesReceived / elapsedTime;
```

The property value is reset to zero if the sender's SSRC identifier changes for any reason.

## Value

A positive integer.
