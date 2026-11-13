---
title: "targetX"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/svg/reference/attribute/targetx/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
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
