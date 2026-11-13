---
title: "RTCIceCandidatePair: remote property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcicecandidatepair/remote/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCIceCandidatePair: remote property

The **`remote`** property of the `RTCIceCandidatePair` interface specifies the `RTCIceCandidate` that describes the configuration of the remote end of a viable WebRTC connection.

The `RTCIceCandidatePair` is returned by the `getSelectedCandidatePair()` method of `RTCIceTransport`.

## Value

An `RTCIceCandidate`.

## Examples

### Basic usage

This one-line example obtains the current candidate pair and then from that gets the remote candidate.

```js
const candidatePair = pc
  .getSenders()[0]
  .transport.transport.getSelectedCandidatePair();
const remoteCandidate = candidatePair.remote;
```

The `RTCIceTransport` is found by getting the list of `RTCRtpSender` objects for the `RTCPeerConnection` `pc`.
In the first `RTCRtpSender`, we get the `RTCDtlsTransport` over which the media data is being transmitted and finally, from that, the `RTCIceTransport`.
