---
title: "BufferedChangeEvent: removedRanges property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/bufferedchangeevent/removedranges/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# BufferedChangeEvent: removedRanges property

The **`removedRanges`** read-only property of the `BufferedChangeEvent` interface returns a `TimeRanges` object representing the time ranges that were removed from the associated `ManagedSourceBuffer`. These are the ranges removed between the last `updatestart` and `updateend` events, during the most recent run of the coded frame removal or coded frame eviction algorithm, or as a consequence of the user agent running the memory cleanup algorithm.

## Value

A `TimeRanges` object.

## Examples

### Logging removed ranges on buffer change

This example creates a `ManagedMediaSource`, attaches it to a `` element, fetches a fragmented MP4 file, and then removes a portion of the buffered data. The `bufferedchange` event handler logs any removed time ranges.

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
      const removed = event.removedRanges;
      for (let i = 0; i < removed.length; i++) {
        console.log(`Removed range: ${removed.start(i)}s - ${removed.end(i)}s`);
      }
    });

    const response = await fetch(videoUrl);
    const data = await response.arrayBuffer();
    sourceBuffer.appendBuffer(data);

    // Once appended, remove the first 5 seconds to trigger removedRanges
    sourceBuffer.addEventListener(
      "updateend",
      () => {
        sourceBuffer.remove(0, 5);
      },
      { once: true },
    );
  });
}
```

## See also

- `BufferedChangeEvent.addedRanges`
- `bufferedchange` event
- `ManagedSourceBuffer`
- `TimeRanges`
