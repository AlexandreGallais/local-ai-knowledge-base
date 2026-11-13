---
title: "XREquirectLayer: radius property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrequirectlayer/radius/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XREquirectLayer: radius property

The **`radius`** property of the `XREquirectLayer` interface represents the radius of the sphere.

## Value

A number representing the non-negative radius (in meters) of the sphere. Values of zero or infinity are treated as representing an infinite sphere. Setting `radius` to a value less than 0 will set it to 0.

## Examples

### Getting a layer's radius

The `XRWebGLBinding.createEquirectLayer()` method creates an equirect layer and allows specifying a `radius`. The `XREquirectLayer.radius` property can be used after layer creation to get the radius used or to set it to a new one.

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

equirectLayer.radius; // 0
```

## See also

- `XREquirectLayer.centralHorizontalAngle`
- `XREquirectLayer.lowerVerticalAngle`
- `XREquirectLayer.upperVerticalAngle`
