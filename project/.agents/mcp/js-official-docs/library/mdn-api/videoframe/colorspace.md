---
title: "VideoFrame: colorSpace property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/videoframe/colorspace/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# VideoFrame: colorSpace property

The **`colorSpace`** property of the `VideoFrame` interface returns a `VideoColorSpace` object representing the color space of the video.

## Value

A `VideoColorSpace` object.

## Examples

The following example prints the `colorSpace` to the console.

```js
const cnv = document.createElement("canvas");
// draw something on the canvas
// …
const videoFrame = new VideoFrame(cnv, { timestamp: 0 });
console.log(videoFrame.colorSpace);
```
