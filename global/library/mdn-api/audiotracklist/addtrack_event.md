---
title: "AudioTrackList: addtrack event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/audiotracklist/addtrack_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AudioTrackList: addtrack event

The `addtrack` event is fired when a track is added to an `AudioTrackList`.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("addtrack", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onaddtrack = (event) => { }
```

## Event type

A `TrackEvent`. Inherits from `Event`.

## Description

### Trigger

The `addtrack` event is called whenever a new track is added to the media
element whose audio tracks are represented by the `AudioTrackList` object.
This happens when tracks are added to the element when the media is first attached to
the element; one `addtrack` event will occur for each audio track in the
media resource.

This event is not cancelable and does not bubble.

### Use cases

You can use this event to react to a new audio track becoming available. You may want to update your UI elements to allow for user selection of the new audio track, for example.

## Examples

Using `addEventListener()`:

```js
const videoElement = document.querySelector("video");

videoElement.audioTracks.addEventListener("addtrack", (event) => {
  console.log(`Audio track: ${event.track.label} added`);
});
```

Using the `onaddtrack` event handler property (but note that this replaces other event listeners added using `onaddtrack`, if any):

```js
const videoElement = document.querySelector("video");

videoElement.audioTracks.onaddtrack = (event) => {
  console.log(`Audio track: ${event.track.label} added`);
};
```

## See also

- Related events: `removetrack`, `change`
- This event on `VideoTrackList` targets: `addtrack`
- This event on `MediaStream` targets: `addtrack`
- Media Capture and Streams API
- WebRTC
