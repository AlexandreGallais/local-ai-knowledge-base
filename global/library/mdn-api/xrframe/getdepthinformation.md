---
title: "XRFrame: getDepthInformation() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrframe/getdepthinformation/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRFrame: getDepthInformation() method

The **`getDepthInformation()`** method of the `XRFrame` interface returns an `XRCPUDepthInformation` object containing CPU depth information for the active and animated frame.

## Syntax

```js
getDepthInformation(view)
```

### Parameters

- `view`
    An `XRView` object obtained from a viewer pose.

### Return value

An `XRCPUDepthInformation` object.

### Exceptions

- `NotSupportedError` `DOMException`
    Thrown if `"depth-sensing"` is not in the list of enabled features for this `XRSession`.
- `InvalidStateError` `DOMException`
    Thrown if:
    - the `XRFrame` is not active nor animated. Obtaining depth information is only valid within the `requestAnimationFrame()` callback.
    - the session's `depthUsage` is not `"cpu-optimized"`.

## Examples

### Obtaining CPU depth information

```js
// Make sure to request a session with depth-sensing enabled
const session = navigator.xr.requestSession("immersive-ar", {
  requiredFeatures: ["depth-sensing"],
  depthSensing: {
    usagePreference: ["cpu-optimized", "gpu-optimized"],
    formatPreference: ["luminance-alpha", "float32"],
  },
});

// …

// Obtain depth information in an active and animated frame
function rafCallback(time, frame) {
  session.requestAnimationFrame(rafCallback);
  const pose = frame.getViewerPose(referenceSpace);
  if (pose) {
    for (const view of pose.views) {
      const depthInformation = frame.getDepthInformation(view);
      if (depthInformation) {
        // Do something with the depth information
        renderDepth(depthInformation);
      }
    }
  }
}
```
