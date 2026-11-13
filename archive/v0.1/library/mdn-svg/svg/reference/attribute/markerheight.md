---
title: "markerHeight"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/svg/reference/attribute/markerheight/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# markerHeight

The **`markerHeight`** attribute represents the height of the viewport into which the `<marker>` is to be fitted when it is rendered according to the `viewBox` and `preserveAspectRatio` attributes.

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
    This value defines either an absolute or a relative height of the marker.
    Relative values refer to the height specified via the `viewBox` and `preserveAspectRatio` attributes.
- `<number>`
    This value defines the height of the marker in the units defined by the `markerUnits` attribute.

A value of zero disables rendering of the element and negative values are an error.

## See also

- `<marker>`
- `markerWidth`
- `markerUnits`
- `viewBox`
- `preserveAspectRatio`
