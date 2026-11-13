---
title: "RTCPeerConnection: removeTrack() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcpeerconnection/removetrack/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCPeerConnection: removeTrack() method

The **`removeTrack()`** method of the `RTCPeerConnection` interface tells the local end of the connection to stop sending media from the specified track, without actually removing the corresponding `RTCRtpSender` from the list of senders as reported by `RTCPeerConnection.getSenders()`.
If the track is already stopped, or is not in the connection's senders list, this method has no effect.

If the connection has already been negotiated (`signalingState` is set to `"stable"`), it is marked as needing to be negotiated again; the remote peer won't experience the change until this negotiation occurs.
A `negotiationneeded` event is sent to the `RTCPeerConnection` to let the local end know this negotiation must occur.

## Syntax

```js
removeTrack(sender)
```

### Parameters

- `sender`
    A `RTCRtpSender` specifying the sender to remove from the connection.

### Return value

`undefined`.

### Exceptions

- `InvalidStateError` `DOMException`
    Thrown if the connection is not open.

## Example

This example adds a video track to a connection and sets up a listener on a close button which removes the track when the user clicks the button.

```js
let pc;
let sender;
navigator.getUserMedia({ video: true }, (stream) => {
  pc = new RTCPeerConnection();
  const [track] = stream.getVideoTracks();
  sender = pc.addTrack(track, stream);
});

document.getElementById("closeButton").addEventListener("click", (event) => {
  pc.removeTrack(sender);
  pc.close();
});
```

## See also

- WebRTC API
