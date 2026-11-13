---
title: "targetX"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/svg/reference/attribute/targetx/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# targetX

The **`targetX`** attribute determines the positioning in horizontal direction of the convolution matrix relative to a given target pixel in the input image. The leftmost column of the matrix is column number zero. The value must be such that: `0` <= `targetX` < `x` of `order`.

You can use this attribute with the following SVG elements:

- `<feConvolveMatrix>`

## Usage notes

       | Value
       | `integer`

       | Default value
       | <code>floor(`x` of `order` / 2)</code>

       | Animatable
       | Yes

- `<integer>`
    This value indicates the positioning in horizontal direction of the convolution matrix relative to a given target pixel in the input image.

## See also

- `targetY`
