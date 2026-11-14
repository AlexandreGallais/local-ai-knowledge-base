---
title: "XRCylinderLayer"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrcylinderlayer/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRCylinderLayer

The **`XRCylinderLayer`** interface of the WebXR Device API is a layer that takes up a curved rectangular space in the virtual environment. Only the front of the layer is visible.

`XRCylinderLayer` requires the `layers` feature to be enabled for the `XRSession`. You can request it in `XRSystem.requestSession()`.

To create a new `XRCylinderLayer`, call either:

- `XRWebGLBinding.createCylinderLayer()` for a WebGL opaque texture layer, or
- `XRMediaBinding.createCylinderLayer()` for an HTML `` playback layer.

To present layers to the XR device, add them to the `layers` render state using `XRSession.updateRenderState()`.

## Instance properties

_Inherits properties from its parent, `XRCompositionLayer`._

- `XRCylinderLayer.aspectRatio` (experimental)
    A number indicating the ratio of the visible cylinder section. It is the ratio of the width of the visible section of the cylinder divided by its height. The width is calculated by multiplying the `radius` with the `centralAngle`.
- `XRCylinderLayer.centralAngle` (experimental)
    A number indicating the angle in radians of the visible section of the cylinder.
- `XRCylinderLayer.radius` (experimental)
    A number indicating the radius of the cylinder.
- `XRCylinderLayer.space` (experimental)
    An `XRSpace` representing the layer's spatial relationship with the user's physical environment.
- `XRCylinderLayer.transform` (experimental)
    An `XRRigidTransform` representing the offset and orientation relative to `space`.

## Instance methods

_Inherits methods from its parents, `XRCompositionLayer` and `EventTarget`_.

## Events

- `redraw` (experimental)
    Sent to the `XRCylinderLayer` object when the underlying resources of the layer are lost or when the XR Compositor can no longer reproject the layer. If this event is sent, authors should redraw the content of the layer in the next XR animation frame.

## See also

- `XRLayer`
- `EventTarget`
- `XRCompositionLayer`
- `XREquirectLayer`
- `XRCubeLayer`
- `XRQuadLayer`
- `XRProjectionLayer`
