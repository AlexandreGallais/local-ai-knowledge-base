---
title: "XRCompositionLayer: mipLevels property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrcompositionlayer/miplevels/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRCompositionLayer: mipLevels property

The read-only **`mipLevels`** property of the `XRCompositionLayer` interface is a layer's number of mip levels in the color and texture data. See also Mipmap on Wikipedia.

The desired number of mip levels can be specified when creating layers. However, if the user agent can't create the requested number, it can create less. Use `mipLevels` to determine the actual number of mip levels for a layer.

The `viewPixelWidth` and `viewPixelHeight` need to be powers of two as they get successively halved at each mip level.

## Value

A number equal or smaller to the requested mip levels when a layer has been created.

## Examples

### Getting a layer's mip levels

The `mipLevels` property indicates the actual number of mip levels that have been created. In this example, the desired number of 5 mip levels that had been requested for an `XRQuadLayer` could be full-filled.

```js
let xrGLBinding = new XRWebGLBinding(session, gl);
let quadLayer = xrGLBinding.createQuadLayer({
  space: refSpace,
  viewPixelHeight: 512,
  viewPixelWidth: 512,
  width: 1.0,
  height: 1.0,
  mipLevels: 5,
  transform: new XRRigidTransform({/* … */}),
});

quadLayer.mipLevels; // 5
```

## See also

- Mipmap on Wikipedia
