---
title: "XRCompositionLayer"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrcompositionlayer/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRCompositionLayer

The **`XRCompositionLayer`** interface of the WebXR Device API is a base class that defines a set of common properties and behaviors for WebXR layer types. It is not constructable on its own.

Several layer types inherit from `XRCompositionLayer`:

- `XREquirectLayer`
- `XRCubeLayer`
- `XRCylinderLayer`
- `XRProjectionLayer`
- `XRQuadLayer`

`XRCompositionLayer` itself inherits from the general `XRLayer` class (which inherits from `EventTarget`).

## Instance properties

- `XRCompositionLayer.blendTextureSourceAlpha` (experimental)
    A boolean enabling the layer's texture alpha channel.
- `XRCompositionLayer.layout` (read-only) (experimental)
    The layout type of the layer.
- `XRCompositionLayer.mipLevels` (read-only) (experimental)
    The number of mip levels in the color and texture data for the layer.
- `XRCompositionLayer.needsRedraw` (read-only) (experimental)
    A boolean signaling that the layer should be re-rendered in the next frame.

## Instance methods

_Inherits methods from its parent, `EventTarget`_.

- `XRCompositionLayer.destroy()` (experimental)
    Deletes the underlying layer attachments.

## See also

- `XRLayer`
- `EventTarget`
- `XREquirectLayer`
- `XRCubeLayer`
- `XRCylinderLayer`
- `XRProjectionLayer`
- `XRQuadLayer`
