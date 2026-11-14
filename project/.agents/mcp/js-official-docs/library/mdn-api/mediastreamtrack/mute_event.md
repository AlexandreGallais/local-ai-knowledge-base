---
title: "MediaStreamTrack: mute event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediastreamtrack/mute_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaStreamTrack: mute event

The **`mute`** event is sent to a `MediaStreamTrack` when the track's source is temporarily unable to provide media data.

When the track is once again able to produce media output, an `unmute` event is sent.

During the time between the `mute` event and the `unmute` event, the value of the track's `muted` property is `true`.

> **Note:**
> The condition that most people think of as "muted" (that is, a user-toggled state of silencing a track) is actually managed using the `MediaStreamTrack.enabled` property, for which there are no events.

This event is not cancelable and does not bubble.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("mute", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onmute = (event) => { }
```

## Event type

A generic `Event`.

## Examples

In this example, event handlers are established for the `mute` and `unmute` events in order to detect when the media is not flowing from the source for the `MediaStreamTrack` referenced by `musicTrack`.

```js
musicTrack.addEventListener("mute", (event) => {
  const widget = document.getElementById("timeline-widget");
  widget.style.backgroundColor = "#aaaaaa";
});

musicTrack.addEventListener("unmute", (event) => {
  document.getElementById("timeline-widget").style.backgroundColor = "white";
});
```

With these event handlers in place, when the track `musicTrack` enters its `muted` state, the element with the ID `timeline-widget` gets its background color changed to `#aaaaaa`. When the track exits the muted state—detected by the arrival of an `unmute` event—the background color is restored to white.

You can also use the `onmute` event handler property to set up a handler for this event; similarly, the `onunmute` event handler is available for setting up a handler for the `unmute` event. The following example shows this (but note that this replaces other event listeners added using `onmute` and `onunmute`, if any):

```js
musicTrack.onmute = (event) => {
  document.getElementById("timeline-widget").style.backgroundColor = "#aaaaaa";
};

musicTrack.onunmute = (event) => {
  document.getElementById("timeline-widget").style.backgroundColor = "white";
};
```

### Mute tracks through receivers

The following example shows how to mute tracks using receivers.

```js
// Peer 1 (Sender)
const transceivers = peer.getTransceivers();

const audioTrack = transceivers[0];
audioTrack.direction = "recvonly";

const videoTrack = transceivers[1];
videoTrack.direction = "recvonly";

// Peer 2 (Receiver)
audioTrack.addEventListener("mute", (event) => {
  // Do something in UI
});

videoTrack.addEventListener("mute", (event) => {
  // Do something in UI
});
```

`transceivers` is an array of `RTCRtpTransceiver` where you can find the audio or video track sent and received. For more information, see the `direction` article.

## See also

- `unmute` event
- `direction`
