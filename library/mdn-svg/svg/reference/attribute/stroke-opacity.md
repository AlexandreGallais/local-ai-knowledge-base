---
title: "stroke-opacity"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/svg/reference/attribute/stroke-opacity/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# stroke-opacity

The **`stroke-opacity`** attribute is a presentation attribute defining the opacity of the paint server (_color_, _gradient_, _pattern_, etc.) applied to the stroke of a shape.

> **Note:**
> As a presentation attribute, `stroke-opacity` also has a CSS property counterpart: `stroke-opacity`. When both are specified, the CSS property takes priority.

You can use this attribute with the following SVG elements:

- `<circle>`
- `<ellipse>`
- ``
- `<line>`
- `<polygon>`
- `<polyline>`
- `<rect>`
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
<svg viewBox="0 0 40 10" xmlns="http://www.w3.org/2000/svg">
  <!-- Default stroke opacity: 1 -->
  <circle cx="5" cy="5" r="4" stroke="green" />

  <!-- Stroke opacity as a number -->
  <circle cx="15" cy="5" r="4" stroke="green" stroke-opacity="0.7" />

  <!-- Stroke opacity as a percentage -->
  <circle cx="25" cy="5" r="4" stroke="green" stroke-opacity="50%" />

  <!-- Stroke opacity as a CSS property -->
  <circle cx="35" cy="5" r="4" stroke="green" style="stroke-opacity: .3;" />
</svg>
```

## Usage notes

       | Value
       |
        `[0-1]` |
        &#x3C;percentage>

       | Default value
       | `1`

       | Animatable
       | Yes

It's important to know that the stroke partially covers the fill of a shape, so a stroke with an opacity different than `1` will partially show the fill underneath. To avoid this effect, it is possible to apply a global opacity with the `opacity` attribute or to put the stroke behind the fill with the `paint-order` attribute.

## See also

- CSS `stroke-opacity` property
