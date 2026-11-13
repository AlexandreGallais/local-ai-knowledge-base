---
title: "MediaSource: sourceended event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediasource/sourceended_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaSource: sourceended event

The **`sourceended`** event is fired when a `MediaSource` object's `readyState` changes to `"ended"`. This indicates that the application has finished sending data to the `MediaSource`. When an application has finished appending all media data to the `SourceBuffer` objects associated with a `MediaSource`, it calls the `MediaSource.endOfStream()` method on the `MediaSource`. This causes the `readyState` to transition to `"ended"` and triggers the `sourceended` event.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("sourceended", (event) => {})
```

Alternatively, assign to the event handler property of the interface:

```js
onsourceended = (event) => {}
```

## Event type

A generic `Event`.

## Examples

### Handling the sourceopen event

This example demonstrates setting up a video element for playback and handling the `sourceended` event for proper resource management. The code sets up a `MediaSource`, initiates playback by fetching and buffering video data, and then uses the `sourceended` event to perform cleanup tasks like removing event listeners and notifying the user when playback is complete.

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
      sourceBuffer.addEventListener("updateend", () => {
        mediaSource.endOfStream();
      });
    });
});

mediaSource.addEventListener("sourceended", (event) => {
  console.log("MediaSource sourceended:", event);
  URL.revokeObjectURL(video.src);
  // Perform cleanup

  // Remove event listeners from SourceBuffer and MediaSource
  sourceBuffer.removeEventListener("updateend", () => {});
  mediaSource.removeEventListener("sourceopen", () => {});

  // Notify user (e.g., display a "Playback finished" message)
  const messageElement = document.createElement("p");
  messageElement.textContent = "Playback finished.";
  document.body.appendChild(messageElement);
});
```

## See also

- `MediaSource.endOfStream()`
