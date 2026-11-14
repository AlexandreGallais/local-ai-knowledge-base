---
title: "XRWebGLLayer"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrwebgllayer/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRWebGLLayer

The **`XRWebGLLayer`** interface of the WebXR Device API provides a linkage between the WebXR device (or simulated XR device, in the case of an inline session) and a WebGL context used to render the scene for display on the device. In particular, it provides access to the WebGL framebuffer and viewport to ease access to the context.

Although `XRWebGLLayer` is currently the only type of framebuffer layer supported by WebGL, it's entirely possible that future updates to the WebXR specification may allow for other layer types and corresponding image sources.

## Constructor

- `XRWebGLLayer()` (experimental)
    Creates and returns a new `XRWebGLLayer` object for use by the specified `XRSession`, using a particular `WebGLRenderingContext` or `WebGL2RenderingContext` as the destination context.

## Instance properties

- `antialias` (read-only) (experimental)
    A Boolean value indicating whether or not the WebGL context's framebuffer supports anti-aliasing. The specific type of anti-aliasing is determined by the user agent.
- `fixedFoveation` (experimental)
    A number indicating the amount of foveation used by the XR compositor. Fixed Foveated Rendering (FFR) renders the edges of the eye textures at a lower resolution than the center and reduces the GPU load.
- `framebuffer` (read-only) (experimental)
    Returns a `WebGLFramebuffer` suitable for passing into the `bindFrameBuffer()` method.
- `framebufferWidth` (read-only) (experimental)
    Returns the width of the `XRWebGLLayer`'s framebuffer.
- `framebufferHeight` (read-only) (experimental)
    Returns the height of the layer's framebuffer.
- `ignoreDepthValues` (read-only) (experimental)
    A Boolean which Indicates whether or not the WebXR compositor should make use of the contents of the layer's depth buffer while compositing the scene.

## Static methods

- `getNativeFramebufferScaleFactor()` (experimental)
    Returns the scaling factor that can be used to scale the resolution of the recommended WebGL framebuffer resolution to the rendering device's native resolution.

## Instance methods

- `getViewport()` (experimental)
    Returns a new `XRViewport` instance representing the position, width, and height to which the WebGL context's viewport must be set to contain drawing to the area of the framebuffer designated for the specified view's contents. In this way, for example, the rendering of the left eye's point of view and of the right eye's point of view are each placed into the correct parts of the framebuffer.

## Examples

### Binding the layer to a WebGL context

This snippet, taken from Drawing a frame in our "Movement and motion" WebXR example, shows how the `XRWebGLLayer` is obtained from the `XRSession` object's rendering state and is then bound as the current rendering WebGL framebuffer by calling the WebGL `bindFrameBuffer()` function.

```js
let glLayer = xrSession.renderState.baseLayer;
gl.bindFrameBuffer(gl.FRAMEBUFFER, glLayer.framebuffer);
```

### Rendering every view in a frame

Each time the GPU is ready to render the scene to the XR device, the XR runtime calls the function you specified when you called the `XRSession` method `requestAnimationFrame()` to ask to render the frame.

That function receives as input an `XRFrame` which encapsulates the data needed to render the frame. This information includes the pose (an `XRViewerPose` object) that describes the position and facing direction of the viewer within the scene as well as a list of `XRView` objects, each representing one perspective on the scene. In current WebXR implementations, there will never be more than two entries in this list: one describing the position and viewing angle of the left eye and another doing the same for the right.

```js
let pose = xrFrame.getViewerPose(xrReferenceSpace);

if (pose) {
  const glLayer = xrSession.renderState.baseLayer;
  gl.bindFrameBuffer(gl.FRAMEBUFFER, glLayer.framebuffer);

  for (const view of pose.views) {
    const viewport = glLayer.getViewport(view);
    gl.viewport(viewport.x, viewport.y, viewport.width, viewport.height);

    /* Render the view */
  }
}
```

## See also

- WebXR Device API
- Getting started with WebGL
- `WebGLRenderingContext` and `WebGL2RenderingContext`
- Drawing a frame in our "Movement and motion" WebXR example
