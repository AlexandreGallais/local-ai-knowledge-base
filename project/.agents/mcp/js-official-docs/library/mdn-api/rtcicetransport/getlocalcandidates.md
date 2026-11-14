---
title: "RTCIceTransport: getLocalCandidates() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcicetransport/getlocalcandidates/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCIceTransport: getLocalCandidates() method

The **`getLocalCandidates()`** method of the `RTCIceTransport` interface returns an array of `RTCIceCandidate` objects, one for each of the candidates that have been gathered by the local device during the current ICE agent session.

The local candidates are placed in this list by the ICE agent prior to being delivered to the local client's code in an `icecandidate` event so that the client can forward the candidates to the remote peer.

## Syntax

```js
getLocalCandidates()
```

### Parameters

None.

### Return value

A JavaScript `Array` containing one `RTCIceCandidate` object for each candidate that has been identified so far during the ICE candidate gathering session.

You can't correlate these local candidates with matching remote candidates.
To find the best match found so far, call `RTCIceTransport.getSelectedCandidatePair()`.

## Examples

This simple example gets the local candidate list from the `RTCIceTransport` for the first `RTCRtpSender` on the `RTCPeerConnection`, then outputs to the console all of the candidates in the list.

```js
const localCandidates = pc
  .getSenders()[0]
  .transport.iceTransport.getLocalCandidates();

localCandidates.forEach((candidate, index) => {
  console.log(`Candidate ${index}: ${candidate.candidate}`);
});
```
