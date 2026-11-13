---
title: "fill-opacity"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/svg/reference/attribute/fill-opacity/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# fill-opacity

The **`fill-opacity`** attribute is a presentation attribute defining the opacity of the paint server (_color_, _gradient_, _pattern_, etc.) applied to a shape.

> **Note:**
> As a presentation attribute, `fill-opacity` also has a CSS property counterpart: `fill-opacity`. When both are specified, the CSS property takes priority.

You can use this attribute with the following SVG elements:

- `<circle>`
- `<ellipse>`
- ``
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
<svg viewBox="0 0 400 100" xmlns="http://www.w3.org/2000/svg">
  <!-- Default fill opacity: 1 -->
  <circle cx="50" cy="50" r="40" />

  <!-- Fill opacity as a number -->
  <circle cx="150" cy="50" r="40" fill-opacity="0.7" />

  <!-- Fill opacity as a percentage -->
  <circle cx="250" cy="50" r="40" fill-opacity="50%" />

  <!-- Fill opacity as a CSS property -->
  <circle cx="350" cy="50" r="40" style="fill-opacity: .25;" />
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

> **Note:**
> SVG2 introduces percentage values for `fill-opacity`, however, it is not widely supported yet (_See Browser compatibility below_) as a consequence, it is best practices to set opacity with a value in the range `[0-1]`.

## See also

- CSS `fill-opacity` property
- `opacity`
- `stop-opacity`
- `stroke-opacity`
