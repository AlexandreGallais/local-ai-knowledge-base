---
title: "VideoPlaybackQuality: totalVideoFrames property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/videoplaybackquality/totalvideoframes/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# VideoPlaybackQuality: totalVideoFrames property

The `VideoPlaybackQuality` interface's
**`totalVideoFrames`** read-only property returns the total
number of video frames that have been displayed or dropped since the media was
loaded.

## Value

The total number of frames that the `` element has displayed or
dropped since the media was loaded into it. Essentially, this is the number of frames
the element _would have presented_ had no problems occurred.

This value is reset when the media is reloaded or replaced.

## Examples

This example calls `getVideoPlaybackQuality()`
to obtain a `VideoPlaybackQuality` object,
then determines what percentage of frames have been lost by either corruption or being
dropped. If that exceeds 10% (0.1), a function called
`lostFramesThresholdExceeded()` is called to, perhaps, update a quality
indicator to show an increase in frame loss.

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

A similar algorithm might be used to attempt to switch to a lower-resolution video that
requires less bandwidth, in order to avoid dropping frames.

## See also

- The `HTMLVideoElement.getVideoPlaybackQuality()` method for
  constructing and returning this interface.
