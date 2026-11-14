---
title: "VideoPlaybackQuality: creationTime property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/videoplaybackquality/creationtime/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# VideoPlaybackQuality: creationTime property

The read-only **`creationTime`** property on the
`VideoPlaybackQuality` interface reports the number of milliseconds since
the browsing context was created this quality sample was recorded.

## Value

A `DOMHighResTimeStamp` object which indicates the number of milliseconds
that elapsed between the time the browsing context was created and the time at which
this sample of the video quality was obtained.

For details on how the time is determined, see `Performance.now()`.

## Examples

This example calls `getVideoPlaybackQuality()` to obtain a
`VideoPlaybackQuality` object, then determines what percentage of frames
have been lost by either corruption or being dropped. If that exceeds 10% (0.1), a
function called `lostFramesThresholdExceeded()` is called to, perhaps,
update a quality indicator to show an increase in frame loss.

```js
const videoElem = document.getElementById("my_vid");
const quality = videoElem.getVideoPlaybackQuality();

if (
  (quality.corruptedVideoFrames + quality.droppedVideoFrames) /
    quality.totalVideoFrames >
  0.1
) {
  lostFramesThresholdExceeded();
}
```

## See also

- The `HTMLVideoElement.getVideoPlaybackQuality()` method, which
  returns `VideoPlaybackQuality` objects
