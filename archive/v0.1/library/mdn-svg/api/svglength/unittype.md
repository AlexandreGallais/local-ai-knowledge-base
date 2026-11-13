---
title: "SVGLength: unitType property"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svglength/unittype/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGLength: unitType property

The **`unitType`** property of the `SVGLength` interface represents the type of the value as specified by one of the `SVG_LENGTHTYPE_*` constants defined on this interface.

## Value

One of the following:

- `SVGLength.SVG_LENGTHTYPE_UNKNOWN` (0)
- `SVGLength.SVG_LENGTHTYPE_NUMBER` (1)
- `SVGLength.SVG_LENGTHTYPE_PERCENTAGE` (2)
- `SVGLength.SVG_LENGTHTYPE_EMS` (3)
- `SVGLength.SVG_LENGTHTYPE_EXS` (4)
- `SVGLength.SVG_LENGTHTYPE_PX` (5)
- `SVGLength.SVG_LENGTHTYPE_CM` (6)
- `SVGLength.SVG_LENGTHTYPE_MM` (7)
- `SVGLength.SVG_LENGTHTYPE_IN` (8)
- `SVGLength.SVG_LENGTHTYPE_PT` (9)
- `SVGLength.SVG_LENGTHTYPE_PC` (10)

## Examples

Here's an example of how to access the `unitType` property:

```js
// Get an SVGLength object
const svg = document.querySelector("svg");

// Assume `length` is an instance of SVGLength
const length = svg.createSVGLength();

// Set the length value
length.newValueSpecifiedUnits(SVGLength.SVG_LENGTHTYPE_PERCENTAGE, 20);

// Check the unit type
console.log(length.unitType); // Output: 2 (SVG_LENGTHTYPE_PERCENTAGE)
```

## See also

- `SVGAnimatedLength`
