---
title: "viewBox"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/svg/reference/attribute/viewbox/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# viewBox

The **`viewBox`** attribute defines the position and dimension, in user space, of an SVG viewport.

The value of the `viewBox` attribute is a list of four numbers separated by whitespace and/or a comma: `min-x`, `min-y`, `width`, and `height`. `min-x` and `min-y` represent the smallest X and Y coordinates that the `viewBox` may have (the origin coordinates of the `viewBox`) and the `width` and `height` specify the `viewBox` size. The resulting `viewBox` is a rectangle in user space mapped to the bounds of the viewport of an SVG element (not the browser viewport).
When an SVG contains a `viewBox` attribute (often in combination with a `preserveAspectRatio` attribute), a transform stretches or resizes the SVG viewport to fit a particular container element.

## Elements

You can use this attribute with the SVG elements described in the sections below.

### `<marker>`

For `<marker>`, `viewBox` defines the position and dimension for the content of the `<marker>` element.

       | Value
       |
        &#x3C;number>,?
        &#x3C;number>,?
        &#x3C;number>,?
        &#x3C;number>

       | Default value
       | none

       | Animatable
       | Yes

### `<pattern>`

For `<pattern>`, `viewBox` defines the position and dimension for the content of the pattern tile.

       | Value
       |
        &#x3C;number>,?
        &#x3C;number>,?
        &#x3C;number>,?
        &#x3C;number>

       | Default value
       | none

       | Animatable
       | Yes

### ``

For ``, `viewBox` defines the position and dimension for the content of the `` element.

       | Value
       |
        &#x3C;number>,?
        &#x3C;number>,?
        &#x3C;number>,?
        &#x3C;number>

       | Default value
       | none

       | Animatable
       | Yes

### `<symbol>`

For `<symbol>`, `viewBox` defines the position and dimension for the content of the `<symbol>` element.

       | Value
       |
        &#x3C;number>,?
        &#x3C;number>,?
        &#x3C;number>,?
        &#x3C;number>

       | Default value
       | none

       | Animatable
       | Yes

### `<view>`

For `<view>`, `viewBox` defines the position and dimension for the content of the `<view>` element.

       | Value
       |
        &#x3C;number>,?
        &#x3C;number>,?
        &#x3C;number>,?
        &#x3C;number>

       | Default value
       | none

       | Animatable
       | Yes

## Examples

```css
html,
body,
svg {
  height: 100%;
  vertical-align: top;
}
svg:not(:root) {
  display: inline-block;
}
```

The code snippet below includes three ``s with different `viewBox` attribute values and identical `<rect>` and `<circle>` descendants creating very different results. The size of `<rect>` is defined using relative units, so the visual size of the square produced looks unchanged regardless of the `viewBox` value. The radius length `r` attribute of the `<circle>` is the same in each case, but this user unit value is resolved against the size defined in the `viewBox`, producing different results in each case.

```html
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="0" width="100%" height="100%" />
  <circle cx="50%" cy="50%" r="4" fill="white" />
</svg>

<svg viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="0" width="100%" height="100%" />
  <circle cx="50%" cy="50%" r="4" fill="white" />
</svg>

<svg viewBox="-5 -5 10 10" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="0" width="100%" height="100%" />
  <circle cx="50%" cy="50%" r="4" fill="white" />
</svg>
```

The user units of `r="4"` are resolved against the `viewBox` sizes, creating dramatically different circle sizes. The exact effect of the `viewBox` attribute is influenced by the `preserveAspectRatio` attribute.

> **Note:**
> Values for `width` or `height` lower or equal to `0` disable rendering of the element.
