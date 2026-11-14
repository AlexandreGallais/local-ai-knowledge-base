---
title: "MediaSource: sourceopen event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediasource/sourceopen_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaSource: sourceopen event

The **`sourceopen`** event is fired when a `MediaSource` object's `readyState` changes to `"open"`.
This indicates that the `MediaSource` is ready to receive data from `SourceBuffer` objects. This can occur either when the `MediaSource` object is first attached to a media element or when the `readyState` changes from `"ended"` back to `"open"`.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("sourceopen", (event) => {});
```

Alternatively, assign to the event handler property of the interface:

```js
onsourceopen = (event) => {};
```

## Event type

A generic `Event`.

## Examples

### Handling the sourceopen event

This example sets up a `MediaSource`, connects it to a video element, and listens for the `sourceopen` event. When the event fires, it adds a `SourceBuffer` to handle the video data, fetches the data, appends it to the buffer, and finally revokes the object URL when the source ends.

```js
const video = document.getElementById("myVideo");
const mediaSource = new MediaSource();

video.src = URL.createObjectURL(mediaSource);

mediaSource.addEventListener("sourceopen", (event) => {
  console.log("MediaSource sourceopen:", event);
  // Add source buffers and begin adding media data.
  const sourceBuffer = mediaSource.addSourceBuffer(
    'video/mp4; codecs="avc1.42E01E"',
  );
  fetch("video-data.mp4")
    .then((response) => response.arrayBuffer())
    .then((data) => {
      sourceBuffer.appendBuffer(data);
    });
});

mediaSource.addEventListener("sourceended", () => {
  URL.revokeObjectURL(video.src);
});
```
