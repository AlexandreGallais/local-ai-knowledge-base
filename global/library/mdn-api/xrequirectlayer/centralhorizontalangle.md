---
title: "XREquirectLayer: centralHorizontalAngle property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrequirectlayer/centralhorizontalangle/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XREquirectLayer: centralHorizontalAngle property

The **`centralHorizontalAngle`** property of the `XREquirectLayer` interface represents the central horizontal angle in radians for the sphere.

## Value

A number representing the central horizontal angle in radians for the sphere. Setting `centralHorizontalAngle` to a value less than 0 will set it to 0 and setting it to a value higher than 2π will set it to 2π.

## Examples

### Getting a layer's central horizontal angle

The `XRWebGLBinding.createEquirectLayer()` method creates an equirect layer and allows specifying a `centralHorizontalAngle`. The `XREquirectLayer.centralHorizontalAngle` property can be used after layer creation to get the central horizontal angle used or to set it to a new one.

```js
const equirectLayer = xrGlBinding.createEquirectLayer({
  space: xrReferenceSpace,
  viewPixelWidth: 1200,
  viewPixelHeight: 600,
  centralHorizontalAngle: 2 * Math.PI,
  upperVerticalAngle: Math.PI / 2.0,
  lowerVerticalAngle: -Math.PI / 2.0,
  radius: 0,
});

equirectLayer.centralHorizontalAngle; // 6.283185307179586
```

## See also

- `XREquirectLayer.radius`
- `XREquirectLayer.lowerVerticalAngle`
- `XREquirectLayer.upperVerticalAngle`
