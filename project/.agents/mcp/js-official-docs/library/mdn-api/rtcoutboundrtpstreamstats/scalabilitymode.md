---
title: "RTCOutboundRtpStreamStats: scalabilityMode property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcoutboundrtpstreamstats/scalabilitymode/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCOutboundRtpStreamStats: scalabilityMode property

The **`scalabilityMode`** property of the `RTCOutboundRtpStreamStats` dictionary represents the scalability mode for the RTP stream, if one has been configured.
If not configured, the property is undefined.

The mode is used in Scalable Video Coding (SVC) to define how define how a video stream may be encoded to allow for adaptation to different network conditions and receiver capabilities.
Different codecs allow for various kinds of scalability, such as providing different resolution, different frame rates, or different quality levels for a particular video.

The mode may be configured, for example, by specifying the scalability mode as a parameter option in `VideoEncoder.configure()`, `RTCRtpSender.setParameters()`, or `RTCPeerConnection.addTransceiver()`.

> **Note:**
> The property is undefined for audio streams.

## Value

A string indicating the configured scalability mode, such as "L1T1".
If no mode has been configured, the property is undefined.

The set of allowed modes are defined in Scalable Video Coding (SVC) Extension for WebRTC (w3c.github.io/webrtc-svc).
