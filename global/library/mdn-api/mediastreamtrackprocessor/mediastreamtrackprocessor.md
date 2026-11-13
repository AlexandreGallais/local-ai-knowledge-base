---
title: "MediaStreamTrackProcessor: MediaStreamTrackProcessor() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediastreamtrackprocessor/mediastreamtrackprocessor/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaStreamTrackProcessor: MediaStreamTrackProcessor() constructor

The **`MediaStreamTrackProcessor()`** constructor creates a new `MediaStreamTrackProcessor` object which consumes a video `MediaStreamTrack` object's source and generates a stream of `VideoFrame`s.

## Syntax

```js
new MediaStreamTrackProcessor(options)
```

### Parameters

- `options`
    An object with the following properties:
    - `track`
        A `MediaStreamTrack`.
    - `maxBufferSize` (optional)
        An integer specifying the maximum number of media frames to be buffered.

## Examples

In the following example a new `MediaStreamTrackProcessor` is created.

```js
const trackProcessor = new MediaStreamTrackProcessor({ track: videoTrack });
```
