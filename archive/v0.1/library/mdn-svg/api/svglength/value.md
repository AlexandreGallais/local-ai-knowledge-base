---
title: "SVGLength: value property"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svglength/value/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGLength: value property

The `value` property of the `SVGLength` interface represents the floating point value of the \<length> in user units.

Setting this attribute will cause `SVGLength.valueInSpecifiedUnits` and `SVGLength.valueAsString` to be updated automatically to reflect this setting.

## Value

The length value in user units as a float.

## Examples

```js
// Get an SVGLength object
const svg = document.querySelector("svg");
const length = svg.createSVGLength();

// Set the value
length.value = 10;
console.log(length.value); // Output: 10

// Reflecting the value
length.value = 20;
console.log(length.value); // Output: 20
```

## See also

- `SVGAnimatedLength`
