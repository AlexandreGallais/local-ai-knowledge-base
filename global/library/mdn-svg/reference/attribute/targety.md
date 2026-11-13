---
title: "targetY"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/svg/reference/attribute/targety/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# targetY

The **`targetY`** attribute determines the positioning in vertical direction of the convolution matrix relative to a given target pixel in the input image. The topmost row of the matrix is row number zero. The value must be such that: `0` <= `targetY` < `y` of `order`.

You can use this attribute with the following SVG elements:

- `<feConvolveMatrix>`

## Usage notes

       | Value
       | `integer`

       | Default value
       | <code>floor(`y` of `order` / 2)</code>

       | Animatable
       | Yes

- `<integer>`
    This value indicates the positioning in vertical direction of the convolution matrix relative to a given target pixel in the input image.

## See also

- `targetX`
