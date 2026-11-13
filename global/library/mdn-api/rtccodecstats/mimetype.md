---
title: "RTCCodecStats: mimeType property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtccodecstats/mimetype/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCCodecStats: mimeType property

The **`mimeType`** property of the `RTCCodecStats` dictionary is a string containing the codec's MIME type and subtype.

This is of the form `"type/subtype"`, such as "video/VP8" or "audio/opus", as defined in the IANA registry of valid MIME types.

## Values

A string indicating the code MIME type/subtype.

## See also

- `codecs.mimeType` option in parameter passed to `RTCRtpTransceiver.setCodecPreferences()` and `RTCRtpSender.setParameters()`.
- `codecs.mimeType` in object returned by `RTCRtpSender.getParameters()` and `RTCRtpReceiver.getParameters()`.
