---
title: "SVGAngle: newValueSpecifiedUnits() method"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svgangle/newvaluespecifiedunits/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGAngle: newValueSpecifiedUnits() method

The `newValueSpecifiedUnits()` method of the `SVGAngle` interface sets the value to a number with an associated `unitType`, thereby replacing the values for all of the attributes on the object.

## Syntax

```js
newValueSpecifiedUnits(unitType, valueInSpecifiedUnits)
```

### Parameters

- `unitType`
    A constant representing the unit type to which the angle's value should be converted. This must be one of the constant values defined for the `unitType` property, with the exception of `SVG_ANGLETYPE_UNKNOWN`.
    - `SVGAngle.SVG_ANGLETYPE_DEG`: convert to degrees
    - `SVGAngle.SVG_ANGLETYPE_RAD`: convert to radians
    - `SVGAngle.SVG_ANGLETYPE_GRAD`: convert to gradians
    - `SVGAngle.SVG_ANGLETYPE_UNSPECIFIED`: convert to a unitless number, interpreted as degrees

- `valueInSpecifiedUnits`
    The numeric factor for the angle value, expressed in the specified unit type.

### Return value

None (`undefined`).

### Exceptions

This method may raise a `DOMException` of one of the following types:

- `NotSupportedError` `DOMException`
    Thrown if `unitType` is `SVG_ANGLETYPE_UNKNOWN` or not a valid unit type constant.

- `NoModificationAllowedError` `DOMException`
    Thrown if `SVGAngle` corresponds to a read-only attribute or when the object itself is read-only.

## Examples

### Setting an angle in degrees

```js
// Get an SVGAngle object
const svg = document.querySelector("svg");
const angle = svg.createSVGAngle();

// Set the angle's value in degrees using newValueSpecifiedUnits()
angle.newValueSpecifiedUnits(SVGAngle.SVG_ANGLETYPE_DEG, 45);

// Retrieve the angle's value in degrees
console.log(angle.value); // Output: 45
console.log(angle.unitType); // Output: 2 (SVG_ANGLETYPE_DEG)
```

### Setting an angle in radians

```js
// Get an SVGAngle object
const svg = document.querySelector("svg");
const angle = svg.createSVGAngle();

// Set the angle's value in radians using newValueSpecifiedUnits()
angle.newValueSpecifiedUnits(SVGAngle.SVG_ANGLETYPE_RAD, Math.PI / 2);

// Retrieve the angle's value
console.log(angle.value); // Output: 90
console.log(angle.unitType); // Output: 3 (SVG_ANGLETYPE_RAD)
```

### Setting an angle in gradians

```js
// Get an SVGAngle object
const svg = document.querySelector("svg");
const angle = svg.createSVGAngle();

// Set the angle's value in gradians using newValueSpecifiedUnits()
angle.newValueSpecifiedUnits(SVGAngle.SVG_ANGLETYPE_GRAD, 100);

// Retrieve the angle's value in gradians
console.log(angle.value); // Output: 90
console.log(angle.unitType); // Output: 4 (SVG_ANGLETYPE_GRAD)
```

## See also

- `SVGAnimatedAngle`
