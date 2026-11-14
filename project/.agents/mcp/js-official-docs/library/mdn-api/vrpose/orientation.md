---
title: "VRPose: orientation property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/vrpose/orientation/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# VRPose: orientation property

The **`orientation`** read-only property of the `VRPose` interface returns the orientation of the sensor at the current timestamp, as a quaternion value.

> **Note:**
> This property was part of the old WebVR API. It has been superseded by the WebXR Device API.

The value is a `Float32Array`, made up of the following values:

- pitch — rotation around the X axis.
- yaw — rotation around the Y axis.
- roll — rotation around the Z axis.
- w — the fourth dimension (usually 1).

The orientation yaw (rotation around the y axis) is relative to the initial yaw of the sensor when it was first read or the yaw of the sensor at the point that `VRDisplay.resetPose()` was last called.

## Value

A `Float32Array`, or `null` if the VR sensor is not able to provide orientation data.

## Examples

See `VRDisplay.getFrameData()` for example code.

> **Note:**
> An orientation of `{ x: 0, y: 0, z: 0, w: 1 }` is considered to be "forward".

## Specifications

This property was part of the old WebVR API that has been superseded by the WebXR Device API. It is no longer on track to becoming a standard.

Until all browsers have implemented the new WebXR APIs, it is recommended to rely on frameworks, like A-Frame, Babylon.js, or Three.js, or a polyfill, to develop WebXR applications that will work across all browsers. Read Meta's Porting from WebVR to WebXR guide for more information.

## See also

- WebVR API
