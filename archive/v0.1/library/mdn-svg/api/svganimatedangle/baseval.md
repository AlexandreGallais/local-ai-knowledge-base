---
title: "SVGAnimatedAngle: baseVal property"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svganimatedangle/baseval/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGAnimatedAngle: baseVal property

The **`baseVal`** read-only property of the `SVGAnimatedAngle` interface represents the base (non-animated) value of the associated `<angle>` on an SVG element. This property is used to retrieve the static value of the `<angle>`, unaffected by any ongoing animations.

This property reflects the `<angle>` value of the `orient` attribute of the SVG `<marker>` element, which is the same as the `SVGMarkerElement.orientAngle` property.

## Value

An `SVGAngle` object representing the base value of the `<angle>` content type.

- The value is unaffected by animations, representing the initial state of the angle.
- The unit type of the angle can be retrieved from `SVGAngle.unitType`.

## Examples

```js
const marker = document.querySelector("[orient]");

// Set the orient attribute with an angle
marker.setAttribute("orient", "90");
const baseAngle = marker.orientAngle.baseVal; // an SVGAngle object

console.log(baseAngle.value); // Output: 90
console.log(baseAngle.unitType); // Output: 1 (constant for SVG_ANGLETYPE_UNSPECIFIED)
```

## See also

- `SVGAnimatedAngle.animVal`
- `SVGAngle` and angle `value` constants
