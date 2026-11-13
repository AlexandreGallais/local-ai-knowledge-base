---
title: "VRDisplay: getPose() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/vrdisplay/getpose/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# VRDisplay: getPose() method

The **`getPose()`** method of the `VRDisplay` interface returns a `VRPose` object defining the future predicted pose of the `VRDisplay` as it will be when the current frame is actually presented.

> **Note:**
> This method was part of the old WebVR API. It has been superseded by the WebXR Device API.
>
> It was even deprecated there — instead, you should use `VRDisplay.getFrameData()`, which also provides a `VRPose` object.

## Syntax

```js
getPose()
```

### Parameters

None.

### Return value

A `VRPose` object.

## Examples

Once we have a reference to a `VRDisplay` object, we can retrieve the `VRPose` representing the current pose of the display.

```js
if (navigator.getVRDisplays) {
  console.log("WebVR 1.1 supported");
  // Then get the displays attached to the computer
  navigator.getVRDisplays().then((displays) => {
    // If a display is available, use it to present the scene
    if (displays.length > 0) {
      vrDisplay = displays[0];
      console.log("Display found");

      // Return the current VRPose object for the display
      const pose = vrDisplay.getPose();

      // …
    }
  });
}
```

It is however recommended that you use the non-deprecated `pose` property of the `VRFrameData` object (retrieved via `VRDisplay.getFrameData()`) to retrieve the current pose for each frame before it is submitted to the display to be presented. This happens on each iteration of the rendering loop for your app, so you can be sure the pose data is current.

## Specifications

This method was part of the old WebVR API that has been superseded by the WebXR Device API. It is no longer on track to becoming a standard.

Until all browsers have implemented the new WebXR APIs, it is recommended to rely on frameworks, like A-Frame, Babylon.js, or Three.js, or a polyfill, to develop WebXR applications that will work across all browsers. Read Meta's Porting from WebVR to WebXR guide for more information.

## See also

- WebVR API
