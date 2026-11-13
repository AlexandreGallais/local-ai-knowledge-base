---
title: "`transform-box` CSS property"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/css/reference/properties/transform-box/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# `transform-box` CSS property

The **`transform-box`** CSS property defines the layout box to which the `transform`, individual transform properties `translate`, `scale`, and `rotate`, and `transform-origin` properties relate.

## Syntax

```css
/* Keyword values */
transform-box: content-box;
transform-box: border-box;
transform-box: fill-box;
transform-box: stroke-box;
transform-box: view-box;

/* Global values */
transform-box: inherit;
transform-box: initial;
transform-box: revert;
transform-box: revert-layer;
transform-box: unset;
```

The `transform-box` property is specified as one of the keyword values listed below.

### Values

- `content-box`
    The content box is used as the reference box. The reference box of a `` is the border box of its table wrapper box, not its table box.
- `border-box`
    The border box is used as the reference box. The reference box of a `` is the border box of its table wrapper box, not its table box.
- `fill-box`
    The object bounding box is used as the reference box. For elements with associated CSS layout box, acts as `content-box`.
- `stroke-box`
    The stroke bounding box is used as the reference box. For elements with associated CSS layout box, acts as `border-box`.
- `view-box`
    The nearest SVG viewport is used as the reference box. If a `viewBox` attribute is specified for the SVG viewport creating element, the reference box is positioned at the origin of the coordinate system established by the `viewBox` attribute, and the dimension of the reference box is set to the width and height values of the `viewBox` attribute. For elements with associated CSS layout box, acts as `border-box`.

## Examples

### SVG transform-origin scoping

In this example we have an SVG:

```html
<svg id="svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
  <g>
    <circle id="center" fill="red" r="1" transform="translate(25 25)" />
    <circle id="boxcenter" fill="blue" r=".5" transform="translate(15 15)" />
    <rect
      id="box"
      x="10"
      y="10"
      width="10"
      height="10"
      rx="1"
      ry="1"
      stroke="black"
      fill="none" />
  </g>
</svg>
```

In the CSS we have an animation that uses a transform to rotate the rectangle infinitely. `transform-box: fill-box` is used to make the `transform-origin` the center of the bounding box, so the rectangle spins in place. Without it, the transform origin is the center of the SVG canvas, and so you get a very different effect.

```css
svg {
  width: 80vh;
  border: 1px solid #d9d9d9;
  position: absolute;
  margin: auto;
  inset: 0;
}

#box {
  transform-origin: 50% 50%; /* anything other than `0 0` to see the effect */
  transform-box: fill-box;
  animation: rotate-box 3s linear infinite;
}

@keyframes rotate-box {
  to {
    transform: rotate(360deg);
  }
}
```

## See also

- Using CSS transforms
- `transform`, `transform-origin`
- Individual transform properties:
  - `translate`
  - `scale`
  - `rotate`
