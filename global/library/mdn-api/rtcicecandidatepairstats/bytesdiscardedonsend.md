---
title: "RTCIceCandidatePairStats: bytesDiscardedOnSend property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcicecandidatepairstats/bytesdiscardedonsend/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCIceCandidatePairStats: bytesDiscardedOnSend property

The **`bytesDiscardedOnSend`** property of the `RTCIceCandidatePairStats` dictionary indicates the total number of bytes discarded due to socket errors.

The errors might be caused, for example, by attempting to pass <example-value> to the socket when it is full.

## Value

An integer value indicating the total number of bytes discarded due to socket errors.
This is calculated as defined in 3550.
