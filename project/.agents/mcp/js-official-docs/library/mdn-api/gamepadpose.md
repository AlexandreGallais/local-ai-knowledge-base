---
title: "GamepadPose"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gamepadpose/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GamepadPose

The **`GamepadPose`** interface of the Gamepad API represents the pose of a WebVR controller at a given timestamp (which includes orientation, position, velocity, and acceleration information).

This interface is accessible through the `Gamepad.pose` property.

## Instance properties

- `GamepadPose.hasOrientation` (read-only) (experimental)
    Returns a boolean indicating whether the gamepad is capable of returning orientation information (`true`) or not (`false`).
- `GamepadPose.hasPosition` (read-only) (experimental)
    Returns a boolean indicating whether the gamepad is capable of returning position information (`true`) or not (`false`).
- `GamepadPose.position` (read-only) (experimental)
    Returns the position of the `Gamepad` as a 3D vector.
- `GamepadPose.linearVelocity` (read-only) (experimental)
    Returns the linear velocity of the `Gamepad`, in meters per second.
- `GamepadPose.linearAcceleration` (read-only) (experimental)
    Returns the linear acceleration of the `Gamepad`, in meters per second per second.
- `GamepadPose.orientation` (read-only) (experimental)
    Returns the orientation of the `Gamepad`, as a quaternion value.
- `GamepadPose.angularVelocity` (read-only) (experimental)
    Returns the angular velocity of the `Gamepad`, in radians per second.
- `GamepadPose.angularAcceleration` (read-only) (experimental)
    Returns the angular acceleration of the `Gamepad`, in meters per second per second.

## Examples

TBD.

## See also

- WebVR API
- Gamepad API
