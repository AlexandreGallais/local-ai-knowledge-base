---
title: "RTCVideoSourceStats: width property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcvideosourcestats/width/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCVideoSourceStats: width property

The **`width`** property of the `RTCVideoSourceStats` dictionary indicates the width, in pixels, of the last frame originating from this source.

This property is not defined on the stats object until after the first frame has been produced.

## Value

A positive number indicating the width, in pixels.

## Examples

This example shows how you might iterate the stats object returned from `RTCRtpSender.getStats()` to get the video source stats, and then extract the `width`.

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
const height = videoSourceStats?.width;
```
