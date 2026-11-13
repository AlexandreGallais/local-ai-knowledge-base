---
title: "XRCylinderLayer: transform property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrcylinderlayer/transform/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRCylinderLayer: transform property

The **`transform`** property of the `XRCylinderLayer` interface represents the offset and orientation relative to the layer's `space`.

## Value

An `XRRigidTransform`.

## Examples

### Setting the cylinder layer's position

This example code positions the layer two meters away from the origin of `xrReferenceSpace`.

```js
const cylinderLayer = xrGlBinding.createCylinderLayer({
  space: xrReferenceSpace,
  viewPixelWidth: 512,
  viewPixelHeight: 512,
});

cylinderLayer.transform = new XRRigidTransform({ z: -2 });
```

## See also

- `XRRigidTransform`
- `XRCylinderLayer.space`
