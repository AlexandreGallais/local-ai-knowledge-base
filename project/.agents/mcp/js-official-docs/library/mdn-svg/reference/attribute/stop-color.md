---
title: "stop-color"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/svg/reference/attribute/stop-color/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# stop-color

The **`stop-color`** attribute indicates what color to use at a gradient stop.

> **Note:**
> With respect to gradients, SVG treats the `transparent` keyword differently than CSS. SVG does not calculate gradients in pre-multiplied space, so `transparent` really means transparent black. So, specifying a `stop-color` with the value `transparent` is equivalent to specifying a `stop-color` with the value `black` and a `stop-opacity` with the value `0`.

> **Note:**
> As a presentation attribute, `stop-color` also has a CSS property counterpart: `stop-color`. When both are specified, the CSS property takes priority.

You can use this attribute with the following SVG elements:

- `<stop>`

## Usage notes

       | Value
       |
        `<color>`

       | Default value
       | `black`

       | Animatable
       | Yes

- `<color>`
    This value indicates a color value.

## See also

- CSS `stop-color` property
- `stop-opacity`
