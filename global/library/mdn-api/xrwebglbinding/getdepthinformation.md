---
title: "XRWebGLBinding: getDepthInformation() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrwebglbinding/getdepthinformation/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRWebGLBinding: getDepthInformation() method

The **`getDepthInformation()`** method of the `XRWebGLBinding` interface returns an `XRWebGLDepthInformation` object containing WebGL depth information.

## Syntax

```js
getDepthInformation(view)
```

### Parameters

- `view`
    An `XRView` object obtained from a viewer pose.

### Return value

An `XRWebGLDepthInformation` object.

### Exceptions

- `NotSupportedError` `DOMException`
    Thrown if `"depth-sensing"` is not in the list of enabled features for this `XRSession`.
- `InvalidStateError` `DOMException`
    Thrown if the `XRFrame` is not active nor animated. Obtaining depth information is only valid within the `requestAnimationFrame()` callback.
- `InvalidStateError` `DOMException`
    Thrown if the session's `depthUsage` is not `"gpu-optimized"`.

## Examples

### Obtaining WebGL depth information

```js
const canvasElement = document.querySelector(".output-canvas");
const gl = canvasElement.getContext("webgl");
await gl.makeXRCompatible();

// Make sure to request a session with depth-sensing enabled
const session = navigator.xr.requestSession("immersive-ar", {
  requiredFeatures: ["depth-sensing"],
  depthSensing: {
    usagePreference: ["gpu-optimized"],
    formatPreference: ["luminance-alpha"],
  },
});

const glBinding = new XRWebGLBinding(session, gl);

// …

// Obtain depth information in an active and animated frame
function rafCallback(time, frame) {
  session.requestAnimationFrame(rafCallback);
  const pose = frame.getViewerPose(referenceSpace);
  if (pose) {
    for (const view of pose.views) {
      const depthInformation = glBinding.getDepthInformation(view);
      if (depthInformation) {
        // Do something with the depth information
        // gl.bindTexture(gl.TEXTURE_2D, depthInformation.texture);
        // …
      }
    }
  }
}
```

## See also

- `XRWebGLDepthInformation.texture`
