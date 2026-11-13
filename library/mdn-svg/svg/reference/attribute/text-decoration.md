---
title: "text-decoration"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/svg/reference/attribute/text-decoration/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# text-decoration

The **`text-decoration`** attribute defines whether text is decorated with an underline, overline and/or strike-through. It is a shorthand for the `text-decoration-line` and `text-decoration-style` properties.

The fill and stroke of the text decoration are given by the fill and stroke of the text at the point where the text decoration is declared.

The paint order of the text decoration, i.e., the fill and stroke, is determined by the value of the `paint-order` attribute at the point where the text decoration is declared.

> **Note:**
> As a presentation attribute, `text-decoration` also has a CSS property counterpart: `text-decoration`. When both are specified, the CSS property takes priority.

You can use this attribute with the following SVG elements:

- `<text>`
- `<textPath>`
- `<tspan>`

## Example

```css
html,
body,
svg {
  height: 100%;
}
```

```html
<svg viewBox="0 0 250 50" xmlns="http://www.w3.org/2000/svg">
  <text y="20" text-decoration="underline">Underlined text</text>
  <text x="0" y="40" text-decoration="line-through">Struck-through text</text>
</svg>
```

## Usage notes

       | Value
       |
        <code
          >&#x3C;'text-decoration-line'></code
        >
        ||
        <code
          >&#x3C;'text-decoration-style'></code
        >
        ||
        <code
          >&#x3C;'text-decoration-color'></code
        >

       | Default value
       | See individual properties

       | Animatable
       | Yes

For a description of the values, please refer to the CSS `text-decoration` property.

## See also

- CSS `text-decoration` property
