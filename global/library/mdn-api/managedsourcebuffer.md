---
title: "ManagedSourceBuffer"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/managedsourcebuffer/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ManagedSourceBuffer

The **`ManagedSourceBuffer`** interface of the `Media Source Extensions API` is a `SourceBuffer` that is created by a `ManagedMediaSource` when `addSourceBuffer()` is called. It inherits all the properties and methods of `SourceBuffer`, and additionally fires a `bufferedchange` event whenever the buffered ranges change — including when the user agent evicts content as part of its memory cleanup algorithm.

Applications should listen for the `bufferedchange` event to track changes to buffered data, since a `ManagedMediaSource` may evict content at any time for reasons such as memory or hardware limitations.

## Instance properties

_Inherits properties from its parent interface, `SourceBuffer`._

## Instance methods

_Inherits methods from its parent interface, `SourceBuffer`._

## Events

_Also inherits events from its parent interface, `SourceBuffer`._

- `bufferedchange` (experimental)
    Fired when the `ManagedSourceBuffer`'s buffered range changes, following a call to `appendBuffer()`, `remove()`, `endOfStream()`, or as a consequence of the user agent running the memory cleanup algorithm.

## Examples

### Listening for buffered range changes

This example sets up a `ManagedMediaSource`, adds a `ManagedSourceBuffer`, fetches a fragmented MP4 file, and listens for the `bufferedchange` event to log any changes to the buffered ranges.

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
    });

    const response = await fetch(videoUrl);
    const data = await response.arrayBuffer();
    sourceBuffer.appendBuffer(data);
  });
}
```

## See also

- `ManagedMediaSource`
- `BufferedChangeEvent`
- `SourceBuffer`
- `MediaSource`
