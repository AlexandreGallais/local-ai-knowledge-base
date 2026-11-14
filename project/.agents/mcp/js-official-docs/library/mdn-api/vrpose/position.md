---
title: "VRPose: position property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/vrpose/position/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# VRPose: position property

The **`position`** read-only property of the `VRPose` interface returns the position of the `VRDisplay` at the current timestamp as a 3D vector.

> **Note:**
> This property was part of the old WebVR API. It has been superseded by the WebXR Device API.

The coordinate system is as follows:

- Positive X is to the user's right.
- Positive Y is up.
- Positive Z is behind the user.

Positions are measured in meters from an origin point — this point is either the position the sensor was first read at, or the position of the sensor at the point that `VRDisplay.resetPose()` was last called.

> **Note:**
> By default, all positions are given as a sitting space position. Transforming this point with `VRStageParameters.sittingToStandingTransform` — when you are working with a room display for example — converts this to a standing space position.

## Value

A `Float32Array`, or null if the VR sensor is not able to provide position data.

> **Note:**
> User agents may provide emulated position values through techniques such as neck modeling; when doing so they should still report `VRDisplayCapabilities.hasPosition` as false.

## Examples

See `VRDisplay.getFrameData()` for example code.

## Specifications

This property was part of the old WebVR API that has been superseded by the WebXR Device API. It is no longer on track to becoming a standard.

Until all browsers have implemented the new WebXR APIs, it is recommended to rely on frameworks, like A-Frame, Babylon.js, or Three.js, or a polyfill, to develop WebXR applications that will work across all browsers. Read Meta's Porting from WebVR to WebXR guide for more information.

## See also

- WebVR API
