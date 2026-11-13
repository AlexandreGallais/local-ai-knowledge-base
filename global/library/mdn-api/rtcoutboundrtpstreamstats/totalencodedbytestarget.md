---
title: "RTCOutboundRtpStreamStats: totalEncodedBytesTarget property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcoutboundrtpstreamstats/totalencodedbytestarget/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCOutboundRtpStreamStats: totalEncodedBytesTarget property

The **`totalEncodedBytesTarget`** property of the `RTCOutboundRtpStreamStats` dictionary represents the sum of the target frame sizes for all of the frames encoded so far.

The codec has a target maximum size for each frame that it is asked to compress, in bytes.
This property indicates the cumulative total of the target sizes for each frame at the current time.
This will probably differ from the total of the actual frame sizes.
You can compare to `bytesSent` in order to estimate how closely the codec is matching its target.

The value increases every time `framesEncoded` goes up.

> **Note:**
> The property is undefined for audio streams.

## Value

The sum of the target frame sizes in bytes, represented as a positive integer.
