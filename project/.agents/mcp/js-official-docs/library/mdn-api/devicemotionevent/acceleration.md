---
title: "DeviceMotionEvent: acceleration property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/devicemotionevent/acceleration/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DeviceMotionEvent: acceleration property

The **`acceleration`** read-only property of the `DeviceMotionEvent` interface returns the acceleration recorded by
the device, in meters per second squared (m/s²).
This value does not include the effect of
the gravitational force, in contrast to `DeviceMotionEvent.accelerationIncludingGravity`.

> **Note:**
> If the hardware does not know how to remove gravity from the
> acceleration data, this value may not be present in the
> `DeviceMotionEvent`. In this situation, you'll need to use
> `DeviceMotionEvent.accelerationIncludingGravity` instead.

## Value

The `acceleration` property is an object providing information about
acceleration on the three axes in the Device coordinate frame. Each axis is represented with its own property:

- `x`
    Represents the acceleration along the x axis
- `y`
    Represents the acceleration along the y axis
- `z`
    Represents the acceleration along the z axis

## See also

- `Detecting device orientation`
- `Orientation and motion data explained`
- `devicemotion` event
