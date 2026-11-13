---
title: "XRSession: cancelAnimationFrame() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrsession/cancelanimationframe/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRSession: cancelAnimationFrame() method

The **`cancelAnimationFrame()`** method of
the `XRSession` interface cancels an animation frame which was previously
requested by calling `requestAnimationFrame`.

## Syntax

```js
cancelAnimationFrame(handle)
```

### Parameters

- `handle`
    The unique value returned by the call
    to `requestAnimationFrame()` that
    previously scheduled the animation callback.

### Return value

None (`undefined`).

## Usage notes

This function has no effect if the specified `handle` cannot be found.

## Examples

In the example below we see code which starts up a WebXR session if immersive VR mode
is supported. Once started, the session schedules its first frame to be rendered by
calling `requestAnimationFrame()`.

The `pauseXR()` function shown at the bottom can be called to suspend the
WebVR session, in essence, by canceling any pending animation frame callback. Since each
frame callback schedules the next one, removing the callback terminates updating of the
WebXR scene.

```js
const XR = navigator.xr;

let requestHandle = null;
let xrSession = null;

if (XR) {
  XR.isSessionSupported("immersive-vr").then((isSupported) => {
    if (isSupported) {
      startXR();
    }
  });
}

function frameCallback(time, xrFrame) {
  xrSession.requestAnimationFrame(frameCallback);

  // Update and render the frame
}

async function startXR() {
  xrSession = XR.requestSession("immersive-vr");

  if (xrSession) {
    stopButton.onclick = stopXR;
    requestHandle = xrSession.requestAnimationFrame(frameCallback);
  }
}

function pauseXR() {
  if (xrSession && requestHandle) {
    xrSession.cancelAnimationFrame(requestHandle);
    requestHandle = null;
  }
}
```

## See also

- `Window.cancelAnimationFrame`
- `XRSession.requestAnimationFrame`
