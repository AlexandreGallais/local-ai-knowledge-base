---
title: "RTCIceCandidateStats: transportId property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcicecandidatestats/transportid/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCIceCandidateStats: transportId property

The **`transportId`** property of the `RTCIceCandidateStats` dictionary is a string that uniquely identifies the transport that produced the `RTCTransportStats` from which information about this candidate was taken.

This can be used, for example, to compare candidates that use the same transport.

## Value

A string whose value uniquely identifies the transport from which any transport-related information accumulated in the `RTCIceCandidateStats` was taken.
