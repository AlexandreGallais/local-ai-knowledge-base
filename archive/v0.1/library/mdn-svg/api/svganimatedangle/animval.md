---
title: "SVGAnimatedAngle: animVal property"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svganimatedangle/animval/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGAnimatedAngle: animVal property

The **`animVal`** read-only property of the `SVGAnimatedAngle` interface represents the current animated value of the associated `<angle>` on an SVG element. If the attribute is not currently being animated, `animVal` will be the same as the `baseVal`.

This property reflects the animated state of the angle of the animating `orient` attribute of the SVG `<marker>` element, providing access to the value of the angle during animations.

## Value

An `SVGAngle` object representing the animated value of the `<angle>` content type.

- If the angle is being animated, `animVal` will reflect the current animation state.
- If the angle is not animated, `animVal` will be identical to `SVGAnimatedAngle.baseVal`.

## Examples

```js
const marker = document.querySelector("[orient]");

// Set an initial angle for the orient attribute
marker.setAttribute("orient", "45");

// Access the animated value of the angle
const animAngle = marker.orientAngle.animVal; // an SVGAngle object

console.log(animAngle.value); // Output: 45 (current animated value of the angle)
console.log(animAngle.unitType); // Output: 2 (constant for SVG_ANGLETYPE_DEG)
```

## See also

- `SVGAnimatedAngle.baseVal`
- `SVGAngle` and angle `value` constants
