---
title: "DOMPointReadOnly: fromPoint() static method"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/dompointreadonly/frompoint_static/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# DOMPointReadOnly: fromPoint() static method

The static **`DOMPointReadOnly`**
method `fromPoint()` creates and returns a new
`DOMPointReadOnly` object given a source point.

You can also create a new `DOMPointReadOnly` object using the
`DOMPointReadOnly()` constructor.

## Syntax

```js
DOMPointReadOnly.fromPoint(sourcePoint)
```

### Parameters

- `sourcePoint`
    A `DOMPoint` or `DOMPointReadOnly` instance, or an object containing the following properties, from which to take the
    values of the new point's properties:
    - `x`
        An unrestricted floating-point value indicating the `x`-coordinate of the point in space. This is generally the horizontal coordinate, with positive values being to the right and negative values to the left. The default value is `0`.
    - `y`
        An unrestricted floating-point number providing the point's `y`-coordinate. This is the vertical coordinate, and barring any transforms applied to the coordinate system, positive values are downward and negative values upward toward the top of the screen. The default is `0`.
    - `z`
        An unrestricted floating-point value which gives the point's `z`-coordinate, which is (assuming no transformations that alter the situation) the depth coordinate; positive values are closer to the user and negative values retreat back into the screen. The default value is `0`.
    - `w`
        The point's `w` perspective value, given as an unrestricted floating-point number. The default is `1`.

### Return value

A new `DOMPointReadOnly` object (which is identical to the source point).

## Examples

### Creating a 2D point

This sample creates a 2D point, specifying an inline object that includes the values to
use for `x` and `y`.
The `z` and `w` properties are allowed to keep their
default values (`0` and `1` respectively).

```js
const point2D = DOMPointReadOnly.fromPoint({ x: 25, y: 25 });
```

### Creating a 3D point using an existing point

This example creates a point, `origPoint`, of type
`DOMPoint`, using `DOMPoint()`. That
point is then used as the input for `fromPoint()` to create a new point,
`newPoint`.

```js
const origPoint = new DOMPoint(25, 25, 100, 0.5);

const newPoint = DOMPointReadOnly.fromPoint(origPoint);
```
