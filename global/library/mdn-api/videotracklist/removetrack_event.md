---
title: "VideoTrackList: removetrack event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/videotracklist/removetrack_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# VideoTrackList: removetrack event

The `removetrack` event is fired when a video track is removed from a `VideoTrackList`.

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

## Examples

Using `addEventListener()`:

```js
const videoElement = document.querySelector("video");

videoElement.videoTracks.addEventListener("removetrack", (event) => {
  console.log(`Video track: ${event.track.label} removed`);
});
```

Using the `onremovetrack` event handler property (but note that this replaces other event listeners added using `onremovetrack`, if any):

```js
const videoElement = document.querySelector("video");

videoElement.videoTracks.onremovetrack = (event) => {
  console.log(`Video track: ${event.track.label} removed`);
};
```

## See also

- Related events: `addtrack`, `change`
- This event on `AudioTrackList` targets: `removetrack`
- This event on `MediaStream` targets: `removetrack`
- Media Capture and Streams API
- WebRTC
