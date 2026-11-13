---
title: "XREquirectLayer: transform property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrequirectlayer/transform/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XREquirectLayer: transform property

The **`transform`** property of the `XREquirectLayer` interface represents the offset and orientation relative to the layer's `space`.

## Value

An `XRRigidTransform`.

## Examples

### Setting the equirect layer's position

This example code positions the layer two meters away from the origin of `xrReferenceSpace`.

```js
const equirectLayer = xrGlBinding.createEquirectLayer({
  space: xrReferenceSpace,
  viewPixelWidth: 512,
  viewPixelHeight: 512,
});

equirectLayer.transform = new XRRigidTransform({ z: -2 });
```

## See also

- `XRRigidTransform`
- `XREquirectLayer.space`
