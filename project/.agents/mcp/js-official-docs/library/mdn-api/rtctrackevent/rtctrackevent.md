---
title: "RTCTrackEvent: RTCTrackEvent() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtctrackevent/rtctrackevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCTrackEvent: RTCTrackEvent() constructor

The **`RTCTrackEvent()`** constructor creates and returns a new `RTCTrackEvent` object,
configured to describe the track which has been added to the `RTCPeerConnection`.

In general, you won't need to use this constructor, as `RTCTrackEvent`
objects are created by WebRTC and delivered to your `RTCPeerConnection`'s
`ontrack` event handler as appropriate.

## Syntax

```js
new RTCTrackEvent(type, options)
```

### Parameters

- `type`
    A string with the name of the event.
    It is case-sensitive and browsers always set it to `track`.
- `options`
    An object that, _in addition of the properties defined in `Event()`_, can have the following properties:
    - `receiver`
        The `RTCRtpReceiver` which is being used to receive the track's media.
    - `streams` (optional)
        An array of `MediaStream` objects representing each of the streams that comprise the event's corresponding track.
        It defaults to an empty array.
    - `track`
        The `MediaStreamTrack` the event is associated with.
    - `transceiver`
        The `RTCRtpTransceiver` associated with the event.

### Return value

A new `RTCTrackEvent` describing a track which has been added to the
`RTCPeerConnection`.
