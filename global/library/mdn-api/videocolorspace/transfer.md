---
title: "VideoColorSpace: transfer property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/videocolorspace/transfer/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# VideoColorSpace: transfer property

The **`transfer`** read-only property of the `VideoColorSpace` interface returns the opto-electronic transfer characteristics of the video.

## Value

A string containing one of the following values:

- `"bt709"`
    Transfer characteristics used by BT.709.
- `"smpte170m"`
    Transfer characteristics used by BT.601 NTSC.
- `"iec61966-2-1"`
    Transfer characteristics used by sRGBA.
- `"linear"`
    Transfer characteristics used by linear RGB.
- `"pq"`
    Transfer characteristics used by BT.2100 PQ.
- `"hlg"`
    Transfer characteristics used by BT.2100 HLG.

## Examples

In the following example, `colorSpace` is a `VideoColorSpace` object returned from `VideoFrame`. The value of `transfer` is printed to the console.

```js
let colorSpace = VideoFrame.colorSpace;
console.log(colorSpace.transfer);
```
