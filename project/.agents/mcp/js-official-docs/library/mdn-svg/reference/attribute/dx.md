---
title: "dx"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/svg/reference/attribute/dx/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# dx

The **`dx`** attribute indicates a shift along the x-axis on the position of an element or its content.

You can use this attribute with the following SVG elements:

- `<feDropShadow>`
- `<feOffset>`
- `<text>`
- `<tspan>`

## feDropShadow

For `<feDropShadow>`, `dx` defines the x offset of the dropped shadow. The unit used to resolve the value of the attribute is set by the `primitiveUnits` attribute of the `<filter>` element.

       | Value
       |
        &#x3C;number>

       | Default value
       | `2`

       | Animatable
       | Yes

## feOffset

For `<feOffset>`, `dx` defines the x offset of the filter input graphic. The unit used to resolve the value of the attribute is set by the `primitiveUnits` attribute of the `<filter>` element.

       | Value
       |
        &#x3C;number>

       | Default value
       | `0`

       | Animatable
       | Yes

## text

For `<text>`, if it contains a single value, `dx` defines a shift along the x-axis for all glyphs.

If there are multiple values, `dx` defines a shift along the x-axis for each individual glyph relative to the preceding glyph. If there are fewer values than glyphs, the remaining glyphs use a value of `0`. If there are more values than glyphs, extra values are ignored.

       | Value
       |
        List of (&#x3C;length>
        |
        &#x3C;percentage>)

       | Default value
       | none

       | Animatable
       | Yes

## tspan

For `<tspan>`, if it contains a single value, `dx` defines a shift along the x-axis for all alternate glyph.

If there are multiple values, `dx` defines a shift along the x-axis for each individual glyph relative to the preceding glyph. If there are fewer values than glyphs, the remaining glyphs use a value of `0`. If there are more values than glyphs, extra values are ignored.

       | Value
       |
        List of (&#x3C;length>
        |
        &#x3C;percentage>)

       | Default value
       | none

       | Animatable
       | Yes

## Examples

### Shifting text

```css
html,
body,
svg {
  height: 100%;
}
```

```html
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <!-- Lines materialized the position of the glyphs -->
  <line x1="0" x2="100%" y1="50%" y2="50%" />
  <line x1="10%" x2="10%" y1="0" y2="100%" />
  <line x1="60%" x2="60%" y1="0" y2="100%" />

  <!-- Some reference text -->
  <text x="10%" y="50%" fill="grey">SVG</text>

  <!-- The same text with a shift along the x-axis -->
  <text dx="50%" x="10%" y="50%">SVG</text>
</svg>
```

```css
line {
  stroke: red;
  stroke-width: 0.5px;
  stroke-dasharray: 3px;
}
```

### Multiple values

```css
html,
body,
svg {
  height: 100%;
}
```

```html
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <!-- Lines materialized the position of the glyphs -->
  <line x1="0" x2="100%" y1="25%" y2="25%" />
  <line x1="0" x2="100%" y1="50%" y2="50%" />
  <line x1="0" x2="100%" y1="75%" y2="75%" />

  <line x1="10%" x2="10%" y1="0" y2="100%" />
  <line x1="30%" x2="30%" y1="0" y2="100%" />
  <line x1="60%" x2="60%" y1="0" y2="100%" />

  <!-- Behaviors change based on the number
       of values in the attributes -->
  <text dx="20%" x="10%" y="25%">SVG</text>
  <text dx="0 10%" x="10%" y="50%">SVG</text>
  <text dx="0 10% 20%" x="10%" y="75%">SVG</text>
</svg>
```

```css
line {
  stroke: red;
  stroke-width: 0.5px;
  stroke-dasharray: 3px;
}
```
