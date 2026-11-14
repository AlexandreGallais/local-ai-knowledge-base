---
title: "VideoTrackGenerator"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/videotrackgenerator/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# VideoTrackGenerator

The **`VideoTrackGenerator`** interface of the Insertable Streams for MediaStreamTrack API has a `WritableStream` property that acts as a `MediaStreamTrack` source, by consuming a stream of `VideoFrame`s as input.

## Constructor

- `VideoTrackGenerator()` (experimental)
    Creates a new `VideoTrackGenerator` object which accepts `VideoFrame` objects.

## Instance properties

- `VideoTrackGenerator.muted` (experimental)
    A Boolean property to temporarily halt or resume the generation of video frames in the output track.
- `VideoTrackGenerator.track` (read-only) (experimental)
    The output `MediaStreamTrack`.
- `VideoTrackGenerator.writable` (read-only) (experimental)
    The input `WritableStream`.

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

- `MediaStreamTrackProcessor`
