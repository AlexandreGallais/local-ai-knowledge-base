---
title: "VideoColorSpace: primaries property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/videocolorspace/primaries/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# VideoColorSpace: primaries property

The **`primaries`** read-only property of the `VideoColorSpace` interface returns the color gamut of the video.

## Value

A string containing one of the following values:

- `"bt709"`
    Color primaries used by BT.709 and sRGB.
- `"bt470bg"`
    Color primaries used by BT.601 PAL.
- `"smpte170m"`
    Color primaries used by BT.601 NTSC.
- `"bt2020"`
    Color primaries used by BT.2020 and BT.2100.

## Examples

In the following example, `colorSpace` is a `VideoColorSpace` object returned from `VideoFrame`. The value of `primaries` is printed to the console.

```js
let colorSpace = VideoFrame.colorSpace;
console.log(colorSpace.primaries);
```
