---
title: "stop-opacity"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/svg/reference/attribute/stop-opacity/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# stop-opacity

The **`stop-opacity`** attribute defines the opacity of a given color gradient stop.

The opacity value used for the gradient calculation is the product of the value of `stop-opacity` and the opacity of the value of the `stop-color` attribute. For `stop-color` values that don't include explicit opacity information, the opacity is treated as `1`.

> **Note:**
> As a presentation attribute, `stop-opacity` also has a CSS property counterpart: `stop-opacity`. When both are specified, the CSS property takes priority.

You can use this attribute with the following SVG elements:

- `<stop>`

## Usage notes

       | Value
       |
        <code
          >&#x3C;opacity-value></code
        >

       | Default value
       | `1`

       | Animatable
       | Yes

- `<opacity-value>`
    This value is either a `number` between `0` and `1` or a `percentage` value specifying the opacity of the color gradient stop.

## See also

- CSS `stop-opacity` property
- `stop-color`
- `opacity`
- `fill-opacity`
- `stroke-opacity`
