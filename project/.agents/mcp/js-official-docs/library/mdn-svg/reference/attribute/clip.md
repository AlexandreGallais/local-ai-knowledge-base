---
title: "clip"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/svg/reference/attribute/clip/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# clip

The **`clip`** attribute defines the visible region of an element. You should use `clip-path` instead.

> **Note:**
> As a presentation attribute, `clip` also has a CSS property counterpart: `clip`. When both are specified, the CSS property takes priority.

This attribute has the same parameter values as defined for the CSS `clip` property. Unitless values, which indicate current user coordinates, are permitted on the coordinate values on the `rect()`. The value of `auto` defines a clipping path along the bounds of the viewport created by the given element.

You can use this attribute with the following SVG elements:

- ``
- `<symbol>`
- `<image>`
- `<foreignObject>`
- `<pattern>`
- `<marker>`

## Example

```css
html,
body,
svg {
  height: 100%;
}
```

```html
<svg viewBox="0 0 20 10" xmlns="http://www.w3.org/2000/svg">
  <!-- Auto clipping -->
  <svg x="0" width="10" height="10" clip="auto">
    <circle cx="5" cy="5" r="4" stroke="green" />
  </svg>

  <!-- Rect(top, right, bottom, left) clipping -->
  <svg x="10" width="10" height="10" clip="rect(1, 9, 8, 2)">
    <circle cx="5" cy="5" r="4" stroke="green" />
  </svg>
</svg>
```

## Usage notes

       | Value
       | `auto` | `rect()`

       | Default value
       | `auto`

       | Animatable
       | Yes

The value `auto` defines a clipping path along the bounds of the viewport created by the given element. The value `rect()` defines a clipping rectangle following the following syntax: `rect(<top>, <right>, <bottom>, <left>)`. The `<top>` and `<bottom>` values specify offsets from the _top border edge_ of the element viewport, while `<right>` and `<left>` specify offsets from the _left border edge_ of the element viewport.
