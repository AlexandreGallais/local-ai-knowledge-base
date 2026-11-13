---
title: "SVGAngle: valueAsString property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgangle/valueasstring/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGAngle: valueAsString property

The `valueAsString` property of the `SVGAngle` interface represents the angle's value as a string, in the units expressed by `unitType`.

Setting this attribute will cause `value`, `valueInSpecifiedUnits`, and `unitType` to be updated automatically to reflect this setting.

## Value

A string; the value of the angle.

## Examples

### Setting and retrieving `valueAsString`

```js
// Get an SVGAngle object
const svg = document.querySelector("svg");
const angle = svg.createSVGAngle();

// Set the value using valueAsString in degrees
angle.valueAsString = "45deg";
console.log(angle.valueAsString); // Output: "45deg"
console.log(angle.value); // Output: 45 (in degrees)

// Set the value using valueAsString in radians
angle.valueAsString = "1.57rad";
console.log(angle.valueAsString); // Output: "1.57rad"
console.log(Math.round(angle.value)); // Output: 90 (since 1.57 radians is approximately 90 degrees)
```

## See also

- `<angle>`
- `SVGAnimatedAngle`
