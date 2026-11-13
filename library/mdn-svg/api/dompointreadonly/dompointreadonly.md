---
title: "DOMPointReadOnly: DOMPointReadOnly() constructor"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/dompointreadonly/dompointreadonly/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# DOMPointReadOnly: DOMPointReadOnly() constructor

The **`DOMPointReadOnly()`**
constructor returns a new `DOMPointReadOnly` object representing a point
in 2D or 3D space, optionally with perspective, whose values cannot be altered by
script code.

## Syntax

```js
new DOMPointReadOnly()
new DOMPointReadOnly(x)
new DOMPointReadOnly(x, y)
new DOMPointReadOnly(x, y, z)
new DOMPointReadOnly(x, y, z, w)
```

### Parameters

- `x` (optional)
    The value of the horizontal coordinate, x, as a floating point number. The default
    value is 0.
- `y` (optional)
    The value of the vertical coordinate, y, as a floating point number. The default
    value is 0.
- `z` (optional)
    The value of the depth coordinate, z, as a floating point number. The default value
    is 0.
- `w` (optional)
    The value of the perspective, w, as a floating point number. The default is 1.

> **Note:**
> Each of these values is what's called an _unrestricted_
> number. In addition to any finite floating-point value, you may use special values
> such as ±`Infinity` and `NaN`.

### Return value

A new `DOMPointReadOnly` object representing the specified location in
space.

## Examples

The following code demonstrates creating both 2D and 3D points.

```js
const point2D = new DOMPointReadOnly(50, 25);
const point3D = new DOMPointReadOnly(50, 0, 10);
const perspectivePoint3D = new DOMPointReadOnly(50, 50, 25, 0.5);
```
