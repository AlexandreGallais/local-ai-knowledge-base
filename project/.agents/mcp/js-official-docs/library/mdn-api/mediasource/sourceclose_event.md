---
title: "MediaSource: sourceclose event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediasource/sourceclose_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaSource: sourceclose event

The **`sourceclose`** event is fired when a `MediaSource` object's `readyState` changes to `"closed"`. This indicates that the `MediaSource` has been detached from the media element.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("sourceclose", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onsourceclose = (event) => { }
```

## Event type

A generic `Event`.

## Examples

### Handling the sourceclose event

This example demonstrates detaching a media element from a `MediaSource` and handling the `sourceclose` event for proper resource management. The code sets up a `MediaSource`, attaches it to a video element, and listens for the `sourceclose` event. When the event fires, it performs cleanup tasks (`revokeObjectURL`).

```js
const video = document.getElementById("myVideo");
const mediaSource = new MediaSource();

video.src = URL.createObjectURL(mediaSource);

mediaSource.addEventListener("sourceopen", (event) => {
  const sourceBuffer = mediaSource.addSourceBuffer(
    'video/mp4; codecs="avc1.42E01E"',
  );
  fetch("video-data.mp4")
    .then((response) => response.arrayBuffer())
    .then((data) => {
      sourceBuffer.appendBuffer(data);
    });
});

function detachMediaSource() {
  video.src = null; // Detach the MediaSource
}

mediaSource.addEventListener("sourceclose", (event) => {
  console.log("MediaSource sourceclose:", event);
  // Perform cleanup tasks here, e.g., release resources, update UI
  URL.revokeObjectURL(video.src); // Clean up the object URL
});

// Call detachMediaSource() when appropriate, e.g., on a button click
document
  .getElementById("detachButton")
  .addEventListener("click", detachMediaSource);
```
