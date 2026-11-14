---
title: "MediaStreamTrackGenerator"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediastreamtrackgenerator/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaStreamTrackGenerator

> **Note:**
> Consider using `VideoTrackGenerator` instead.

The **`MediaStreamTrackGenerator`** interface of the Insertable Streams for MediaStreamTrack API creates a `WritableStream` that acts as a `MediaStreamTrack` source.
The object consumes a stream of media frames as input, which can be audio or video frames.

## Constructor

- `MediaStreamTrackGenerator()` (experimental) (non-standard)
    Creates a new `MediaStreamTrackGenerator` object which accepts either `VideoFrame` or `AudioData` objects.

## Instance properties

_This interface also inherits properties from `MediaStreamTrack`._

- `MediaStreamTrackGenerator.writable` (experimental) (non-standard)
    A `WritableStream`.

## Instance methods

_This interface doesn't implement any specific methods, but inherits methods from `MediaStreamTrack`._

## Examples

The following example is from the article Insertable streams for MediaStreamTrack, and demonstrates a barcode scanner application, which process barcodes and highlights them before writing the transformed frames to the writable stream of `MediaStreamTrackGenerator.writable`.

```js
const stream = await getUserMedia({ video: true });
const videoTrack = stream.getVideoTracks()[0];

const trackProcessor = new MediaStreamTrackProcessor({ track: videoTrack });
const trackGenerator = new MediaStreamTrackGenerator({ kind: "video" });

const transformer = new TransformStream({
  async transform(videoFrame, controller) {
    const barcodes = await detectBarcodes(videoFrame);
    const newFrame = highlightBarcodes(videoFrame, barcodes);
    videoFrame.close();
    controller.enqueue(newFrame);
  },
});

trackProcessor.readable
  .pipeThrough(transformer)
  .pipeTo(trackGenerator.writable);
```

## See also

- `VideoTrackGenerator`
