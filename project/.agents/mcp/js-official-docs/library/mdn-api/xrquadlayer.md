---
title: "XRQuadLayer"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrquadlayer/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRQuadLayer

The **`XRQuadLayer`** interface of the WebXR Device API is a layer that takes up a flat rectangular space in the virtual environment. An `XRQuadLayer` has no thickness. It is a two-dimensional object positioned and oriented in 3D space. The position of a quad refers to the center of the quad. Only the front of the layer is visible.

`XRQuadLayer` requires the `layers` feature to be enabled for the `XRSession`. You can request it in `XRSystem.requestSession()`.

To create a new `XRQuadLayer`, call either:

- `XRWebGLBinding.createQuadLayer()` for a WebGL opaque texture quad layer, or
- `XRMediaBinding.createQuadLayer()` for an HTML `` playback quad layer.

To present layers to the XR device, add them to the `layers` render state using `XRSession.updateRenderState()`.

## Instance properties

_Inherits properties from its parent, `XRCompositionLayer`._

- `XRQuadLayer.height` (experimental)
    Represents the height of the layer in meters.
- `XRQuadLayer.space` (experimental)
    An `XRSpace` representing the layer's spatial relationship with the user's physical environment.
- `XRQuadLayer.transform` (experimental)
    An `XRRigidTransform` representing the offset and orientation relative to `space`.
- `XRQuadLayer.width` (experimental)
    Represents the width of the layer in meters.

## Instance methods

_Inherits methods from its parents, `XRCompositionLayer` and `EventTarget`_.

## Events

- `redraw` (experimental)
    Sent to the `XRQuadLayer` object when the underlying resources of the layer are lost or when the XR Compositor can no longer reproject the layer. If this event is sent, authors should redraw the content of the layer in the next XR animation frame.

## See also

- `XRLayer`
- `EventTarget`
- `XRCompositionLayer`
- `XREquirectLayer`
- `XRCubeLayer`
- `XRCylinderLayer`
- `XRProjectionLayer`
