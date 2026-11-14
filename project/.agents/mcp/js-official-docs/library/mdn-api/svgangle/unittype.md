---
title: "SVGAngle: unitType property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgangle/unittype/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGAngle: unitType property

The **`unitType`** property of the `SVGAngle` interface is one of the unit type constants and represents the units in which this angle's value is expressed.

## Value

A number representing the numeric value of the constant.

## Examples

Here's an example of how to access the `unitType` property:

```js
// Get an SVGAngle object
const svg = document.querySelector("svg");
const angle = svg.createSVGAngle();

// Set the angle value
angle.newValueSpecifiedUnits(SVGAngle.SVG_ANGLETYPE_DEG, 45);

// Check the unit type
console.log(angle.unitType); // Output: 2 (SVG_ANGLETYPE_DEG)
```

## See also

- `SVGAnimatedAngle`
