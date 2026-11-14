---
title: "TrackEvent"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/trackevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TrackEvent

The **`TrackEvent`** interface of the HTML DOM API is used for events which represent changes to a set of available tracks on an HTML media element; these events are `addtrack` and `removetrack`.

It's important not to confuse `TrackEvent` with the `RTCTrackEvent` interface, which is used for tracks which are part of an `RTCPeerConnection`.

Events based on `TrackEvent` are always sent to one of the media track list types:

- Events involving video tracks are always sent to the `VideoTrackList` found in `HTMLMediaElement.videoTracks`
- Events involving audio tracks are always sent to the `AudioTrackList` specified in `HTMLMediaElement.audioTracks`
- Events affecting text tracks are sent to the `TextTrackList` object indicated by `HTMLMediaElement.textTracks`.

## Constructor

- `TrackEvent()`
    Creates and initializes a new `TrackEvent` object with the event type specified, as well as optional additional properties.

## Instance properties

_`TrackEvent` is based on `Event`, so properties of `Event` are also available on `TrackEvent` objects._

- `track` (read-only)
    The DOM track object the event is in reference to. If not `null`, this is always an object of one of the media track types: `AudioTrack`, `VideoTrack`, or `TextTrack`.

## Instance methods

_`TrackEvent` has no methods of its own; however, it is based on `Event`, so it provides the methods available on `Event` objects._

## Example

This example sets up a function, `handleTrackEvent()`, which is called for any `addtrack` or `removetrack` event on the first `` element found in the document.

```js
const videoElem = document.querySelector("video");

videoElem.videoTracks.addEventListener("addtrack", handleTrackEvent);
videoElem.videoTracks.addEventListener("removetrack", handleTrackEvent);
videoElem.audioTracks.addEventListener("addtrack", handleTrackEvent);
videoElem.audioTracks.addEventListener("removetrack", handleTrackEvent);
videoElem.textTracks.addEventListener("addtrack", handleTrackEvent);
videoElem.textTracks.addEventListener("removetrack", handleTrackEvent);

function handleTrackEvent(event) {
  let trackKind;

  if (event.target instanceof VideoTrackList) {
    trackKind = "video";
  } else if (event.target instanceof AudioTrackList) {
    trackKind = "audio";
  } else if (event.target instanceof TextTrackList) {
    trackKind = "text";
  } else {
    trackKind = "unknown";
  }

  switch (event.type) {
    case "addtrack":
      console.log(`Added a ${trackKind} track`);
      break;
    case "removetrack":
      console.log(`Removed a ${trackKind} track`);
      break;
  }
}
```

The event handler uses the JavaScript `instanceof` operator to determine which type of track the event occurred on, then outputs to console a message indicating what kind of track it is and whether it's being added to or removed from the element.
