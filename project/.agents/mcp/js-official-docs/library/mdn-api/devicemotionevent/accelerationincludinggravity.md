---
title: "DeviceMotionEvent: accelerationIncludingGravity property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/devicemotionevent/accelerationincludinggravity/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DeviceMotionEvent: accelerationIncludingGravity property

The **`accelerationIncludingGravity`** read-only property of the `DeviceMotionEvent` interface returns the
amount of acceleration recorded by the device, in meters per second squared (m/s²). Unlike `DeviceMotionEvent.acceleration`
which compensates for the influence of gravity, its value is the sum of the acceleration
of the device as induced by the user and an acceleration equal and opposite to that
caused by gravity. In other words, it measures the
g-force. In practice, this value represents
the raw data measured by an accelerometer.

This value is not typically as useful as `DeviceMotionEvent.acceleration`,
but may be the only value available on devices that aren't able to remove gravity from
the acceleration data, such as on devices that don't have a gyroscope.

> **Note:**
> `accelerationIncludingGravity`'s name can be misleading. This property represents acceleration including _the effects of_ gravity. For example, if a device is lying flat on a horizontal surface with the screen pointing up, gravity would be -9.8 along the Z axis, while `acceleration.z` would be 0 and `accelerationIncludingGravity.z` would be 9.8. Similarly, if a device is in free fall with its screen horizontal and pointing up, gravity would be -9.8 along the Z axis, while `acceleration.z` would be -9.8 and `accelerationIncludingGravity.z` would be 0.

## Value

The `accelerationIncludingGravity` property is an object providing
information about acceleration on three axis. Each axis is represented with its own
property:

- `x`
    Represents the acceleration upon the x axis which is the west to east axis
- `y`
    Represents the acceleration upon the y axis which is the south to north axis
- `z`
    Represents the acceleration upon the z axis which is the down to up axis

## See also

- `Detecting device orientation`
- `Orientation and motion data explained`
- `devicemotion` event
