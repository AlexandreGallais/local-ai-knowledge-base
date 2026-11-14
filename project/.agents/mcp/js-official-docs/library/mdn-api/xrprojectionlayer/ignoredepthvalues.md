---
title: "XRProjectionLayer: ignoreDepthValues property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrprojectionlayer/ignoredepthvalues/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRProjectionLayer: ignoreDepthValues property

The read-only **`ignoreDepthValues`** property of the `XRProjectionLayer` interface is a boolean indicating if the XR compositor is not making use of depth buffer values when rendering the layer.

## Value

A boolean. `true` indicates the XR compositor doesn't make use of depth buffer values; `false` indicates the content of the depth buffer will be used when rendering the layer.

## Examples

### Ignoring depth values

If the `depthFormat` option is `0` when creating a projection layer, the `ignoreDepthValues` property will be `true`. See also `XRWebGLBinding.createProjectionLayer()`.

```js
let glProjectionLayer = xrGLBinding.createProjectionLayer({
  depthFormat: 0,
});

glProjectionLayer.ignoreDepthValues; // true
```

## See also

- `XRWebGLBinding.createProjectionLayer()`
