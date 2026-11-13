---
title: "Insertable Streams for MediaStreamTrack API"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/insertable_streams_for_mediastreamtrack_api/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Insertable Streams for MediaStreamTrack API

The **Insertable Streams for MediaStreamTrack API** provides a way to process the video frames of a `MediaStreamTrack` as they are consumed.

## Concepts and Usage

When processing real-time video, you sometimes want to insert visual elements or otherwise process the stream of video frames. For example, an application might include two tracks that need to be combined, such as a weather map and video of a presenter explaining the map. Or, you may want to do processing on a track to blur backgrounds, or introduce other elements (such as adding funny hats to people, and so on). The APIs described here provide direct access to the video stream, allowing you to manipulate it in real time.

To ensure optimal performance, the APIs are only available in dedicated workers (unless otherwise stated).

## Interfaces

- `MediaStreamTrackProcessor` (experimental)
    Consumes a `MediaStreamTrack` object's source and produces a stream of video frames.
- `VideoTrackGenerator` (experimental)
    Creates a `WritableStream` that acts as a `MediaStreamTrack` video source.
- `MediaStreamTrackGenerator` (experimental) (non-standard)
    Creates a `WritableStream` that acts as a `MediaStreamTrack` source for either video or audio. Only available on the main thread.

## Examples

The following example is from the article Unbundling MediaStreamTrackProcessor and VideoTrackGenerator. It transfers a camera `MediaStreamTrack` to a worker for processing. The worker creates a pipeline that applies a sepia tone filter to the video frames and mirrors them. The pipeline culminates in a `VideoTrackGenerator` whose `MediaStreamTrack` is transferred back and played. The media now flows in real time through the transform off the main thread.

```js
const stream = await navigator.mediaDevices.getUserMedia({ video: true });
const [track] = stream.getVideoTracks();
const worker = new Worker("worker.js");
worker.postMessage({ track }, [track]);
const { data } = await new Promise((r) => (worker.onmessage = r));
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
