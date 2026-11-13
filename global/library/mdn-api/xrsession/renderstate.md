---
title: "XRSession: renderState property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrsession/renderstate/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRSession: renderState property

The
_read-only_ **`renderState`** property of an
`XRSession` object indicates the returns a `XRRenderState`
object describing how the user's environment which should be rendered. The
information provided covers the minimum and maximum distance at which to render objects,
the vertical field of view to use when rendering the in the `inline` session
mode, and the `XRWebGLLayer` to render into for inline composition.

While this property is read only, you can call the `XRSession` method
`updateRenderState()` to make changes.

## Value

An `XRRenderState` object describing how to render the scene.
