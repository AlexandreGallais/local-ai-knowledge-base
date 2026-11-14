---
title: "RTCIceCandidatePair: local property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcicecandidatepair/local/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCIceCandidatePair: local property

The **`local`** property of the `RTCIceCandidatePair` interface specifies the `RTCIceCandidate` that describes the configuration of the local end of a viable WebRTC connection.

The `RTCIceCandidatePair` is returned by the `getSelectedCandidatePair()` method of `RTCIceTransport`.

## Value

An `RTCIceCandidate`.

## Examples

### Basic usage

This one-line example obtains the current candidate pair and then from that gets the local candidate.

```js
const candidatePair = pc
  .getSenders()[0]
  .transport.iceTransport.getSelectedCandidatePair();
const localCandidate = candidatePair.local;
```

The `RTCIceTransport` is found by getting the list of `RTCRtpSender` objects for the `RTCPeerConnection` `pc`.
In the first `RTCRtpSender`, we get the `RTCDtlsTransport` over which the media data is being transmitted and finally, from that, the `RTCIceTransport`.
