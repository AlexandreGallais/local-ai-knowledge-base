---
title: "XRCubeLayer"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrcubelayer/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRCubeLayer

The **`XRCubeLayer`** interface of the WebXR Device API is a layer that renders directly from a cubemap and projects it onto the inside faces of a cube.

`XRCubeLayer` requires the `layers` feature to be enabled for the `XRSession`. You can request it in `XRSystem.requestSession()`.

To create a new `XRCubeLayer`, call `XRWebGLBinding.createCubeLayer()`.

To present layers to the XR device, add them to the `layers` render state using `XRSession.updateRenderState()`.

## Instance properties

_Inherits properties from its parent, `XRCompositionLayer`._

- `XRCubeLayer.space` (experimental)
    An `XRSpace` representing the layer's spatial relationship with the user's physical environment.
- `XRCubeLayer.orientation` (experimental)
    A `DOMPointReadOnly` representing the orientation relative to the `space` property.

## Instance methods

_Inherits methods from its parents, `XRCompositionLayer` and `EventTarget`_.

## Events

- `redraw` (experimental)
    Sent to the `XRCubeLayer` object when the underlying resources of the layer are lost or when the XR Compositor can no longer reproject the layer. If this event is sent, authors should redraw the content of the layer in the next XR animation frame.

## See also

- `XRLayer`
- `EventTarget`
- `XRCompositionLayer`
- `XREquirectLayer`
- `XRQuadLayer`
- `XRCylinderLayer`
- `XRProjectionLayer`
