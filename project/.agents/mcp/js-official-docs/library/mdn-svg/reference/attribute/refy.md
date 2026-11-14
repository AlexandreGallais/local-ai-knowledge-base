---
title: "refY"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/svg/reference/attribute/refy/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# refY

The **`refY`** attribute defines the y coordinate of an element's reference point.

You can use this attribute with the following SVG elements:

- `<marker>`
- `<symbol>`

## marker

For `<marker>`, `refY` defines the y coordinate of the marker's reference point, which is to be placed exactly at the marker's position on the shape.

       | Value
       |
        `length-percentage` |
        `number` | `top` | `center` |
        `bottom`

       | Default value
       | `0`

       | Animatable
       | Yes

- `<length-percentage>`
    Lengths are interpreted as being in the coordinate system of the marker contents, after application of the `viewBox` and `preserveAspectRatio` attributes.

    Percentage values are interpreted as being a percentage of the `viewBox` height.

- `<number>`
    Numbers are interpreted as being in the coordinate system of the marker contents, after application of the `viewBox` and `preserveAspectRatio` attributes.
- `top`
    The reference point of the marker is placed at the top edge of the shape.
- `center`
    The reference point of the marker is placed at the vertical center of the shape.
- `bottom`
    The reference point of the marker is placed at the bottom edge of the shape.

## symbol

For `<symbol>`, `refY` defines the y coordinate of the symbol, which is defined by the cumulative effect of the `y` attribute and any transformations on the `<symbol>` and its host `<use>` element.

Unlike other positioning attributes, `refY` is interpreted as being in the coordinate system of the symbol contents, after application of the `viewBox` and `preserveAspectRatio` attributes. If the attribute is not specified, no vertical adjustment is made, and the top side of the symbol's rectangular viewport region (regardless of the `viewBox` coordinate) is positioned at the y coordinate.

> **Note:**
> For backwards compatibility, the behavior when `refY` is not specified on a `<symbol>` element is different from when it is specified with a value of `0`, and therefore different from the behavior when an equivalent attribute is not specified on a `<marker>` element.

       | Value
       |
        `length` | `top` | `center` |
        `bottom`

       | Default value
       | None

       | Animatable
       | Yes

- `<length-percentage>`
    Lengths are interpreted as being in the coordinate system of the marker contents, after application of the `viewBox` and `preserveAspectRatio` attributes.

    Percentage values are interpreted as being a percentage of the `viewBox` height.

- `<number>`
    Numbers are interpreted as being in the coordinate system of the marker contents, after application of the `viewBox` and `preserveAspectRatio` attributes.
- `top`
    The reference point of the marker is placed at the top edge of the shape.
- `center`
    The reference point of the marker is placed at the vertical center of the shape.
- `bottom`
    The reference point of the marker is placed at the bottom edge of the shape.

## See also

- `refX`
