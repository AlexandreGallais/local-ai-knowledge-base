---
title: "TextTrackList: addtrack event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/texttracklist/addtrack_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TextTrackList: addtrack event

The **`addtrack`** event is fired when a track is added to a `TextTrackList`.

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

## Examples

Using `addEventListener()`:

```js
const mediaElement = document.querySelector("video, audio");

mediaElement.textTracks.addEventListener("addtrack", (event) => {
  console.log(`Text track: ${event.track.label} added`);
});
```

Using the `onaddtrack` event handler property (but note that this replaces other event listeners added using `onaddtrack`, if any):

```js
const mediaElement = document.querySelector("video, audio");

mediaElement.textTracks.onaddtrack = (event) => {
  console.log(`Text track: ${event.track.label} added`);
};
```

## See also

- Related events: `removetrack`, `change`
- This event on `VideoTrackList` targets: `addtrack`
- This event on `AudioTrackList` targets: `addtrack`
- This event on `MediaStream` targets: `addtrack`
- Media Capture and Streams API
- WebRTC
