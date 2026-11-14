---
title: "RTCRemoteInboundRtpStreamStats: ssrc property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcremoteinboundrtpstreamstats/ssrc/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCRemoteInboundRtpStreamStats: ssrc property

The **`ssrc`** property of the `RTCRemoteInboundRtpStreamStats` dictionary contains a positive integer value that identifies the synchronization source (SSRC) of this stream of RTP packets.

A source might be something like a microphone, or a mixer application that combines multiple sources.
All packets from the same source share the same time source and sequence space, and so can be ordered relative to each other.
Note that two streams with the same `ssrc` value refer to the same source.

## Value

A positive 32-bit integer uniquely identifying the SSRC of the RTP packets whose statistics are covered by this `RTCRemoteInboundRtpStreamStats` object.

The manner in which SSRC values are generated is not mandated by the specification, although it does make recommendations.
You should not make any assumptions based on the value of `ssrc` other than that any two objects with the same `ssrc` value refer to the same source.
See 3550 for additional information about `ssrc`.

> **Note:**
> The specification includes an example that generates values for `ssrc` using MD5.
> While not part of the standard, exactly, it is a good mechanism that may be used by some browsers; others may use other methods, such as random number generators.
> _Do not_ rely upon these values meaning anything other than "these objects are associated with the same source."

## See also

- `RTCRtpReceiver.getSynchronizationSources()`
- `RTCEncodedAudioFrame.getMetadata()`
