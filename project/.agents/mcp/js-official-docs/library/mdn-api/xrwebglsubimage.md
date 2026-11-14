---
title: "XRWebGLSubImage"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrwebglsubimage/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRWebGLSubImage

The **`XRWebGLSubImage`** interface is used during rendering of WebGL layers.

## Instance properties

_Inherits properties from its parent, `XRSubImage`._

- `XRWebGLSubImage.colorTexture` (read-only) (experimental)
    A color `WebGLTexture` object for the `XRCompositionLayer` to render.
- `XRWebGLSubImage.depthStencilTexture` (read-only) (experimental)
    A depth/stencil `WebGLTexture` object for the `XRCompositionLayer` to render.
- `XRWebGLSubImage.imageIndex` (read-only) (experimental)
    A number representing the offset into the texture array if the layer was requested with `texture-array`; `null` otherwise.
- `XRWebGLSubImage.colorTextureWidth` (read-only) (experimental)
    A number representing the width in pixels of the GL attachment.
- `XRWebGLSubImage.colorTextureHeight` (read-only) (experimental)
    A number representing the height in pixels of the GL attachment.

## See also

- `XRLayer`
- `XRWebGLBinding.getSubImage()`
- `XRWebGLBinding.getViewSubImage()`
