---
title: "SVGAngle: valueInSpecifiedUnits property"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svgangle/valueinspecifiedunits/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGAngle: valueInSpecifiedUnits property

The `valueInSpecifiedUnits` property of the `SVGAngle` interface represents the value of this angle as a number, in the units expressed by the angle's `unitType`.

Setting this attribute will cause `value` and `valueAsString` to be updated automatically to reflect this setting.

## Value

A number; the numeric factor of the angle.

## Examples

```js
// Get an SVGAngle object
const svg = document.querySelector("svg");
const angle = svg.createSVGAngle();

// Set the value of the angle in degrees
angle.value = 45;
console.log(angle.valueInSpecifiedUnits); // Output: 45

// Update the numeric factor of the angle
angle.valueInSpecifiedUnits = 90;
console.log(angle.valueInSpecifiedUnits); // Output: 90
```

## See also

- `SVGAnimatedAngle`
