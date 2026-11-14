---
title: "XREquirectLayer: upperVerticalAngle property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrequirectlayer/upperverticalangle/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XREquirectLayer: upperVerticalAngle property

The **`upperVerticalAngle`** property of the `XREquirectLayer` interface represents the upper vertical angle in radians for the sphere.

## Value

A number representing the upper vertical angle in radians for the sphere. Setting `upperVerticalAngle` to a value less than -π/2 will set it to -π/2 and setting it to a value higher than π/2 will set it to π/2.

## Examples

### Getting a layer's upper vertical angle

The `XRWebGLBinding.createEquirectLayer()` method creates an equirect layer and allows specifying a `upperVerticalAngle`. The `XREquirectLayer.upperVerticalAngle` property can be used after layer creation to get the upper vertical angle used or to set it to a new one.

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

equirectLayer.upperVerticalAngle; // 1.5707963267948966
```

## See also

- `XREquirectLayer.radius`
- `XREquirectLayer.centralHorizontalAngle`
- `XREquirectLayer.lowerVerticalAngle`
