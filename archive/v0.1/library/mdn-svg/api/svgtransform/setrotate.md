---
title: "SVGTransform: setRotate() method"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svgtransform/setrotate/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGTransform: setRotate() method

The `setRotate()` method of the `SVGTransform` interface sets the transform type to `SVG_TRANSFORM_ROTATE`, with parameter `angle` defining the rotation angle and parameters `cx` and `cy` defining the optional center of rotation.

## Syntax

```js
setRotate(angle, cx, cy)
```

### Parameters

- `angle`
    A float defining the rotation angle in degrees.
- `cx` (optional)
    A float defining the X-coordinate of the center of rotation. Defaults to `0`.
- `cy` (optional)
    A float defining the Y-coordinate of the center of rotation. Defaults to `0`.

### Return value

None (`undefined`).

### Exceptions

- `NoModificationAllowedError` `DOMException`
    Thrown if the attribute or the `SVGTransform` object is read-only.

## Examples

### Rotating an SVG Element

```js
// Select an SVG element and create a transform object
const svgElement = document.querySelector("svg");
const transform = svgElement.createSVGTransform();

// Set a rotation of 45 degrees
transform.setRotate(45, 0, 0);

// Output the rotation angle
console.log(`Rotation Angle: ${transform.angle}`); // Output: 45
```

## See also

- `SVGTransform.angle`
