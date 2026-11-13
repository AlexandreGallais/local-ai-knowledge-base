---
title: "font-family"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/svg/reference/attribute/font-family/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# font-family

The **`font-family`** attribute indicates which font family will be used to render the text, specified as a prioritized list of font family names and/or generic family names.

> **Note:**
> As a presentation attribute, `font-family` also has a CSS property counterpart: `font-family`. When both are specified, the CSS property takes priority.

You can use this attribute with the following SVG elements:

- `<text>`
- `<textPath>`
- `<tspan>`

## Examples

### Controlling SVG font family

```html
<svg viewBox="0 0 200 30" xmlns="http://www.w3.org/2000/svg">
  <text y="20" font-family="Arial, Helvetica, sans-serif">Sans serif</text>
  <text x="100" y="20" font-family="monospace">Monospace</text>
</svg>
```

## Usage notes

       | Value
       | See `font-family`

       | Default value
       | Depends on user agent

       | Animatable
       | Yes

For a description of the values, please refer to the CSS `font-family` property.

## See also

- CSS `font-family` property
