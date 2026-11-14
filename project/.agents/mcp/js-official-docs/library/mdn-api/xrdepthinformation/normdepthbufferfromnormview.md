---
title: "XRDepthInformation: normDepthBufferFromNormView property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrdepthinformation/normdepthbufferfromnormview/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRDepthInformation: normDepthBufferFromNormView property

The _read-only_ **`normDepthBufferFromNormView`** property of the `XRDepthInformation` interface contains the 3D geometric transform that needs to be applied when indexing into the depth buffer.

## Value

An `XRRigidTransform` that needs to be applied when indexing into the depth buffer. The transformation that the matrix represents changes the coordinate system from normalized view coordinates to normalized depth-buffer coordinates that can then be scaled by depth buffer's `width` and `height` to obtain the absolute depth buffer coordinates.

## Examples

Use `XRFrame.getDepthInformation()` (CPU) or `XRWebGLBinding.getDepthInformation()` (WebGL) to obtain depth information. The returned objects will contain the `normDepthBufferFromNormView` of the depth buffer, which you can use for further calculations.

```js
const normDepthFromNormViewMatrix =
  depthData.normDepthBufferFromNormView.matrix;
const normViewFromNormDepth =
  depthData.normDepthBufferFromNormView.inverse.matrix;
```
