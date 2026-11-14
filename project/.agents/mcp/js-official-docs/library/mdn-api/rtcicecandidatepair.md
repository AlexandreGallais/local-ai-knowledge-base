---
title: "RTCIceCandidatePair"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcicecandidatepair/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCIceCandidatePair

The **`RTCIceCandidatePair`** dictionary describes a pair of ICE candidates which together comprise a description of a viable connection between two WebRTC endpoints. It is used as the return value from `RTCIceTransport.getSelectedCandidatePair()` to identify the currently-selected candidate pair identified by the ICE agent.

## Instance properties

- `local` (read-only) (experimental)
    An `RTCIceCandidate` describing the configuration of the local end of the connection.
- `remote` (read-only) (experimental)
    The **`RTCIceCandidate`** describing the configuration of the remote end of the connection.

## Examples

See `RTCIceTransport.onselectedcandidatepairchange` for example code.
