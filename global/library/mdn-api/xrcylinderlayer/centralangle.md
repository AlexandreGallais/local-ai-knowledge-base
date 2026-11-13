---
title: "XRCylinderLayer: centralAngle property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrcylinderlayer/centralangle/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRCylinderLayer: centralAngle property

The **`centralAngle`** property of the `XRCylinderLayer` interface represents the angle in radians of the visible section of the cylinder.

## Value

A number representing the angle in radians of the visible section of the cylinder.

## Examples

### Getting a layer's central angle

The `XRWebGLBinding.createCylinderLayer()` method creates a cylinder layer and allows you to specify a `centralAngle`. The `XRCylinder.centralAngle` property can be used after layer creation to get the central angle used or to set it to a new one.

```js
const cylinderLayer = xrGlBinding.createCylinderLayer({
  space: xrReferenceSpace,
  viewPixelWidth: 1200,
  viewPixelHeight: 600,
  centralAngle: (60 * Math.PI) / 180,
  aspectRatio: 2,
  radius: 2,
  transform: new XRRigidTransform(/* … */),
});

cylinderLayer.centralAngle; // 1.0471975511965976
```

## See also

- `XRCylinderLayer.aspectRatio`
- `XRCylinderLayer.radius`
- `Math.PI`
