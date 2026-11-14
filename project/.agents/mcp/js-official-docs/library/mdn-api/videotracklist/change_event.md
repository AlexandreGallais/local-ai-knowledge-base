---
title: "VideoTrackList: change event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/videotracklist/change_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# VideoTrackList: change event

The `change` event is fired when a video track is made active or inactive, for example by changing the track's `selected` property.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("change", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onchange = (event) => { }
```

## Event type

A generic `Event` with no added properties.

## Examples

Using `addEventListener()`:

```js
const videoElement = document.querySelector("video");
videoElement.videoTracks.addEventListener("change", (event) => {
  console.log(`'${event.type}' event fired`);
});

// changing the value of `selected` will trigger the `change` event
const toggleTrackButton = document.querySelector(".toggle-track");
toggleTrackButton.addEventListener("click", () => {
  const track = videoElement.videoTracks[0];
  track.selected = !track.selected;
});
```

Using the `onchange` event handler property (but note that this replaces other event listeners added using `onchange`, if any):

```js
const videoElement = document.querySelector("video");
videoElement.videoTracks.onchange = (event) => {
  console.log(`'${event.type}' event fired`);
};

// changing the value of `selected` will trigger the `change` event
const toggleTrackButton = document.querySelector(".toggle-track");
toggleTrackButton.addEventListener("click", () => {
  const track = videoElement.videoTracks[0];
  track.selected = !track.selected;
});
```

## See also

- Related events: `addtrack`, `removetrack`
- This event on `AudioTrackList` targets: `change`
- Media Capture and Streams API
- WebRTC
