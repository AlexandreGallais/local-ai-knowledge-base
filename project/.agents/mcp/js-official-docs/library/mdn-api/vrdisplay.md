---
title: "VRDisplay"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/vrdisplay/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# VRDisplay

The **`VRDisplay`** interface of the WebVR API represents any VR device supported by this API. It includes generic information such as device IDs and descriptions, as well as methods for starting to present a VR scene, retrieving eye parameters and display capabilities, and other important functionality.

> **Note:**
> This interface was part of the old WebVR API. It has been superseded by the WebXR Device API.

An array of all connected VR Devices can be returned by invoking the `Navigator.getVRDisplays()` method.

## Instance properties

- `VRDisplay.capabilities` (read-only) (deprecated) (non-standard)
    Returns a `VRDisplayCapabilities` object that indicates the various capabilities of the `VRDisplay`.
- `VRDisplay.depthFar` (deprecated) (non-standard)
    Gets and sets the z-depth defining the far plane of the eye view frustum, i.e., the furthest viewable boundary of the scene.
- `VRDisplay.depthNear` (deprecated) (non-standard)
    Gets and sets the z-depth defining the near plane of the eye view frustum, i.e., the nearest viewable boundary of the scene.
- `VRDisplay.displayId` (read-only) (deprecated) (non-standard)
    Returns an identifier for this particular VRDisplay, which is also used as an association point in the Gamepad API (see `Gamepad.displayId`).
- `VRDisplay.displayName` (read-only) (deprecated) (non-standard)
    Returns a human-readable name to identify the `VRDisplay`.
- `VRDisplay.isConnected` (read-only) (deprecated) (non-standard)
    Returns a boolean value indicating whether the `VRDisplay` is connected to the computer.
- `VRDisplay.isPresenting` (read-only) (deprecated) (non-standard)
    Returns a boolean value indicating whether the `VRDisplay` is currently having content presented through it.
- `VRDisplay.stageParameters` (read-only) (deprecated) (non-standard)
    Returns a `VRStageParameters` object containing room-scale parameters, if the `VRDisplay` is capable of supporting room-scale experiences.

## Instance methods

- `VRDisplay.getEyeParameters()` (deprecated) (non-standard)
    Returns the `VREyeParameters` object containing the eye parameters for the specified eye.
- `VRDisplay.getFrameData()` (deprecated) (non-standard)
    Accepts a `VRFrameData` object and populates it with the information required to render the current frame.
- `VRDisplay.getImmediatePose()` (deprecated) (non-standard)
    Returns a `VRPose` object defining the current pose of the `VRDisplay`, with no prediction applied. This is no longer needed, and has been removed from the spec.
- `VRDisplay.getLayers()` (deprecated) (non-standard)
    Returns the layers currently being presented by the `VRDisplay`.
- `VRDisplay.getPose()` (deprecated) (non-standard)
    Returns a `VRPose` object defining the future predicted pose of the `VRDisplay` as it will be when the current frame is actually presented. **This method is deprecated — instead, you should use `VRDisplay.getFrameData()`, which also provides a `VRPose` object.**
- `VRDisplay.resetPose()` (deprecated) (non-standard)
    Resets the pose for this `VRDisplay`, treating its current `VRPose.position` and `VRPose.orientation` as the "origin/zero" values.
- `VRDisplay.cancelAnimationFrame()` (deprecated) (non-standard)
    A special implementation of `Window.cancelAnimationFrame` that allows callbacks registered with `VRDisplay.requestAnimationFrame()` to be unregistered.
- `VRDisplay.requestAnimationFrame()` (deprecated) (non-standard)
    A special implementation of `Window.requestAnimationFrame` containing a callback function that will be called every time a new frame of the `VRDisplay` presentation is rendered.
- `VRDisplay.requestPresent()` (deprecated) (non-standard)
    Starts the `VRDisplay` presenting a scene.
- `VRDisplay.exitPresent()` (deprecated) (non-standard)
    Stops the `VRDisplay` presenting a scene.
- `VRDisplay.submitFrame()` (deprecated) (non-standard)
    Captures the current state of the `VRLayerInit` currently being presented and displays it on the `VRDisplay`.

## Examples

```js
if (navigator.getVRDisplays) {
  console.log("WebVR 1.1 supported");
  // Then get the displays attached to the computer
  navigator.getVRDisplays().then((displays) => {
    // If a display is available, use it to present the scene
    if (displays.length > 0) {
      vrDisplay = displays[0];
      // Now we have our VRDisplay object and can do what we want with it
    }
  });
}
```

> **Note:**
> You can see this complete code at raw-webgl-example.

## Specifications

This interface was part of the old WebVR API that has been superseded by the WebXR Device API. It is no longer on track to becoming a standard.

Until all browsers have implemented the new WebXR APIs, it is recommended to rely on frameworks, like A-Frame, Babylon.js, or Three.js, or a polyfill, to develop WebXR applications that will work across all browsers. Read Meta's Porting from WebVR to WebXR guide for more information.

## See also

- WebVR API
