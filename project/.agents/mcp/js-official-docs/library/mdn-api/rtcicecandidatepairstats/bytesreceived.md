---
title: "RTCIceCandidatePairStats: bytesReceived property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcicecandidatepairstats/bytesreceived/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCIceCandidatePairStats: bytesReceived property

The **`bytesReceived`** property of the `RTCIceCandidatePairStats` dictionary indicates the total number of received payload bytes that have been received so far on the connection described by the candidate pair.

## Value

An integer indicating the total number of bytes received so far on the connection described by this candidate pair.

Only data bytes are counted; overhead such as padding, headers, and the like are not included in this count.

## See also

- `RTCIceCandidatePairStats.bytesSent`
