---
title: "`stop-color` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/stop-color/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `stop-color` CSS property

The **`stop-color`** CSS property defines the color to use for an SVG `<stop>` element within a gradient. If present, it overrides the element's `stop-color` attribute.

> **Note:**
> The `stop-color` property only applies to `<stop>` elements nested in an ``. It doesn't apply to other SVG, HTML, or pseudo-elements.

## Syntax

```css
/* <color> values */
stop-color: red;
stop-color: hsl(120deg 75% 25% / 60%);
stop-color: currentColor;

/* Global values */
stop-color: inherit;
stop-color: initial;
stop-color: revert;
stop-color: revert-layer;
stop-color: unset;
```

### Values

- `<color>`
    The color of the fill. This can be any valid CSS `<color>` value.

## Examples

### Defining the color stops of SVG gradients

This example demonstrates the basic use case of `stop-color`, and how the CSS `stop-color` property takes precedence over the `stop-color` attribute.

#### HTML

We have an SVG with three `<rect>` squares and three `<linearGradient>` elements. Each gradient has four `<stop>` elements creating gradients that go from black to white and then white to gray; the only difference between them is the `id` value.

```html
<svg viewBox="0 0 264 100" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="myGradient1">
      <stop offset="25%" stop-color="black" />
      <stop offset="40%" stop-color="white" />
      <stop offset="60%" stop-color="white" />
      <stop offset="75%" stop-color="#333333" />
    </linearGradient>
    <linearGradient id="myGradient2">
      <stop offset="25%" stop-color="black" />
      <stop offset="40%" stop-color="white" />
      <stop offset="60%" stop-color="white" />
      <stop offset="75%" stop-color="#333333" />
    </linearGradient>
    <linearGradient id="myGradient3">
      <stop offset="25%" stop-color="black" />
      <stop offset="40%" stop-color="white" />
      <stop offset="60%" stop-color="white" />
      <stop offset="75%" stop-color="#333333" />
    </linearGradient>
  </defs>
  <rect x="2" y="10" width="80" height="80" fill="url('#myGradient1')" />
  <rect x="92" y="10" width="80" height="80" fill="url('#myGradient2')" />
  <rect x="182" y="10" width="80" height="80" fill="url('#myGradient3')" />
</svg>
```

#### CSS

We include a `stroke` and `stroke-width` outlining the rectangle. We define the colors of the first and last stops in each gradient, overriding their `stop-color` attribute values, using the `stop-color` property. Various CSS `<color>` syntaxes are shown.

```css
svg {
  border: 1px solid;
  height: calc(100vh - 20px);
  margin-bottom: 10px;
}
```

```css
rect {
  stroke: #333333;
  stroke-width: 1px;
}

#myGradient1 {
  stop:first-of-type {
    stop-color: #66ccff;
  }
  stop:last-of-type {
    stop-color: #f4aab9;
  }
}
#myGradient2 {
  stop:first-of-type {
    stop-color: yellow;
  }
  stop:last-of-type {
    stop-color: purple;
  }
}
#myGradient3 {
  stop:first-of-type {
    stop-color: hsl(0deg 90% 50%);
  }
  stop:last-of-type {
    stop-color: hsl(20deg 60% 50%);
  }
}
```

#### Results

## See also

- SVG `stop-color` attribute
- Presentation properties: `stop-color`, `clip-rule`, `color-interpolation-filters`, `fill-opacity`, `fill-rule`, `fill`, `marker-end`, `marker-mid`, `marker-start`, `shape-rendering`, `stop-opacity`, `stroke`, `stroke-dasharray`, `stroke-dashoffset`, `stroke-linecap`, `stroke-linejoin`, `stroke-miterlimit`, `stroke-opacity`, `stroke-width`, `text-anchor`, and `vector-effect`
- `opacity`
- `background-color`
- `<color>`
- `basic-shape` data type
