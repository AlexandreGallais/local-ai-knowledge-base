---
title: "SVGLength: valueInSpecifiedUnits property"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svglength/valueinspecifiedunits/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGLength: valueInSpecifiedUnits property

The `valueInSpecifiedUnits` property of the `SVGLength` interface represents floating point value, in the units expressed by `unitType`.

Setting this attribute will cause `value` and `valueAsString` to be updated automatically to reflect this setting.

## Value

The numeric factor of the length as a float.

## Examples

```js
// Get an SVGLength object
const svg = document.querySelector("svg");
const length = svg.createSVGLength();

// Set the value of the length
length.value = 10;
console.log(length.valueInSpecifiedUnits); // Output: 10

// Update the numeric factor of the length
length.valueInSpecifiedUnits = 20;
console.log(length.valueInSpecifiedUnits); // Output: 20
```

## See also

- `SVGAnimatedLength`
