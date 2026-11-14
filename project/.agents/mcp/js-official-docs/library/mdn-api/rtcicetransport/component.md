---
title: "RTCIceTransport: component property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcicetransport/component/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCIceTransport: component property

The **`component`** read-only property of the `RTCIceTransport` interface specifies whether the object is serving to transport RTP or RTCP.

## Value

A string which is one of the following:

- `rtp`
    Identifies an ICE transport which is being used for the Real-time Transport Protocol (RTP), or for RTP multiplexed with the RTP Control Protocol (RTCP). RTP is defined in . This value corresponds to the component ID field in the `candidate` a-line with the value 1.
- `rtcp`
    Identifies an ICE transport being used for RTCP, which is defined in . This value corresponds to the component ID 2.
