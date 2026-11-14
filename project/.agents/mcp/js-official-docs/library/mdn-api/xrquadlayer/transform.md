---
title: "XRQuadLayer: transform property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrquadlayer/transform/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRQuadLayer: transform property

The **`transform`** property of the `XRQuadLayer` interface represents the offset and orientation relative to the layer's `space`.

## Value

An `XRRigidTransform`.

## Examples

### Setting a layer's dimension and position

This example code positions the layer two meters away from the origin of `xrReferenceSpace` with a `height` and `width` of 1.5 meters.

```js
const quadLayer = xrGlBinding.createQuadLayer({
  space: xrReferenceSpace,
  viewPixelWidth: 512,
  viewPixelHeight: 512,
});

quadLayer.transform = new XRRigidTransform({ z: -2 });
quadLayer.width = 1.5;
quadLayer.height = 1.5;
```

## See also

- `XRRigidTransform`
- `XRQuadLayer.space`
