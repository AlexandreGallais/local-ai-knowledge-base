---
title: "XRWebGLBinding"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrwebglbinding/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRWebGLBinding

The **`XRWebGLBinding`** interface is used to create layers that have a GPU backend.

## Constructor

- `XRWebGLBinding()` (experimental)
    Creates a new `XRWebGLBinding` object for the specified XR session and WebGL rendering context.

## Instance properties

- `XRWebGLBinding.nativeProjectionScaleFactor` (read-only) (experimental)
    The `scaleFactor` that was passed in during the construction of the projection layer. The native buffer size is scaled by this number.

## Instance methods

- `XRWebGLBinding.createCubeLayer()` (experimental)
    Returns an `XRCubeLayer` object, which is a layer that renders directly from a cubemap, and projects it onto the inside faces of a cube.
- `XRWebGLBinding.createCylinderLayer()` (experimental)
    Returns an `XRCylinderLayer` object which is a layer that takes up a curved rectangular space in the virtual environment.
- `XRWebGLBinding.createEquirectLayer()` (experimental)
    Returns an `XREquirectLayer` object which is a layer that maps equirectangular coded data onto the inside of a sphere.
- `XRWebGLBinding.createProjectionLayer()` (experimental)
    Returns an `XRProjectionLayer` object which is a layer that fills the entire view of the observer and is refreshed close to the device's native frame rate.
- `XRWebGLBinding.createQuadLayer()` (experimental)
    Returns an `XRQuadLayer` object which is a two-dimensional object positioned and oriented in 3D space.
- `XRWebGLBinding.getDepthInformation()` (experimental)
    Returns an `XRWebGLDepthInformation` object containing WebGL depth information.
- `XRWebGLBinding.getReflectionCubeMap()` (experimental)
    Returns a `WebGLTexture` object containing a reflection cube map texture.
- `XRWebGLBinding.getSubImage()` (experimental)
    Returns an `XRWebGLSubImage` object representing the WebGL texture to render.
- `XRWebGLBinding.getViewSubImage()` (experimental)
    Returns an `XRWebGLSubImage` object representing the WebGL texture to render for an `XRView`.

## See also

- `XRWebGLLayer`
- `WebGLRenderingContext` and `WebGL2RenderingContext`
