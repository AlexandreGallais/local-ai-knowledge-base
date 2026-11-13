---
title: "SVGAngle: convertToSpecifiedUnits() method"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svgangle/converttospecifiedunits/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGAngle: convertToSpecifiedUnits() method

The `convertToSpecifiedUnits()` method of the `SVGAngle` interface allows you to convert the angle's value to the specified unit type.

This function will:

- Set the `unitType` property to the given unit type
- Update the `valueInSpecifiedUnits` and `valueAsString` properties so the angle value is represented in the given unit type

## Syntax

```js
convertToSpecifiedUnits(unitType)
```

### Parameters

- `unitType`
    A constant representing the unit type to which the angle's value should be converted. This must be one of the constant values defined for the `unitType` property, with the exception of `SVG_ANGLETYPE_UNKNOWN`.
    - `SVGAngle.SVG_ANGLETYPE_DEG`: convert to degrees
    - `SVGAngle.SVG_ANGLETYPE_RAD`: convert to radians
    - `SVGAngle.SVG_ANGLETYPE_GRAD`: convert to gradians
    - `SVGAngle.SVG_ANGLETYPE_UNSPECIFIED`: convert to a unitless number, interpreted as degrees

### Return value

None (`undefined`).

## Examples

### Converting an angle to degrees

```js
// Get an SVGAngle object
const svg = document.querySelector("svg");
const angle = svg.createSVGAngle();

// Set the angle's value in radians (Math.PI / 2)
angle.newValueSpecifiedUnits(SVGAngle.SVG_ANGLETYPE_RAD, Math.PI / 2);

// Retrieve the angle's value as a string
console.log(angle.valueAsString); // Output: 1.5708rad
console.log(angle.unitType); // Output: 3 (SVG_ANGLETYPE_RAD)

// Convert the angle's value to degrees
angle.convertToSpecifiedUnits(SVGAngle.SVG_ANGLETYPE_DEG);

// Retrieve the angle's value as a string
console.log(angle.valueAsString); // Output: 90deg
console.log(angle.unitType); // Output: 2 (SVG_ANGLETYPE_DEG)
```

## See also

- `SVGAnimatedAngle`
