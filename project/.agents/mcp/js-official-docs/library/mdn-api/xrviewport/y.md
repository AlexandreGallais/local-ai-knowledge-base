---
title: "XRViewport: y property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrviewport/y/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRViewport: y property

The read-only `XRViewport` interface's
**`y`** property indicates the offset from the bottom edge of
the destination surface (typically a `XRWebGLLayer`) to the bottom edge of
the viewport within the surface into which WebXR content is to be rendered. The
viewport's `x` property identifies the `x`
component of the origin, and its is given by the `width`
and `height` properties.

## Value

The offset from the bottom edge of the rendering surface to the bottom edge of the
viewport, in pixels.

> **Note:**
> Although other web APIs typically consider the `y`
> axis to begin at the top and grow larger progressing downward, WebGL reverses this,
> with `y` growing larger as it goes upward on the screen.

## Examples

See the main `XRViewport` page for examples.
