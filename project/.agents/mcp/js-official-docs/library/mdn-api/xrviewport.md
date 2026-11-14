---
title: "XRViewport"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrviewport/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRViewport

The WebXR Device API's **`XRViewport`** interface provides properties used to describe the size and position of the current viewport within the `XRWebGLLayer` being used to render the 3D scene.

## Instance properties

- `height` (read-only)
    The height, in pixels, of the viewport.
- `width` (read-only)
    The width, in pixels, of the viewport.
- `x` (read-only)
    The offset from the origin of the destination graphics surface (typically a `XRWebGLLayer`) to the left edge of the viewport, in pixels.
- `y` (read-only)
    The offset from the origin of the viewport to the bottom edge of the viewport; WebGL's coordinate system places (0, 0) at the bottom left corner of the surface.

## Usage notes

Currently, the only type of surface available is the `XRWebGLLayer`. The precise orientation of the coordinate system may vary with other surface types, but in WebGL, the origin (0, 0) is located at the bottom-left corner of the surface. Thus the values specified in an `XRViewport` define a rectangle whose bottom-left corner is at (`x`, `y`) and which extends `width` pixels toward the left and `height` pixels upward.

These values may be passed directly into the `WebGLRenderingContext.viewport()` method:

```js
const xrViewport = xrWebGLLayer.getViewport(xrView);
gl.viewport(xrViewport.x, xrViewport.y, xrViewport.width, xrViewport.height);
```

## Example

This example sets up an animation frame callback using `requestAnimationFrame()`. After initial setup, it iterates over each of the views within the viewer's pose, configuring the viewport as dictated by the `XRWebGLLayer`.

```js
xrSession.requestAnimationFrame((time, xrFrame) => {
  const viewerPose = xrFrame.getViewerPose(xrReferenceSpace);

  gl.bindFramebuffer(xrWebGLLayer.framebuffer);

  for (const xrView of viewerPose.views) {
    const xrViewport = xrWebGLLayer.getViewport(xrView);
    gl.viewport(
      xrViewport.x,
      xrViewport.y,
      xrViewport.width,
      xrViewport.height,
    );

    // Now we can use WebGL to draw into a viewport matching
    // the viewer's needs
  }
});
```
