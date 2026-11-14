---
title: "RTCPeerConnection: createDTMFSender() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcpeerconnection/createdtmfsender/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCPeerConnection: createDTMFSender() method

The **`createDTMFSender()`** method of the `RTCPeerConnection` interface creates a new `RTCDTMFSender` object associated with the specified `MediaStreamTrack`, which can be used to send DTMF tones over the connection.

This method is deprecated and should not be used. Instead, use the `RTCRtpSender.dtmf` property to access the DTMF sender associated with a specific sender.

## Syntax

```js
createDTMFSender(track)
```

### Parameters

- `track`
    A `MediaStreamTrack` object representing the track to associate with the new DTMF sender.

### Return value

A new `RTCDTMFSender` object.

## Examples

### Using createDTMFSender()

This example creates a new DTMF sender associated with the specified track.

```js
async function getDtmfSender() {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const pc = new RTCPeerConnection();
  const [track] = stream.getAudioTracks();
  return pc.createDTMFSender(track);
}
```

### Using RTCRtpSender.dtmf instead

The previous example can be rewritten using the `RTCRtpSender.dtmf` property of the sender returned by `RTCPeerConnection.addTrack()`:

```js
async function getDtmfSender() {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const pc = new RTCPeerConnection();
  const [track] = stream.getAudioTracks();
  const sender = pc.addTrack(track, stream);
  return sender.dtmf;
}
```

## Specifications

This feature is non-standard and not part of any specification.

## See also

- WebRTC
- `RTCDTMFSender`
- `RTCRtpSender`
- `RTCPeerConnection`
