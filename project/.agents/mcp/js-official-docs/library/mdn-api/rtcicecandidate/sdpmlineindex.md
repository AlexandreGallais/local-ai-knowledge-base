---
title: "RTCIceCandidate: sdpMLineIndex property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcicecandidate/sdpmlineindex/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCIceCandidate: sdpMLineIndex property

The read-only **`sdpMLineIndex`** property on the `RTCIceCandidate` interface
is a zero-based index of the m-line describing the media associated with the candidate.

This property can be configured by specifying the value of the `sdpMLineIndex` property in the `candidateInfo` options object that is passed to the `RTCIceCandidate()` constructor.
If you call the constructor with an m-line string instead of the options object, the value of `sdpMLineIndex` is extracted from the specified candidate m-line string.

## Value

A number containing a 0-based index into the set of m-lines providing media descriptions,
indicating which media source is associated with the candidate, or `null` if no such association is available.

> **Note:**
> Attempting to add a candidate (using
> `addIceCandidate()`) that has a
> value of `null` for either `sdpMid` or
> `sdpMLineIndex` will throw a `TypeError` exception.
