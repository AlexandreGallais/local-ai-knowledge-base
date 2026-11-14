---
title: "MediaStreamTrackProcessor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediastreamtrackprocessor/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaStreamTrackProcessor

> **Warning:**
> Browsers differ on which global context they expose this interface in (e.g., only window in some browsers and only dedicated worker in others), making them incompatible. Keep this in mind when comparing support.

The **`MediaStreamTrackProcessor`** interface of the Insertable Streams for MediaStreamTrack API consumes a video `MediaStreamTrack` object's source and generates a stream of `VideoFrame` objects.

## Constructor

- `MediaStreamTrackProcessor()`
    Creates a new `MediaStreamTrackProcessor` object.
- `window.MediaStreamTrackProcessor()` (experimental) (non-standard)
    Creates a new `MediaStreamTrackProcessor` object on the main thread that can process both video and audio.

## Instance properties

- `MediaStreamTrackProcessor.discardedFrames` (read-only) (experimental)
    A number indicating how many frames have been dropped by the processor.
- `MediaStreamTrackProcessor.readable` (read-only)
    Returns a `ReadableStream`.
- `MediaStreamTrackProcessor.totalFrames` (read-only) (experimental)
    A number indicating how many frames have been received by the processor in total.

## Examples

The following example is from the article Unbundling MediaStreamTrackProcessor and VideoTrackGenerator. It transfers a camera `MediaStreamTrack` to a worker for processing. The worker creates a pipeline that applies a sepia tone filter to the video frames and mirrors them. The pipeline culminates in a `VideoTrackGenerator` whose `MediaStreamTrack` is transferred back and played. The media now flows in real time through the transform off the main thread.

```js
const stream = await navigator.mediaDevices.getUserMedia({ video: true });
const [track] = stream.getVideoTracks();
const worker = new Worker("worker.js");
worker.postMessage({ track }, [track]);
const { data } = await new Promise((r) => {
  worker.onmessage = r;
});
video.srcObject = new MediaStream([data.track]);
```

worker.js:

```js
onmessage = async ({ data: { track } }) => {
  const vtg = new VideoTrackGenerator();
  self.postMessage({ track: vtg.track }, [vtg.track]);
  const { readable } = new MediaStreamTrackProcessor({ track });
  await readable
    .pipeThrough(new TransformStream({ transform }))
    .pipeTo(vtg.writable);
};
```

## See also

- `VideoTrackGenerator`
- Insertable streams for MediaStreamTrack on developer.chrome.com
  > **Note:**
  > This article was written before the API was restricted to workers and video. Beware its use of the non-standard version of `MediaStreamTrackProcessor` which blocks on the main thread.
