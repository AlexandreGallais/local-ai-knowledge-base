---
title: "XRCylinderLayer: space property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrcylinderlayer/space/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRCylinderLayer: space property

The **`space`** property of the `XRCylinderLayer` interface represents the layer's spatial relationship with the user's physical environment.

## Value

An `XRSpace`.

## Examples

### Updating the cylinder layer's space

The `XRWebGLBinding.createCylinderLayer()` method creates a cylinder layer and requires a `space` property to be provided. The `XRCylinderLayer.space` property can be used after layer creation to get the space used or to set it to a new one.

```js
const cylinderLayer = xrGlBinding.createCylinderLayer({
  space: xrReferenceSpace,
  viewPixelWidth: 512,
  viewPixelHeight: 512,
});

cylinderLayer.space = someOtherSpace;
```

## See also

- `XRSpace`
- `XRWebGLBinding.createCylinderLayer()`
