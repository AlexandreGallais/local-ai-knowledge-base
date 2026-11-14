---
title: "AudioTrackList: removetrack event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/audiotracklist/removetrack_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AudioTrackList: removetrack event

The `removetrack` event is fired when a track is removed from an `AudioTrackList`.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("removetrack", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onremovetrack = (event) => { }
```

## Event type

A `TrackEvent`. Inherits from `Event`.

## Description

### Trigger

The `removetrack` event is called whenever a track is removed from the media
element whose audio tracks are represented by the `AudioTrackList` object.

This event is not cancelable and does not bubble.

### Use cases

You can use this event to react to a new audio track becoming unavailable. You may want to update your UI elements to disallow for user selection of the removed audio track, for example.

## Examples

Using `addEventListener()`:

```js
const videoElement = document.querySelector("video");

videoElement.audioTracks.addEventListener("removetrack", (event) => {
  console.log(`Audio track: ${event.track.label} removed`);
});
```

Using the `onremovetrack` event handler property (but note that this replaces other event listeners added using `onremovetrack`, if any):

```js
const videoElement = document.querySelector("video");

videoElement.audioTracks.onremovetrack = (event) => {
  console.log(`Audio track: ${event.track.label} removed`);
};
```

## See also

- Related events: `addtrack`, `change`
- This event on `VideoTrackList` targets: `removetrack`
- This event on `MediaStream` targets: `removetrack`
- Media Capture and Streams API
- WebRTC
