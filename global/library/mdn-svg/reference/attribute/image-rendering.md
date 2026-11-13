---
title: "image-rendering"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/svg/reference/attribute/image-rendering/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# image-rendering

The **`image-rendering`** attribute provides a hint to the browser about how to make speed vs. quality tradeoffs as it performs image processing.

The resampling is always done in a true color (e.g., 24-bit) color space even if the original data and/or the target device is indexed color.

> **Note:**
> As a presentation attribute, `image-rendering` also has a CSS property counterpart: `image-rendering`. When both are specified, the CSS property takes priority.

You can use this attribute with the following SVG elements:

- `<image>`

## Usage notes

       | Value
       |
        `auto` | `optimizeSpeed` |
        `optimizeQuality`

       | Default value
       | `auto`

       | Animatable
       | Yes

- `auto`
    Indicates that the user agent shall make appropriate tradeoffs to balance speed and quality, but quality shall be given more importance than speed.
- `optimizeSpeed`
    Indicates that the user agent shall emphasize rendering speed over quality.
- `optimizeQuality`
    Indicates that the user agent shall emphasize quality over rendering speed.

## See also

- CSS `image-rendering` property
