---
title: "SVGLength: valueInSpecifiedUnits property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svglength/valueinspecifiedunits/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
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
