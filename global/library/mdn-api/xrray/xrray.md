---
title: "XRRay: XRRay() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrray/xrray/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRRay: XRRay() constructor

The **`XRRay()`** constructor creates a new `XRRay` object which is a geometric ray described by an origin point and a direction vector.

## Syntax

```js
new XRRay()
new XRRay(origin)
new XRRay(origin, direction)
new XRRay(transform)
```

### Parameters

- `origin` (optional)
    A point object defining the 3-dimensional point in space that the ray originates from, in meters. All dimensions are optional, however, if provided, the origin's `w` property must be 1.0. The object is initialized to `{ x: 0.0, y: 0.0, z: 0.0, w: 1.0 }` by default.
- `direction` (optional)
    A vector object defining the ray's 3-dimensional directional vector. All dimensions are optional, however, if provided, the direction's `w` property must be 0.0. The object is initialized to: `{ x: 0.0, y: 0.0, z: -1.0, w: 0.0 }` by default.
- `transform` (optional)
    An `XRRigidTransform` object representing the position and orientation of the ray.

### Return value

A newly-created `XRRay` object.

### Exceptions

- `TypeError`
    Thrown if one of the following conditions is met:
    - all of `direction`'s `x`, `y`, and `z` coordinates are zero.
    - `direction`'s `w` coordinate is not 0.0.
    - `origin`'s `w` coordinate is not 1.0.

## Examples

### Creating `XRRay` objects

The `XRRay()` constructor allows you to create new rays by either providing an `origin` point and a `direction` vector, or by passing in an `XRRigidTransform` object.

```js
// Default configuration
let ray1 = new XRRay();

// Specifying origin, leaving direction as default
let ray2 = new XRRay({ y: 0.5 });

// Specifying both, origin and direction
let origin = { x: 10.0, y: 10.0, z: 10.0, w: 1.0 };
let direction = { x: 10.0, y: 0.0, z: 0.0, w: 0.0 };
let ray3 = new XRRay(origin, direction);

// Using DOMPoint.fromPoint
let ray4 = new XRRay(DOMPoint.fromPoint(origin), DOMPoint.fromPoint(direction));

// Using rigid transform
let rigidTransform = new XRRigidTransform(
  DOMPoint.fromPoint(origin),
  DOMPoint.fromPoint(direction),
);
let ray5 = new XRRay(rigidTransform);
```

## See also

- `DOMPoint`
- `DOMPoint.fromPoint()`
