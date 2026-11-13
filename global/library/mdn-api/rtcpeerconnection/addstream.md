---
title: "RTCPeerConnection: addStream() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcpeerconnection/addstream/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCPeerConnection: addStream() method

The **`addStream()`** method of the `RTCPeerConnection` interface adds a `MediaStream` as a local source of audio or video.
Instead of using this obsolete method, you should instead use `addTrack()` once for each track you wish to send to the remote peer.

If the `signalingState` is set to `closed`, an `InvalidStateError` is raised.
If the `signalingState` is set to `stable`, the event `negotiationneeded` is sent on the `RTCPeerConnection` to indicate that ICE negotiation must be repeated to consider the new stream.

## Syntax

```js
addStream(mediaStream)
```

### Parameters

- `mediaStream`
    A `MediaStream` object indicating the stream to add to the WebRTC peer connection.

### Return value

None.

## Example

This simple example adds the audio and video stream coming from the user's camera to the connection.

```js
navigator.mediaDevices.getUserMedia({ video: true, audio: true }, (stream) => {
  const pc = new RTCPeerConnection();
  pc.addStream(stream);
});
```

## Migrating to addTrack()

Compatibility allowing, you should update your code to instead use the `addTrack()` method:

```js
navigator.getUserMedia({ video: true, audio: true }, (stream) => {
  const pc = new RTCPeerConnection();
  stream.getTracks().forEach((track) => {
    pc.addTrack(track, stream);
  });
});
```

The newer `addTrack()` API avoids confusion over whether later changes to the track-makeup of a stream affects a peer connection (they do not).

The exception is in Chrome, where `addStream()` _does_ make the peer connection sensitive to later stream changes (though such changes do not fire the `negotiationneeded` event).
If you are relying on the Chrome behavior, note that other browsers do not have it.
You can write web compatible code using feature detection instead:

```js
// Add a track to a stream and the peer connection said stream was added to:

stream.addTrack(track);
if (pc.addTrack) {
  pc.addTrack(track, stream);
} else {
  // If you have code listening for negotiationneeded events:
  setTimeout(() => pc.dispatchEvent(new Event("negotiationneeded")));
}

// Remove a track from a stream and the peer connection said stream was added to:

stream.removeTrack(track);
if (pc.removeTrack) {
  pc.removeTrack(pc.getSenders().find((sender) => sender.track === track));
} else {
  // If you have code listening for negotiationneeded events:
  setTimeout(() => pc.dispatchEvent(new Event("negotiationneeded")));
}
```

## See also

- WebRTC
