---
title: "SVGAnimatedRect: baseVal property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svganimatedrect/baseval/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGAnimatedRect: baseVal property

The **`baseVal`** read-only property of the `SVGAnimatedRect` interface represents the current non-animated value of the `viewBox` attribute of an SVG element.

This property reflects the SVG element's `viewBox` attribute value as a read-only `DOMRect` object. It provides access to the static rectangle defined by the `viewBox` attribute, including the `x`, `y`, `width`, and `height` values.

## Value

A `DOMRect` object representing the current non-animated value of the `viewBox` attribute.

## Examples

```html
<svg viewBox="0 0 200 100" id="mySvg">
  <rect width="100" height="100" fill="blue" />
</svg>
```

```js
const svgElement = document.getElementById("mySvg");
const animatedRect = svgElement.viewBox.baseVal;

// Access the non-animated base value
console.log(animatedRect.x); // 0
console.log(animatedRect.y); // 0
console.log(animatedRect.width); // 200
console.log(animatedRect.height); // 100
```

## See also

- `viewBox`
- `DOMRect`
