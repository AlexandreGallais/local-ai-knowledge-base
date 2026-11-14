---
title: "writing-mode"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/svg/reference/attribute/writing-mode/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# writing-mode

The **`writing-mode`** attribute specifies whether the initial inline-progression-direction for a `<text>` element shall be left-to-right, right-to-left, or top-to-bottom. The `writing-mode` attribute applies only to `<text>` elements; the attribute is ignored for `<tspan>` and `<textPath>` sub-elements. (Note that the inline-progression-direction can change within a `<text>` element due to the Unicode bidirectional algorithm and properties `direction` and `unicode-bidi`.)

> **Note:**
> As a presentation attribute, `writing-mode` also has a CSS property counterpart: `writing-mode`. When both are specified, the CSS property takes priority.

You can use this attribute with the following SVG elements:

- `<text>`
- `<textPath>`
- `<tspan>`

## Usage notes

       | Default value
       | `horizontal-tb`

       | Value
       |
        `horizontal-tb` | `vertical-rl` |
        `vertical-lr`

       | Animatable
       | Yes

- `horizontal-tb`
    This value defines a top-to-bottom block flow direction. Both the writing mode and the typographic mode are horizontal.
- `vertical-rl`
    This value defines a right-to-left block flow direction. Both the writing mode and the typographic mode are vertical.
- `vertical-lr`
    This value defines a left-to-right block flow direction. Both the writing mode and the typographic mode are vertical.

## See also

- CSS `writing-mode` property
