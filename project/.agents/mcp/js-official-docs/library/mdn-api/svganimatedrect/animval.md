---
title: "SVGAnimatedRect: animVal property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svganimatedrect/animval/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGAnimatedRect: animVal property

The **`animVal`** read-only property of the `SVGAnimatedRect` interface represents the current animated value of the `viewBox` attribute of an SVG element as a read-only `DOMRectReadOnly` object. It provides access to the rectangle's dynamic state, including the `x`, `y`, `width`, and `height` values during the animation.

If no animation is applied, the `animVal` property reflects the SVG element's `viewBox` attribute value and will be identical to `SVGAnimatedRect.baseVal`.

## Value

A `DOMRectReadOnly` object representing the animated value of the `viewBox` attribute.

## Examples

```html
<svg viewBox="0 0 200 100" id="mySvg">
  <rect width="100" height="100" fill="blue" />
</svg>
```

```js
const svgElement = document.getElementById("mySvg");
const animatedRect = svgElement.viewBox.animVal;

// Log the animated value (assuming an animation is applied)
console.log(animatedRect.x);
console.log(animatedRect.y);
console.log(animatedRect.width);
console.log(animatedRect.height);
```

## See also

- `viewBox`
- `DOMRectReadOnly`
