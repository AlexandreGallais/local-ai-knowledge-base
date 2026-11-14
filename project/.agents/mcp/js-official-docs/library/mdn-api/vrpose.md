---
title: "VRPose"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/vrpose/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# VRPose

The **`VRPose`** interface of the WebVR API represents the state of a VR sensor at a given timestamp (which includes orientation, position, velocity, and acceleration information).

> **Note:**
> This interface was part of the old WebVR API. It has been superseded by the WebXR Device API.

This interface is accessible through the `VRDisplay.getPose()` and `VRDisplay.getFrameData()` methods. `VRDisplay.getPose()` is deprecated.

## Instance properties

- `VRPose.position` (deprecated) (read-only) (non-standard)
    Returns the position of the `VRDisplay` at the current `VRFrameData.timestamp` as a 3D vector
- `VRPose.linearVelocity` (deprecated) (read-only) (non-standard)
    Returns the linear velocity of the `VRDisplay` at the current `VRFrameData.timestamp`, in meters per second.
- `VRPose.linearAcceleration` (deprecated) (read-only) (non-standard)
    Returns the linear acceleration of the `VRDisplay` at the current `VRFrameData.timestamp`, in meters per second per second.
- `VRPose.orientation` (deprecated) (read-only) (non-standard)
    Returns the orientation of the sensor at the current `VRFrameData.timestamp`, as a quaternion value.
- `VRPose.angularVelocity` (deprecated) (read-only) (non-standard)
    Returns the angular velocity of the `VRDisplay` at the current `VRFrameData.timestamp`, in radians per second.
- `VRPose.angularAcceleration` (deprecated) (read-only) (non-standard)
    Returns the angular acceleration of the `VRDisplay` at the current `VRFrameData.timestamp`, in meters per second per second.

## Examples

See `VRDisplay.getFrameData()` for example code.

## Specifications

This interface was part of the old WebVR API that has been superseded by the WebXR Device API. It is no longer on track to becoming a standard.

Until all browsers have implemented the new WebXR APIs, it is recommended to rely on frameworks, like A-Frame, Babylon.js, or Three.js, or a polyfill, to develop WebXR applications that will work across all browsers. Read Meta's Porting from WebVR to WebXR guide for more information.

## See also

- WebVR API
