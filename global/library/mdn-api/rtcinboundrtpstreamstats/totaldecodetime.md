---
title: "RTCInboundRtpStreamStats: totalDecodeTime property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcinboundrtpstreamstats/totaldecodetime/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCInboundRtpStreamStats: totalDecodeTime property

The **`totalDecodeTime`** property of the `RTCInboundRtpStreamStats` dictionary indicates the total time spend decoding frames for this media source/stream, in seconds.

The time it takes to decode one frame is the time passed between feeding the decoder a frame and the decoder returning decoded data for that frame.

The number of decoded frames is given in `framesDecoded`, and the average decode time is `totalDecodeTime / framesDecoded`.

> **Note:**
> The property is undefined for audio streams.

## Value

A positive number, in seconds.

## See also

- `framesDecoded`
