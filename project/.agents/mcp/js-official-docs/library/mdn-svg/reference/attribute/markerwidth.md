---
title: "markerWidth"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/svg/reference/attribute/markerwidth/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# markerWidth

The **`markerWidth`** attribute represents the width of the viewport into which the `<marker>` is to be fitted when it is rendered according to the `viewBox` and `preserveAspectRatio` attributes.

You can use this attribute with the following SVG elements:

- `<marker>`

## Usage notes

       | Value
       |
        `length-percentage` |
        `number`

       | Default value
       | `3`

       | Animatable
       | Yes

- `<length-percentage>`
    This value defines either an absolute or a relative width of the marker.
    Relative values refer to the width specified via the `viewBox` and `preserveAspectRatio` attributes.
- `<number>`
    This value defines the width of the marker in the units defined by the `markerUnits` attribute.

A value of zero disables rendering of the element and negative values are an error.

## See also

- `<marker>`
- `markerHeight`
- `markerUnits`
- `viewBox`
- `preserveAspectRatio`
