---
title: "XRQuadLayer: space property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrquadlayer/space/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRQuadLayer: space property

The **`space`** property of the `XRQuadLayer` interface represents the layer's spatial relationship with the user's physical environment.

## Value

An `XRSpace`.

## Examples

### Setting a layer's dimension and position

This example code positions the layer two meters away from `newSpace` with a `height` and `width` of 1.5 meters.

```js
const quadLayer = xrGlBinding.createQuadLayer({
  space: xrReferenceSpace,
  viewPixelWidth: 512,
  viewPixelHeight: 512,
});

quadLayer.space = newSpace;
quadLayer.transform = new XRRigidTransform({ z: -2 });
quadLayer.width = 1.5;
quadLayer.height = 1.5;
```

## See also

- `XRSpace`
- `XRQuadLayer.transform`
