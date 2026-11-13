---
title: "XREquirectLayer: space property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrequirectlayer/space/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XREquirectLayer: space property

The **`space`** property of the `XREquirectLayer` interface represents the layer's spatial relationship with the user's physical environment.

## Value

An `XRSpace`.

## Examples

### Updating the equirect layer's space

The `XRWebGLBinding.createEquirectLayer()` method creates an equirect layer and requires a `space` property to be provided. The `XREquirectLayer.space` property can be used after layer creation to get the space used or to set it to a new one.

```js
const equirectLayer = xrGlBinding.createEquirectLayer({
  space: xrReferenceSpace,
  viewPixelWidth: 512,
  viewPixelHeight: 512,
});

equirectLayer.space = someOtherSpace;
```

## See also

- `XRSpace`
- `XRWebGLBinding.createEquirectLayer()`
