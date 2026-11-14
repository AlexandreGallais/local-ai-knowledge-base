---
title: "BufferedChangeEvent"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/bufferedchangeevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# BufferedChangeEvent

The **`BufferedChangeEvent`** interface of the `Media Source Extensions API` represents the event object for the `bufferedchange` event fired on a `ManagedSourceBuffer`. This event is fired whenever the buffered ranges of the `ManagedSourceBuffer` change, for example as a result of `appendBuffer()`, `remove()`, or `endOfStream()` calls, or when the user agent runs the memory cleanup algorithm.

## Constructor

- `BufferedChangeEvent()` (experimental)
    Creates and returns a new `BufferedChangeEvent` object.

## Instance properties

_Also inherits properties from its parent interface, `Event`._

- `BufferedChangeEvent.addedRanges` (read-only) (experimental)
    A `TimeRanges` object representing the time ranges that were added to the `ManagedSourceBuffer`'s buffer.
- `BufferedChangeEvent.removedRanges` (read-only) (experimental)
    A `TimeRanges` object representing the time ranges that were removed from the `ManagedSourceBuffer`'s buffer.

## Examples

### Handling buffered range changes

This example creates a `ManagedMediaSource`, attaches it to a `` element, fetches a fragmented MP4 file, and listens for the `bufferedchange` event. When the event fires, it logs the added time ranges.

```js
const videoUrl =
  "https://mdn.github.io/shared-assets/videos/flower-fragmented.mp4";
const mediaType = 'video/mp4; codecs="avc1.64001F, mp4a.40.2"';

if (ManagedMediaSource.isTypeSupported(mediaType)) {
  const video = document.createElement("video");
  const source = new ManagedMediaSource();

  video.controls = true;
  video.disableRemotePlayback = true;
  video.src = URL.createObjectURL(source);
  document.body.appendChild(video);

  source.addEventListener("sourceopen", async () => {
    const sourceBuffer = source.addSourceBuffer(mediaType);

    sourceBuffer.addEventListener("bufferedchange", (event) => {
      for (let i = 0; i < event.addedRanges.length; i++) {
        console.log(
          `Added range: ${event.addedRanges.start(i)} - ${event.addedRanges.end(i)}`,
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
- `ManagedSourceBuffer`
- `MediaSource`
- `SourceBuffer`
