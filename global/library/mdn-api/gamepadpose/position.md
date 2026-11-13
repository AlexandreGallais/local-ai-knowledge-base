---
title: "GamepadPose: position property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gamepadpose/position/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GamepadPose: position property

The **`position`** read-only property of the `GamepadPose` interface returns the position of the `Gamepad` as a 3D vector.

The coordinate system is as follows:

- Positive X is to the user's right.
- Positive Y is up.
- Positive Z is behind the user.

Positions are measured in meters from an origin point — this point is the position the sensor was first read at.

## Value

A `Float32Array`, or `null` if the gamepad is not able to provide position data.

> **Note:**
> User agents may provide emulated position values through certain techniques; when doing so they should still report `GamepadPose.hasPosition` as false.

## Examples

TBD

## See also

- WebVR API
- Gamepad API
