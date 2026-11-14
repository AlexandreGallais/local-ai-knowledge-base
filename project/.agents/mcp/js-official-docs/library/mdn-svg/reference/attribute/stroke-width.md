---
title: "stroke-width"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/svg/reference/attribute/stroke-width/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# stroke-width

The **`stroke-width`** attribute is a presentation attribute defining the width of the stroke to be applied to the shape. It applies to any SVG shape or text-content element, but as an inherited property, it may be applied to elements such as `` and still have the intended effect on descendant elements' strokes.

> **Note:**
> As a presentation attribute, `stroke-width` also has a CSS property counterpart: `stroke-width`. When both are specified, the CSS property takes priority.

You can use this attribute with the following SVG elements:

- `<circle>`
- `<ellipse>`
- `<line>`
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
<svg viewBox="0 0 30 10" xmlns="http://www.w3.org/2000/svg">
  <!-- Default stroke width: 1 -->
  <circle cx="5" cy="5" r="3" stroke="green" />

  <!-- Stroke width as a number -->
  <circle cx="15" cy="5" r="3" stroke="green" stroke-width="3" />

  <!-- Stroke width as a percentage -->
  <circle cx="25" cy="5" r="3" stroke="green" stroke-width="2%" />
</svg>
```

## Usage notes

       | Value
       |
        &#x3C;length> |
        &#x3C;percentage>

       | Default value
       | `1px`

       | Animatable
       | Yes

> **Note:**
> A percentage value is always computed as a percentage of the normalized `viewBox` diagonal length.

## See also

- CSS `stroke-width` property
