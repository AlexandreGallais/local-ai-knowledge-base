---
title: "font-style"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/svg/reference/attribute/font-style/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# font-style

The **`font-style`** attribute specifies whether the text is to be rendered using a normal, italic, or oblique face.

> **Note:**
> As a presentation attribute, `font-style` also has a CSS property counterpart: `font-style`. When both are specified, the CSS property takes priority.

You can use this attribute with the following SVG elements:

- `<text>`
- `<textPath>`
- `<tspan>`

## Examples

### Controlling SVG font style

```html
<svg viewBox="0 0 250 30" xmlns="http://www.w3.org/2000/svg">
  <text y="20" font-style="normal">Normal font style</text>
  <text x="150" y="20" font-style="italic">Italic font style</text>
</svg>
```

## Usage notes

       | Value
       | `normal` | `italic` | `oblique`

       | Default value
       | `normal`

       | Animatable
       | Yes

For a description of the values, please refer to the CSS `font-style` property.

## See also

- CSS `font-style` property
