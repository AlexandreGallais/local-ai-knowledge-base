---
title: "XRCylinderLayer: aspectRatio property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrcylinderlayer/aspectratio/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRCylinderLayer: aspectRatio property

The **`aspectRatio`** property of the `XRCylinderLayer` interface represents the ratio of the visible cylinder section. It is the ratio of the width of the visible section of the cylinder divided by its height. The width is calculated by multiplying the `radius` with the `centralAngle`.

## Value

A number representing the ratio of the visible cylinder section.

## Examples

### Getting a layer's aspect ratio

The `XRWebGLBinding.createCylinderLayer()` method creates a cylinder layer and allows you to specify an `aspectRatio`. The `XRCylinder.aspectRatio` property can be used after layer creation to get the aspect ratio used or to set it to a new one.

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

cylinderLayer.aspectRatio; // 2
```

## See also

- `XRCylinderLayer.centralAngle`
- `XRCylinderLayer.radius`
