---
title: "MediaStreamTrackGenerator: writable property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediastreamtrackgenerator/writable/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaStreamTrackGenerator: writable property

The **`writable`** property of the `MediaStreamTrackGenerator` interface returns a `WritableStream`. This allows the writing of media frames to the `MediaStreamTrackGenerator`. The frames will be audio or video. The type is dictated by the kind of `MediaStreamTrackGenerator` that was created.

## Value

A `WritableStream`.

## Examples

In the following example video frames are transformed then written to the `WritableStream` accessed with `MediaStreamTrackGenerator.writable`.

```js
const trackProcessor = new MediaStreamTrackProcessor({ track: videoTrack });
const trackGenerator = new MediaStreamTrackGenerator({ kind: "video" });

/* */

trackProcessor.readable
  .pipeThrough(transformer)
  .pipeTo(trackGenerator.writable);
```
