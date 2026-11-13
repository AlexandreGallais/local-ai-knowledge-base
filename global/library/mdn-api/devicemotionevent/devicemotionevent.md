---
title: "DeviceMotionEvent: DeviceMotionEvent() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/devicemotionevent/devicemotionevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DeviceMotionEvent: DeviceMotionEvent() constructor

The **`DeviceMotionEvent()`** constructor creates a new `DeviceMotionEvent` object.

## Syntax

```js
new DeviceMotionEvent(type)
new DeviceMotionEvent(type, options)
```

### Parameters

- `type`
    A string with the name of the event.
    It is case-sensitive and browsers always set it to `devicemotion`.
- `options` (optional)
    An object that, _in addition of the properties defined in `Event()`_, can have the following properties:
    - `acceleration` (optional)
        A `DeviceMotionEventAcceleration` object giving the acceleration of the device on the three axis X, Y and Z. Acceleration is expressed in m/s². If not specified, every properties in the object will be `null`.
    - `accelerationIncludingGravity` (optional)
        A `DeviceMotionEventAcceleration` object giving the acceleration of the device on the three axis X, Y and Z with the effect of gravity. Acceleration is expressed in m/s². If not specified, every properties in the object will be `null`.
    - `rotationRate` (optional)
        A `DeviceMotionEventRotationRate` object giving the rate of change of the device's orientation on the three orientation axis alpha, beta and gamma. Rotation rate is express in degrees per seconds. If not specified, every properties in the object will be `null`.
    - `interval` (optional)
        A number representing the interval of time, in milliseconds, at which data is obtained from the device. It defaults to `0`.

### Return value

A new `DeviceMotionEvent` object.
