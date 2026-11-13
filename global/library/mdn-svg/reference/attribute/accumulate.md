---
title: "accumulate"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/svg/reference/attribute/accumulate/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# accumulate

The **`accumulate`** attribute controls whether or not an animation is cumulative.

It is frequently useful for repeated animations to build upon the previous results, accumulating with each iteration. This attribute said to the animation if the value is added to the previous animated attribute's value on each iteration.

You can use this attribute with the following SVG elements:

- `<animate>`
- `<animateMotion>`
- `<animateTransform>`

## Usage notes

       | Value
       | `none` | `sum`

       | Default value
       | `none`

       | Animatable
       | No

- `sum`
    Specifies that each repeat iteration after the first builds upon the last value of the previous iteration.
- `none`
    Specifies that repeat iterations are not cumulative.

This attribute is ignored if the target attribute value does not support addition, or if the animation element does not repeat.

This attribute will be ignored if the animation function is specified with only the `to` attribute.

## See also

- SVG animation with SMIL
