---
title: "RTCPeerConnection: getTransceivers() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcpeerconnection/gettransceivers/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCPeerConnection: getTransceivers() method

The **`getTransceivers()`** method of the `RTCPeerConnection` interface returns a list of the `RTCRtpTransceiver` objects being used to send and receive data on the connection.

## Syntax

```js
getTransceivers()
```

### Parameters

None.

### Return value

An array of the `RTCRtpTransceiver` objects representing the transceivers handling sending and receiving all media on the `RTCPeerConnection`.
The array is in the order in which the transceivers were added to the connection.
The array does not include transceivers that have already been stopped (following offer/answer).

## Examples

The following snippet of code stops all transceivers associated with an `RTCPeerConnection`.

```js
pc.getTransceivers().forEach((transceiver) => {
  transceiver.stop();
});
```

## See also

- WebRTC API
- Signaling and video calling
- `RTCPeerConnection.addTransceiver()`
- `Array.forEach()`
