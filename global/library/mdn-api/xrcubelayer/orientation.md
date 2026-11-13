---
title: "XRCubeLayer: orientation property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrcubelayer/orientation/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRCubeLayer: orientation property

The **`orientation`** property of the `XRCubeLayer` interface represents the orientation relative to the `space` property.

## Value

A `DOMPointReadOnly`.

## Examples

### Updating the cube layer's orientation

The `XRWebGLBinding.createCubeLayer()` method creates a cube layer and allows specifying an `orientation`. The `XRCubeLayer.orientation` property can be used after layer creation to get the current orientation or to set it to a new one.

```js
const cubeLayer = xrGlBinding.createCubeLayer({
  space: xrReferenceSpace,
  viewPixelWidth: 512,
  viewPixelHeight: 512,
  orientation: DOMPointReadOnly.fromPoint({ x: 0.0, y: 0.0, z: 0.0, w: 1.0 }),
});

cubeLayer.orientation = someOtherPoint;
```

## See also

- `DOMPointReadOnly`
- `XRSpace`
- `XRWebGLBinding.createCubeLayer()`
