---
title: "refX"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/svg/reference/attribute/refx/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# refX

The **`refX`** attribute defines the x coordinate of an element's reference point.

You can use this attribute with the following SVG elements:

- `<marker>`
- `<symbol>`

## marker

For `<marker>`, `refX` defines the x coordinate of the marker's reference point, which is to be placed exactly at the marker's position on the shape.

       | Value
       |
        `length-percentage` |
        `number` | `left` | `center` |
        `right`

       | Default value
       | `0`

       | Animatable
       | Yes

- `<length-percentage>`
    Lengths are interpreted as being in the coordinate system of the marker contents, after application of the `viewBox` and `preserveAspectRatio` attributes.

    Percentage values are interpreted as being a percentage of the `viewBox` width.

- `<number>`
    Numbers are interpreted as being in the coordinate system of the marker contents, after application of the `viewBox` and `preserveAspectRatio` attributes.
- `left`
    The reference point of the marker is placed at the left edge of the shape.
- `center`
    The reference point of the marker is placed at the horizontal center of the shape.
- `right`
    The reference point of the marker is placed at the right edge of the shape.

## symbol

For `<symbol>`, `refX` defines the x coordinate of the symbol, which is defined by the cumulative effect of the `x` attribute and any transformations on the `<symbol>` and its host `<use>` element.

Unlike other positioning attributes, `refX` is interpreted as being in the coordinate system of the symbol contents, after application of the `viewBox` and `preserveAspectRatio` attributes. If the attribute is not specified, no horizontal adjustment is made, and the left side of the symbol's rectangular viewport region (regardless of the `viewBox` coordinate) is positioned at the x coordinate.

> **Note:**
> For backwards compatibility, the behavior when `refX` is not specified on a `<symbol>` element is different from when it is specified with a value of `0`, and therefore different from the behavior when an equivalent attribute is not specified on a `<marker>` element.

       | Value
       |
        `length` | `left` | `center` |
        `right`

       | Default value
       | None

       | Animatable
       | Yes

- `<length-percentage>`
    Lengths are interpreted as being in the coordinate system of the marker contents, after application of the `viewBox` and `preserveAspectRatio` attributes.

    Percentage values are interpreted as being a percentage of the `viewBox` width.

- `<number>`
    Numbers are interpreted as being in the coordinate system of the marker contents, after application of the `viewBox` and `preserveAspectRatio` attributes.
- `left`
    The reference point of the marker is placed at the left edge of the shape.
- `center`
    The reference point of the marker is placed at the horizontal center of the shape.
- `right`
    The reference point of the marker is placed at the right edge of the shape.

## See also

- `refY`
