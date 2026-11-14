---
title: "XRRay: matrix property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrray/matrix/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRRay: matrix property

The _read-only_ **`matrix`** property of the `XRRay` interface is a transform that can be used to position objects along the `XRRay`. This is a 4 by 4 matrix given as a 16 element `Float32Array` in column major order.

The transform from a ray originates at [0, 0, 0] and extends down the negative z-axis to the ray described by the `XRRay`'s `origin` and `direction`.

## Value

A 16 element `Float32Array` object representing a 4 by 4 matrix in column major order.

## Examples

### Using the `matrix` property

The `matrix` property can be used to position graphical representations of the ray when rendering.

```js
let origin = { x: 10.0, y: 10.0, z: 10.0, w: 1.0 };
let direction = { x: 10.0, y: 0.0, z: 0.0, w: 0.0 };
let ray = new XRRay(origin, direction);

// Render the ray using the `ray.matrix` transform
```

## See also

- `Float32Array`
