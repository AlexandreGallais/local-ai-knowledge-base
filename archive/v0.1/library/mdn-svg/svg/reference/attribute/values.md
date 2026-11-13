---
title: "values"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/svg/reference/attribute/values/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# values

The `values` attribute has different meanings, depending upon the context where it's used, either it defines a sequence of values used over the course of an animation, or it's a list of numbers for a color matrix, which is interpreted differently depending on the type of color change to be performed.

You can use this attribute with the following SVG elements:

- `<animate>`
- `<animateMotion>`
- `<animateTransform>`
- `<feColorMatrix>`

## animate, animateMotion, animateTransform

For `<animate>`, `<animateMotion>`, and `<animateTransform>`, `values` is a list of values defining the sequence of values over the course of the animation. If this attribute is specified, any `from`, `to`, and `by` attribute values set on the element are ignored.

       | Value
       |
        <code
          >&#x3C;list-of-values></code
        >

       | Default value
       | None

       | Animatable
       | No

- `<list-of-values>`
    The value holds a semicolon-separated list of one or more values. The type of the values is defined by the `href` and `attributeName` attributes.

## feColorMatrix

For the `<feColorMatrix>` element, `values` is a list of numbers interpreted differently depending on the value of the `type` attribute.

       | Value
       |
        <code
          >&#x3C;list-of-numbers></code
        >

       | Default value
       |
        If `type="matrix"`, identity matrix,if
          `type="saturate"`, `1`, resulting in identity
          matrix,if `type="hueRotate"`, `0`,
          resulting in identity matrix

       | Animatable
       | Yes

- `<list-of-numbers>`
    The value is a list of numbers, which is interpreted differently depending on the value of the `type` attribute:
    - For `type="matrix"`, `values` is a list of 20 matrix values (a00 a01 a02 a03 a04 a10 a11 … a34), separated by whitespace and/or a comma.
    - For `type="saturate"`, `values` is a single real number value (0 to 1).
    - For `type="hueRotate"`, `values` is a single one real number value (degrees).
    - For `type="luminanceToAlpha"`, `values` is not applicable.
