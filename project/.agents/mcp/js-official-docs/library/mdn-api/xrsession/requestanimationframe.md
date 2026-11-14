---
title: "XRSession: requestAnimationFrame() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrsession/requestanimationframe/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRSession: requestAnimationFrame() method

The `XRSession`
method **`requestAnimationFrame()`**, much like the
`Window` method of the same name, schedules a callback to be executed the
next time the browser is ready to paint the session's virtual environment to the XR
display. The specified callback is executed once before the next repaint; if
you wish for it to be executed for the following repaint, you must
call `requestAnimationFrame()` again. This can be done from within the
callback itself.

The callback takes two parameters as inputs: an `XRFrame` describing the
state of all tracked objects for the session, and a timestamp you can use to compute
any animation updates needed.

You can cancel a previously scheduled animation by calling
`cancelAnimationFrame()`.

> **Note:**
> Despite the obvious similarities between these methods and the
> global `requestAnimationFrame()` function
> provided by the `Window` interface, you _must not_ treat these as
> interchangeable. There is _no_ guarantee that the latter will work at all while
> an immersive XR session is underway.

## Syntax

```js
requestAnimationFrame(animationFrameCallback)
```

### Parameters

- `animationFrameCallback`
    A function which is called before the next repaint in order to allow you to update
    and render the XR scene based on elapsed time, animation, user input changes, and so
    forth. The callback receives as input two parameters:
    - `time`
        A `DOMHighResTimeStamp` indicating the time offset at which the
        updated viewer state was received from the WebXR device.
    - `xrFrame`
        An `XRFrame` object describing the state of the objects being
        tracked by the session. This can be used to obtain the poses of the viewer and the
        scene itself, as well as other information needed to render a frame of an AR or VR
        scene.

### Return value

An integer value which serves as a unique, non-zero ID or handle you may pass to
`cancelAnimationFrame()` if you need to
remove the pending animation frame request.

## Examples

The following example requests `XRSession` with "inline" mode so that it can
be displayed in an HTML element (without the need for a separate AR or VR device).

> **Note:**
> A real application should check that the device and the User
> Agent support WebXR API at all and then that they both support the desired session
> type via `XRSystem.isSessionSupported()`.

```js
// Obtain XR object
const XR = navigator.xr;

// Request a new XRSession
XR.requestSession("inline").then((xrSession) => {
  xrSession.requestAnimationFrame((time, xrFrame) => {
    const viewer = xrFrame.getViewerPose(xrReferenceSpace);

    gl.bindFramebuffer(xrWebGLLayer.framebuffer);
    for (const xrView of viewer.views) {
      const xrViewport = xrWebGLLayer.getViewport(xrView);
      gl.viewport(
        xrViewport.x,
        xrViewport.y,
        xrViewport.width,
        xrViewport.height,
      );

      // WebGL draw calls will now be rendered into the appropriate viewport.
    }
  });
});
```

The following example was taken directly from the spec draft. This example demonstrates
a design pattern that ensures seamless transition between non-immersive animations
created via `Window.requestAnimationFrame` and immersive XR animations.

```js
let xrSession = null;

function onWindowAnimationFrame(time) {
  window.requestAnimationFrame(onWindowAnimationFrame);

  // This may be called while an immersive session is running on some devices,
  // such as a desktop with a tethered headset. To prevent two loops from
  // rendering in parallel, skip drawing in this one until the session ends.
  if (!xrSession) {
    renderFrame(time, null);
  }
}

// The window animation loop can be started immediately upon the page loading.
window.requestAnimationFrame(onWindowAnimationFrame);

function onXRAnimationFrame(time, xrFrame) {
  xrSession.requestAnimationFrame(onXRAnimationFrame);
  renderFrame(time, xrFrame);
}

function renderFrame(time, xrFrame) {
  // Shared rendering logic.
}

// Assumed to be called by a user gesture event elsewhere in code.
function startXRSession() {
  navigator.xr.requestSession("immersive-vr").then((session) => {
    xrSession = session;
    xrSession.addEventListener("end", onXRSessionEnded);
    // Do necessary session setup here.
    // Begin the session's animation loop.
    xrSession.requestAnimationFrame(onXRAnimationFrame);
  });
}

function onXRSessionEnded() {
  xrSession = null;
}
```

## See also

- `Window.requestAnimationFrame()`
- `XRSession.cancelAnimationFrame()`
