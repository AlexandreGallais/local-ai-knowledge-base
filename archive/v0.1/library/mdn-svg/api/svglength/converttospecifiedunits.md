---
title: "SVGLength: convertToSpecifiedUnits() method"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svglength/converttospecifiedunits/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGLength: convertToSpecifiedUnits() method

The `convertToSpecifiedUnits()` method of the `SVGLength` interface allows you to convert the length's value to the specified unit type.

This function will:

- Set the `unitType` property to the given unit type
- Update the `valueInSpecifiedUnits` and `valueAsString` properties so the length value is represented in the given unit type

## Syntax

```js
convertToSpecifiedUnits(unitType)
```

### Parameters

- `unitType`
    A constant representing the unit type to which the length's value should be converted. This must be one of the constant values defined for the `unitType` property, with the exception of `SVG_LENGTHTYPE_UNKNOWN`.
    - `SVGLength.SVG_LENGTHTYPE_NUMBER`: convert to unitless number
    - `SVGLength.SVG_LENGTHTYPE_PERCENTAGE`: convert to percentage
    - `SVGLength.SVG_LENGTHTYPE_EMS`: convert to em units
    - `SVGLength.SVG_LENGTHTYPE_EXS`: convert to ex units
    - `SVGLength.SVG_LENGTHTYPE_PX`: convert to pixels
    - `SVGLength.SVG_LENGTHTYPE_CM`: convert to centimeters
    - `SVGLength.SVG_LENGTHTYPE_MM`: convert to millimeters
    - `SVGLength.SVG_LENGTHTYPE_IN`: convert to inches
    - `SVGLength.SVG_LENGTHTYPE_PT`: convert to points
    - `SVGLength.SVG_LENGTHTYPE_PC`: convert to picas

### Return value

None (`undefined`).

## Examples

### Converting a length to mm

```js
// Get an SVGLength object
const svg = document.querySelector("svg");
const length = svg.createSVGLength();

// Set a length value in centimeters
length.valueAsString = "0.5cm";

// Convert the length to millimeters
length.convertToSpecifiedUnits(SVGLength.SVG_LENGTHTYPE_MM);

console.log(length.unitType); // Output: 7 (SVG_LENGTHTYPE_MM)
console.log(length.valueInSpecifiedUnits); // Output: 5
console.log(length.valueAsString); // Output: "5mm"
```

## See also

- `SVGAnimatedLength`
