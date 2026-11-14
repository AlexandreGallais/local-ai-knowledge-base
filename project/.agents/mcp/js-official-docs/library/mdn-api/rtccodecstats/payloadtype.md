---
title: "RTCCodecStats: payloadType property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtccodecstats/payloadtype/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCCodecStats: payloadType property

The **`payloadType`** property of the `RTCCodecStats` dictionary is a positive integer in the range from 0 to 127 that describes the format of the RTP payload used in RTP encoding or decoding.

## Value

A positive integer between 0 and 127.

The mappings of values to formats is defined in RFC3550, and more specifically in Section 6: Payload Type Definitions of RFC3551.

## See also

- `payloadType` returned by `RTCEncodedAudioFrame.getMetadata()`
- `payloadType` returned by `RTCEncodedVideoFrame.getMetadata()`
- `codecs.payloadType` option in parameter passed to `RTCRtpSender.setParameters()`.
- `codecs.payloadType` in object returned by `RTCRtpSender.getParameters()` and `RTCRtpReceiver.getParameters()`.
