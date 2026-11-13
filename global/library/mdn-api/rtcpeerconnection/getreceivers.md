---
title: "RTCPeerConnection: getReceivers() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcpeerconnection/getreceivers/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCPeerConnection: getReceivers() method

The **`getReceivers()`** method of the `RTCPeerConnection` interface returns an array of `RTCRtpReceiver` objects, each of which represents one RTP receiver.
Each RTP receiver manages the reception and decoding of data for a `MediaStreamTrack` on an `RTCPeerConnection`.

## Syntax

```js
getReceivers()
```

### Parameters

None.

### Return value

An array of `RTCRtpReceiver` objects, one for each track on the connection.
The array is empty if there are no RTP receivers on the connection.

The order of the returned `RTCRtpReceiver` instances is not defined by the specification, and may change from one call to `getReceivers()` to the next.

The array does not include receivers associated with transceivers that have been stopped (following offer/answer).

## Example

tbd

## See also

- WebRTC
- `RTCRtpSender`
