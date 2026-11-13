---
title: "DOMPointReadOnly"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/dompointreadonly/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# DOMPointReadOnly

The **`DOMPointReadOnly`** interface specifies the coordinate and perspective fields used by `DOMPoint` to define a 2D or 3D point in a coordinate system.

There are two ways to create a new `DOMPointReadOnly` instance. First, you can use its constructor, passing in the values of the parameters for each dimension and, optionally, the perspective:

```js
/* 2D */
const point2D = new DOMPointReadOnly(50, 50);

/* 3D */
const point3D = new DOMPointReadOnly(50, 50, 25);

/* 3D with perspective */
const point3DPerspective = new DOMPointReadOnly(100, 100, 100, 1.0);
```

The other option is to use the static `DOMPointReadOnly.fromPoint()` method:

```js
const point = DOMPointReadOnly.fromPoint({ x: 100, y: 100, z: 50, w: 1.0 });
```

## Constructor

- `DOMPointReadOnly()`
    Creates a new `DOMPointReadOnly` object given the values of its coordinates and perspective. To create a point using an object, you can instead use `DOMPointReadOnly.fromPoint()`.

## Instance properties

- `DOMPointReadOnly.x` (read-only)
    The point's horizontal coordinate, `x`.
- `DOMPointReadOnly.y` (read-only)
    The point's vertical coordinate, `y`.
- `DOMPointReadOnly.z` (read-only)
    The point's depth coordinate, `z`.
- `DOMPointReadOnly.w` (read-only)
    The point's perspective value, `w`.

## Static methods

- `DOMPointReadOnly.fromPoint()`
    A static method that creates a new `DOMPointReadOnly` object given the coordinates provided in the specified object.

## Instance methods

- `matrixTransform()`
    Applies a matrix transform specified as an object to the `DOMPointReadOnly` object.
- `toJSON()`
    Returns a JSON-serializable plain object representing the `DOMPointReadOnly` object. Automatically called by `JSON.stringify()`.

## See also

- `DOMPoint`
- `DOMRect`
- `DOMMatrix`
