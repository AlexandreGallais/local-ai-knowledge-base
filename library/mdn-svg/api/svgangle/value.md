---
title: "SVGAngle: value property"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svgangle/value/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGAngle: value property

The `value` property of the `SVGAngle` interface represents the floating point value of the `<angle>` in degrees.

Setting this attribute will cause `valueInSpecifiedUnits` and `valueAsString` to be updated automatically to reflect this setting.

## Value

A number; the angle value in degrees.

## Examples

```js
// Get an SVGAngle object
const svg = document.querySelector("svg");
const angle = svg.createSVGAngle();

// Set the value
angle.value = 45;
console.log(angle.value); // Output: 45

// Reflecting the value
angle.value = 90;
console.log(angle.value); // Output: 90
```

## See also

- `SVGAnimatedAngle`
