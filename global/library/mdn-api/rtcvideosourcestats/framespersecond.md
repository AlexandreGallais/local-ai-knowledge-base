---
title: "RTCVideoSourceStats: framesPerSecond property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcvideosourcestats/framespersecond/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCVideoSourceStats: framesPerSecond property

The **`framesPerSecond`** property of the `RTCVideoSourceStats` dictionary indicates the number of frames originating from this video source in the last second.

The property is not defined on the stats object for the first second of its lifetime.

## Value

A number indicating the frames originating from this source in the last second.

## Examples

This example shows how you might iterate the stats object returned from `RTCRtpSender.getStats()` to get the video source stats, and then extract the `framesPerSecond`.

```js
// where sender is an RTCRtpSender
const stats = await sender.getStats();
let videoSourceStats = null;

for (const report of stats.values()) {
  if (report.type === "media-source" && report.kind === "video") {
    videoSourceStats = report;
    break;
  }
}

// Note, test is conditional in case the stats object
// does not include video source stats
const fps = videoSourceStats?.framesPerSecond;
```
