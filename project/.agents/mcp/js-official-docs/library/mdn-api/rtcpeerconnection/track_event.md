---
title: "RTCPeerConnection: track event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcpeerconnection/track_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCPeerConnection: track event

The **`track`** event is sent to the `ontrack` event handler on `RTCPeerConnection`s after a new track has been added to an `RTCRtpReceiver` which is part of the connection.

By the time this event is delivered, the new track has been fully added to the peer connection. See Track event types for details.

This event is not cancellable and does not bubble.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("track", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
ontrack = (event) => { }
```

## Event type

An `RTCTrackEvent`. Inherits from `Event`.

## Examples

This example shows code that creates a new `RTCPeerConnection`, then adds a new `track` event handler.

```js
pc = new RTCPeerConnection({
  iceServers: [
    {
      urls: "turn:fake.turn-server.url",
      username: "some username",
      credential: "<example-value>",
    },
  ],
});

pc.addEventListener("track", (e) => {
  videoElement.srcObject = e.streams[0];
  hangupButton.disabled = false;
});
```

The event handler assigns the new track's first stream to an existing `` element, identified using the variable `videoElement`.

You can also assign the event handler function to the `ontrack` property, rather than use `addEventListener()` (but note that this replaces other event listeners added using `ontrack`, if any).

```js
pc.ontrack = (e) => {
  videoElement.srcObject = e.streams[0];
  hangupButton.disabled = false;
  return false;
};
```
