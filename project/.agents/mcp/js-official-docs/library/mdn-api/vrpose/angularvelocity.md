---
title: "VRPose: angularVelocity property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/vrpose/angularvelocity/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# VRPose: angularVelocity property

The **`angularVelocity`** read-only property of the `VRPose` interface returns an array representing the angular velocity vector of the `VRDisplay` at the current timestamp, in radians per second.

> **Note:**
> This property was part of the old WebVR API. It has been superseded by the WebXR Device API.

In other words, the current velocity at which the sensor is rotating around the `x`, `y`, and `z` axes.

## Value

A `Float32Array`, or `null` if the VR sensor is not able to provide angular velocity information.

## Examples

```js
// rendering loop for a VR scene
function drawVRScene() {
  // WebVR: Request the next frame of the animation
  vrSceneFrame = vrDisplay.requestAnimationFrame(drawVRScene);

  // Populate frameData with the data of the next frame to display
  vrDisplay.getFrameData(frameData);

  // Retrieve the angular velocity values for use in rendering
  // curFramePose is a VRPose object
  const curFramePose = frameData.pose;
  const angVel = curFramePose.angularVelocity;
  const avx = angVel[0];
  const avy = angVel[1];
  const avz = angVel[2];

  // render the scene
  // …

  // WebVR: submit the rendered frame to the VR display
  vrDisplay.submitFrame();
}
```

## Specifications

This property was part of the old WebVR API that has been superseded by the WebXR Device API. It is no longer on track to becoming a standard.

Until all browsers have implemented the new WebXR APIs, it is recommended to rely on frameworks, like A-Frame, Babylon.js, or Three.js, or a polyfill, to develop WebXR applications that will work across all browsers. Read Meta's Porting from WebVR to WebXR guide for more information.

## See also

- WebVR API
