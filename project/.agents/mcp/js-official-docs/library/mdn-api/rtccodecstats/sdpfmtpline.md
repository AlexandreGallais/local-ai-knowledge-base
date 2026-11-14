---
title: "RTCCodecStats: sdpFmtpLine property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtccodecstats/sdpfmtpline/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCCodecStats: sdpFmtpLine property

The **`sdpFmtpLine`** property of the `RTCCodecStats` dictionary is a string containing the format-specific parameters of the codec.

These are the values in the `"a=fmtp"` line in the codec's SDP (if present) after the payload type number (see section 5.8 of the IETF specification for JSEP).

## Values

A string containing the format-specific parameters of the codec.

## Description

The `"a=fmtp"` line in the codec's SDP line has the following format, where the payload type (see `RTCCodecStats.payloadType`) and parameters depend on the codec:

```plain
a=fmtp:<payload_type_number> param1=value1; ...; paramN=valueN
```

For example, the following line would indicate that the "opus" codec, which has a `payloadType` 99, has the format-specific parameters `maxplaybackrate` and `stereo`:

```plain
a=fmtp:99 maxplaybackrate=16000; stereo=1;
```

For this codec, the value in `sdpFmtpLine` would be `maxplaybackrate=16000; stereo=1;`.

## See also

- `codecs.sdpFmtpLine` option in parameter passed to `RTCRtpTransceiver.setCodecPreferences()` and `RTCRtpSender.setParameters()`.
- `codecs.sdpFmtpLine` in object returned by `RTCRtpSender.getParameters()` and `RTCRtpReceiver.getParameters()`.
