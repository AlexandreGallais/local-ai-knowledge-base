---
title: "calcMode"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/svg/reference/attribute/calcmode/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# calcMode

The **`calcMode`** attribute specifies the interpolation mode for the animation.

The default mode is `linear`, however if the attribute does not support linear interpolation (e.g., for strings), the `calcMode` attribute is ignored and discrete interpolation is used.

You can use this attribute with the following SVG elements:

- `<animate>`
- `<animateMotion>`
- `<animateTransform>`

## Usage notes

       | Value
       |
        `discrete` | `linear` | `paced` |
        `spline`

       | Default value
       | `linear`

       | Animatable
       | No

- `discrete`
    This specifies that the animation function will jump from one value to the next without any interpolation.
- `linear`
    Simple linear interpolation between values is used to calculate the animation function. Except for `<animateMotion>`, this is the default value.
- `paced`
    Defines interpolation to produce an even pace of change across the animation. This is only supported for values that define a linear numeric range, and for which some notion of "distance" between points can be calculated (e.g., position, width, height, etc.). If paced is specified, any `keyTimes` or `keySplines` will be ignored. For `<animateMotion>`, this is the default value.
- `spline`
    Interpolates from one value in the `values` list to the next according to a time function defined by a cubic Bézier spline. The points of the spline are defined in the `keyTimes` attribute, and the control points for each interval are defined in the `keySplines` attribute.

## See also

- SVG animation with SMIL
