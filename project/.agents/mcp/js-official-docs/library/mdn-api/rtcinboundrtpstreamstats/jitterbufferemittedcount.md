---
title: "RTCInboundRtpStreamStats: jitterBufferEmittedCount property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcinboundrtpstreamstats/jitterbufferemittedcount/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCInboundRtpStreamStats: jitterBufferEmittedCount property

The **`jitterBufferEmittedCount`** property of the `RTCInboundRtpStreamStats` dictionary indicates the total number of audio samples and/or video frames that have come out of the jitter buffer.

The `jitterBufferEmittedCount` and `jitterBufferDelay` are incremented when samples or frames exit the buffer.
The average jitter buffer delay is `jitterBufferDelay / jitterBufferEmittedCount`.

## Value

A positive number.

## See also

- `jitterBufferDelay`
