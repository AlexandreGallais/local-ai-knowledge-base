---
title: "ManagedSourceBuffer: bufferedchange event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/managedsourcebuffer/bufferedchange_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ManagedSourceBuffer: bufferedchange event

The **`bufferedchange`** event of the `ManagedSourceBuffer` interface is fired when the `ManagedSourceBuffer`'s buffered range changes. This can occur following a call to `appendBuffer()`, `remove()`, `endOfStream()`, or as a consequence of the user agent running the memory cleanup algorithm.

This event is important for applications using a `ManagedMediaSource`, because the user agent can evict buffered content at any time. By listening for this event, applications can detect when buffered data has been removed and respond by fetching replacement segments to avoid playback stalls.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("bufferedchange", (event) => {});
```

Alternatively, assign to the event handler property of the interface:

```js
onbufferedchange = (event) => {};
```

## Event type

A `BufferedChangeEvent`. Inherits from `Event`.

## Examples

### Tracking buffered range changes

This example sets up a `ManagedMediaSource`, adds a source buffer, fetches a fragmented MP4 file, and listens for the `bufferedchange` event to log any changes to the buffered ranges.

```js
const videoUrl =
  "https://mdn.github.io/shared-assets/videos/flower-fragmented.mp4";
const mediaType = 'video/mp4; codecs="avc1.64001F, mp4a.40.2"';

if (ManagedMediaSource.isTypeSupported(mediaType)) {
  const source = new ManagedMediaSource();
  const video = document.createElement("video");

  video.controls = true;
  video.disableRemotePlayback = true;
  video.src = URL.createObjectURL(source);
  document.body.appendChild(video);

  source.addEventListener("sourceopen", async () => {
    const sourceBuffer = source.addSourceBuffer(mediaType);

    sourceBuffer.addEventListener("bufferedchange", (event) => {
      for (let i = 0; i < event.addedRanges.length; i++) {
        console.log(
          `Added: ${event.addedRanges.start(i)}s - ${event.addedRanges.end(i)}s`,
        );
      }
      for (let i = 0; i < event.removedRanges.length; i++) {
        console.log(
          `Removed: ${event.removedRanges.start(i)}s - ${event.removedRanges.end(i)}s`,
        );
      }
    });

    const response = await fetch(videoUrl);
    const data = await response.arrayBuffer();
    sourceBuffer.appendBuffer(data);
  });
}
```

## See also

- `BufferedChangeEvent`
- `ManagedMediaSource`
- `ManagedSourceBuffer`
- `SourceBuffer`
