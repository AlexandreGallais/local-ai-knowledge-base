---
title: "additive"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/svg/reference/attribute/additive/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# additive

The **`additive`** attribute controls whether or not an animation is additive.

It is frequently useful to define animation as an offset or delta to an attribute's value, rather than as absolute values.

You can use this attribute with the following SVG elements:

- `<animate>`
- `<animateMotion>`
- `<animateTransform>`

## Usage notes

       | Value
       | `replace` | `sum`

       | Default value
       | `replace`

       | Animatable
       | No

- sum
    Specifies that the animation will add to the underlying value of the attribute and other lower priority animations.
- replace
    Specifies that the animation will override the underlying value of the attribute and other lower priority animations. This is the default, however the behavior is also affected by the animation value attributes `by` and `to`, as described in SMIL Animation: How from, to and by attributes affect additive behavior.

## See also

- SVG animation with SMIL
