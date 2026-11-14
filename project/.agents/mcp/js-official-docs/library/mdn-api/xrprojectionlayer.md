---
title: "XRProjectionLayer"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrprojectionlayer/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRProjectionLayer

The **`XRProjectionLayer`** interface of the WebXR Device API is a layer that fills the entire view of the observer and is refreshed close to the device's native frame rate.

`XRProjectionLayer` is supported by all `XRSession` objects (no `layers` feature descriptor is needed).

To create a new `XRProjectionLayer`, call `XRWebGLBinding.createProjectionLayer()`.
To present layers to the XR device, add them to the `layers` render state using `XRSession.updateRenderState()`.

`XRProjectionLayer` objects don't have an associated `XRSpace`, because they render to the full frame.

## Instance properties

_Inherits properties from its parent, `XRCompositionLayer` and `EventTarget`._

- `XRProjectionLayer.fixedFoveation` (experimental)
    A number indicating the amount of foveation used by the XR compositor for the layer. Fixed Foveated Rendering (FFR) renders the edges of the eye textures at a lower resolution than the center and reduces the GPU load.
- `XRProjectionLayer.ignoreDepthValues` (read-only) (experimental)
    A boolean indicating that the XR compositor is not making use of depth buffer values when rendering the layer.
- `XRProjectionLayer.textureArrayLength` (read-only) (experimental)
    The layer's layer count for array textures when using `texture-array` as the `textureType`.
- `XRProjectionLayer.textureHeight` (read-only) (experimental)
    The height in pixels of the color textures of this layer.
- `XRProjectionLayer.textureWidth` (read-only) (experimental)
    The width in pixels of the color textures of this layer.

## Instance methods

_Inherits methods from its parents, `XRCompositionLayer` and `EventTarget`_.

## See also

- `XRLayer`
- `EventTarget`
- `XRCompositionLayer`
- `XREquirectLayer`
- `XRCubeLayer`
- `XRCylinderLayer`
- `XRQuadLayer`
