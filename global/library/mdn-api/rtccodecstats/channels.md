---
title: "RTCCodecStats: channels property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtccodecstats/channels/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCCodecStats: channels property

The **`channels`** property of the `RTCCodecStats` dictionary is a positive number containing the number of channels supported by the codec.

For audio codecs, a value of 1 specifies monaural sound while 2 indicates stereo.

## Values

A positive number indicating the number of channels.

## See also

- `codecs.channels` option in parameter passed to `RTCRtpTransceiver.setCodecPreferences()` and `RTCRtpSender.setParameters()`.
- `codecs.channels` in object returned by `RTCRtpSender.getParameters()` and `RTCRtpReceiver.getParameters()`.
