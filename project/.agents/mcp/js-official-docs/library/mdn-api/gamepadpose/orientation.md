---
title: "GamepadPose: orientation property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gamepadpose/orientation/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GamepadPose: orientation property

The **`orientation`** read-only property of the `GamepadPose` interface returns the orientation of the `Gamepad`, as a quaternion value.

The value is a `Float32Array`, made up of the following values:

- pitch — rotation around the X axis.
- yaw — rotation around the Y axis.
- roll — rotation around the Z axis.
- w — the fourth dimension (usually 1).

The orientation yaw (rotation around the y axis) is relative to the initial yaw of the sensor when it was first read.

## Value

A `Float32Array`, or `null` if the VR sensor is not able to provide orientation data.

## Examples

TBD

> **Note:**
> An orientation of `{ x: 0, y: 0, z: 0, w: 1 }` is considered to be "forward".

## See also

- WebVR API
- Gamepad API
