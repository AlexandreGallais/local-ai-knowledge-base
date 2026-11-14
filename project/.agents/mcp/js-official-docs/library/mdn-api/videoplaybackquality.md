---
title: "VideoPlaybackQuality"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/videoplaybackquality/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# VideoPlaybackQuality

A **`VideoPlaybackQuality`** object is returned by the `HTMLVideoElement.getVideoPlaybackQuality()` method and contains metrics that can be used to determine the playback quality of a video.

## Instance properties

_The `VideoPlaybackQuality` interface doesn't inherit properties from any other interfaces._

- `creationTime` (read-only)
    A `DOMHighResTimeStamp` containing the time in milliseconds between the start of the navigation and the creation of the object.
- `droppedVideoFrames` (read-only)
    An `unsigned long` giving the number of video frames dropped since the creation of the associated `HTMLVideoElement`.
- `totalVideoFrames` (read-only)
    An `unsigned long` giving the number of video frames created and dropped since the creation of the associated `HTMLVideoElement`.

### Obsolete properties

- `corruptedVideoFrames` (read-only) (deprecated)
    An `unsigned long` giving the number of video frames corrupted since the creation of the associated `HTMLVideoElement`. A corrupted frame may be created or dropped.
- `totalFrameDelay` (read-only) (deprecated) (non-standard)
    A `double` containing the sum of the frame delay since the creation of the associated `HTMLVideoElement`. The frame delay is the difference between a frame's theoretical presentation time and its effective display time.

## Instance methods

_The `VideoPlaybackQuality` interface has no methods, and does not inherit any._

## See also

- The `HTMLVideoElement.getVideoPlaybackQuality()` method to get a `VideoPlaybackQuality` object
- `MediaSource`
- `SourceBuffer`
