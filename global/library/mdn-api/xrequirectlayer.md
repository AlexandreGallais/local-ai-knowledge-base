---
title: "XREquirectLayer"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrequirectlayer/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XREquirectLayer

The **`XREquirectLayer`** interface of the WebXR Device API is a layer that maps equirectangular coded data onto the inside of a sphere.

`XREquirectLayer` requires the `layers` feature to be enabled for the `XRSession`. You can request it in `XRSystem.requestSession()`.

To create a new `XREquirectLayer`, call either:

- `XRWebGLBinding.createEquirectLayer()` for a WebGL opaque texture layer, or
- `XRMediaBinding.createEquirectLayer()` for an HTML `` playback layer.

To present layers to the XR device, add them to the `layers` render state using `XRSession.updateRenderState()`.

## Instance properties

_Inherits properties from its parent, `XRCompositionLayer`._

- `XREquirectLayer.centralHorizontalAngle` (experimental)
    A number indicating the central horizontal angle in radians for the sphere.
- `XREquirectLayer.lowerVerticalAngle` (experimental)
    A number indicating the lower vertical angle in radians for the sphere.
- `XREquirectLayer.radius` (experimental)
    A number indicating the radius of the sphere.
- `XREquirectLayer.space` (experimental)
    An `XRSpace` representing the layer's spatial relationship with the user's physical environment.
- `XREquirectLayer.transform` (experimental)
    An `XRRigidTransform` representing the offset and orientation relative to `space`.
- `XREquirectLayer.upperVerticalAngle` (experimental)
    A number indicating the upper vertical angle in radians for the sphere.

## Instance methods

_Inherits methods from its parents, `XRCompositionLayer` and `EventTarget`_.

## Events

- `redraw` (experimental)
    Sent to the `XREquirectLayer` object when the underlying resources of the layer are lost or when the XR Compositor can no longer reproject the layer. If this event is sent, authors should redraw the content of the layer in the next XR animation frame.

## See also

- `XRLayer`
- `EventTarget`
- `XRCompositionLayer`
- `XRCylinderLayer`
- `XRCubeLayer`
- `XRQuadLayer`
- `XRProjectionLayer`
