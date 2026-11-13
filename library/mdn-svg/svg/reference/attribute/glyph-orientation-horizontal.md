---
title: "glyph-orientation-horizontal"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/svg/reference/attribute/glyph-orientation-horizontal/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# glyph-orientation-horizontal

The **`glyph-orientation-horizontal`** attribute affects the amount that the current text position advances as each glyph is rendered.

When the reference orientation direction is horizontal and the `glyph-orientation-horizontal` results in an orientation angle that is a multiple of 180 degrees, then the current text position is incremented according to the horizontal metrics of the glyph. Otherwise, if the value of this attribute is not a multiple of 180 degrees, then the current text position is incremented according to the vertical metrics of the glyph.

This attribute is applied only to text written in a horizontal `writing-mode`.

> **Note:**
> As a presentation attribute, `glyph-orientation-horizontal` also has a CSS property counterpart: `glyph-orientation-horizontal`. When both are specified, the CSS property takes priority.

You can use this attribute with the following SVG elements:

- `<textPath>`
- `<text>`
- `<tspan>`

## Context notes

       | Value
       |
        <code
          >&#x3C;angle></code
        >

       | Default value
       | `0deg`

       | Animatable
       | No

- `<angle>`
    The value of the angle is restricted to 0, 90, 180, and 270 degrees. If another angle is specified, it is rounded to the closest of the permitted values.
    A value of `0deg` indicates that all glyphs are set with the top of the glyphs oriented towards the reference orientation. A value of `90deg` indicates an orientation of 90 degrees clockwise from the reference orientation.
