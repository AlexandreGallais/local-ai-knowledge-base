---
title: "DeviceMotionEvent: rotationRate property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/devicemotionevent/rotationrate/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DeviceMotionEvent: rotationRate property

The **`rotationRate`** read-only property of the `DeviceMotionEvent` interface returns the rate at which the device is rotating around each of its axes in degrees per
second.

> **Note:**
> If the hardware isn't capable of providing this
> information, this property returns `null`.

## Value

The `rotationRate` property is a read-only object describing the rotation
rates of the device around each of its axes:

- `alpha`
    The rate at which the device is rotating about its X axis; that is, front to back.
- `beta`
    The rate at which the device is rotating about its Y axis; that is, side to side.
- `gamma`
    The rate at which the device is rotating about its Z axis; that is, being twisted
    about a line perpendicular to the screen.

## See also

- `Detecting device orientation`
- `Orientation and motion data explained`
- `devicemotion` event
