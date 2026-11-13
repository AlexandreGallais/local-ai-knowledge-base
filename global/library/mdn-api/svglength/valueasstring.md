---
title: "SVGLength: valueAsString property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svglength/valueasstring/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGLength: valueAsString property

The `valueAsString` property of the `SVGLength` interface represents the \<length>'s value as a string, in the units expressed by `unitType`.

Setting this attribute will cause `value`, `valueInSpecifiedUnits`, and `unitType` to be updated automatically to reflect this setting.

## Value

A string.

## Examples

### Setting and retrieving `valueAsString`

```js
// Create an SVGLength object
const svg = document.querySelector("svg");
const length = svg.createSVGLength();

// Set the length as a string
length.valueAsString = "45%";
console.log(length.valueAsString); // Output: "45%"
console.log(length.unitType); // Output: 2 (SVG_LENGTHTYPE_PERCENTAGE)
console.log(length.valueInSpecifiedUnits); // Output: 45

// Change the length value
length.valueAsString = "100px";
console.log(length.valueAsString); // Output: "100px"
console.log(length.unitType); // Output: 5 (SVG_LENGTHTYPE_PX)
console.log(length.value); // Output: 100
```

## See also

- `<number>`
- `<length>`
- `SVGAnimatedLength`
