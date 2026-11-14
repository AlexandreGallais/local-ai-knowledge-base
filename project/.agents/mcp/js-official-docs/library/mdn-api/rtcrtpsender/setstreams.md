---
title: "RTCRtpSender: setStreams() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcrtpsender/setstreams/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCRtpSender: setStreams() method

The `RTCRtpSender` method **`setStreams()`** associates the sender's `track` with the specified `MediaStream` objects.

## Syntax

```js
setStreams()
setStreams(mediaStream1)
setStreams(mediaStream1, mediaStream2)
setStreams(mediaStream1, mediaStream2, /* …, */ mediaStreamN)
```

### Parameters

- `mediaStreamN` (optional)
    An arbitrary number of `MediaStream` objects specified as arguments, that identify the streams to which the `RTCRtpSender`'s `track` belongs.
    If this parameter isn't specified, no new streams will be associated with the track.

### Return value

None (`undefined`).

### Exceptions

- `InvalidStateError` `DOMException`
    Thrown if the sender's connection is closed.

## Description

`setStreams()` is purely additive. It doesn't remove the track from any streams; it adds it to new ones.
If you specify streams to which the track already belongs, that stream is unaffected.

Once the track has been added to all of the streams, renegotiation of the connection will be triggered by the `negotiationneeded` event being dispatched to the `RTCPeerConnection` to which the sender belongs.

## Examples

This example adds all of an `RTCPeerConnection`'s tracks to the specified stream.

```js
function addTracksToStream(stream) {
  let senders = pc.getSenders();

  senders.forEach((sender) => {
    if (sender.track && sender.transport.state === connected) {
      sender.setStreams(stream);
    }
  });
}
```

After calling the `RTCPeerConnection` method `getSenders()` to get the list of the connection's senders, the `addTracksToStream()` function iterates over the list.
For each sender, if the sender's track is non-null and its transport's state is `connected`, we call `setStreams()` to add the track to the `stream` specified.
