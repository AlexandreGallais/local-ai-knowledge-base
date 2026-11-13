---
title: "font-weight"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/svg/reference/attribute/font-weight/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# font-weight

The **`font-weight`** attribute refers to the boldness or lightness of the glyphs used to render the text, relative to other fonts in the same font family.

> **Note:**
> As a presentation attribute, `font-weight` also has a CSS property counterpart: `font-weight`. When both are specified, the CSS property takes priority.

You can use this attribute with the following SVG elements:

- `<text>`
- `<textPath>`
- `<tspan>`

## Examples

### Controlling SVG font weight

```html
<svg viewBox="0 0 200 30" xmlns="http://www.w3.org/2000/svg">
  <text y="20" font-weight="normal">Normal text</text>
  <text x="100" y="20" font-weight="bold">Bold text</text>
</svg>
```

## Usage notes

       | Value
       |
        `normal` | `bold` | `bolder` |
        `lighter` | `number`

       | Default value
       | `normal`

       | Animatable
       | Yes

For a description of the values, please refer to the CSS `font-weight` property.

## See also

- CSS `font-weight` property
