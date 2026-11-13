---
title: "VideoColorSpace: matrix property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/videocolorspace/matrix/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# VideoColorSpace: matrix property

The **`matrix`** read-only property of the `VideoColorSpace` interface returns the matrix coefficient of the video. Matrix coefficients describe the relationship between sample component values and color coordinates.

## Value

A string containing one of the following values:

- `"rgb"`
    Matrix coefficients used by sRGB.
- `"bt709"`
    Matrix coefficients used by BT.709.
- `"bt470bg"`
    Matrix coefficients used by BT.601 PAL.
- `"smpte170m"`
    Matrix coefficients used by BT.601 NTSC.
- `"bt2020-ncl"`
    Matrix coefficients used by BT.2020 NCL.

## Examples

In the following example, `colorSpace` is a `VideoColorSpace` object returned from `VideoFrame`. The value of `matrix` is printed to the console.

```js
let colorSpace = VideoFrame.colorSpace;
console.log(colorSpace.matrix);
```
