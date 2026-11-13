---
title: "RTCIceTransport: getSelectedCandidatePair() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcicetransport/getselectedcandidatepair/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCIceTransport: getSelectedCandidatePair() method

The **`getSelectedCandidatePair()`** method of the `RTCIceTransport` interface returns an `RTCIceCandidatePair` instance containing the current best-choice pair of ICE candidates describing the configuration of the endpoints of the transport.

## Syntax

```js
getSelectedCandidatePair()
```

### Parameters

None.

### Return value

An `RTCIceCandidatePair` instance describing the configurations of the currently-selected candidate pair's `local` and `remote` endpoints.

The return value is `null` if no pair of candidates has been selected yet.

## Description

As the ICE agent performs negotiation of a `RTCPeerConnection`, it gathers and analyzes candidate configurations from each of the two peers.
As soon as it finds an acceptable matching pair of candidates, meeting the requirements for the connection, a `selectedcandidatepairchange` event is fired at the `RTCIceTransport`.
From that time forward, the best matching pair of candidates will always be available by calling `getSelectedCandidatePair()`.

As ICE negotiation continues, any time a pair of candidates is discovered that is better than the currently-selected pair, the new pair is selected, replacing the previous pairing, and the `selectedcandidatepairchange` event is fired again.

> **Note:**
> It's possible for one of the configurations in the selected candidate pair to remain unchanged when a new pairing is chosen.

## Examples

See `RTCIceTransport.onselectedcandidatepairchange` for example code.
