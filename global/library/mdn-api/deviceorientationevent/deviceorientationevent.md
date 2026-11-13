---
title: "DeviceOrientationEvent: DeviceOrientationEvent() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/deviceorientationevent/deviceorientationevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DeviceOrientationEvent: DeviceOrientationEvent() constructor

The **`DeviceOrientationEvent()`** constructor creates a new `DeviceOrientationEvent` object.

## Syntax

```js
new DeviceOrientationEvent(type)
new DeviceOrientationEvent(type, options)
```

### Parameters

- `type`
    A string with the name of the event.
    It is case-sensitive and browsers set it to `deviceorientation` or `deviceorientationabsolute`.
    In the latter case, `options.absolute` is always `true`.
- `options` (optional)
    An object that, _in addition of the properties defined in `Event()`_, can have the following properties:
    - `alpha` (optional)
        A number representing the motion of the device around the z axis,
        expressed in degrees with values ranging from 0 to 360.
        It defaults to `null`.
    - `beta` (optional)
        A number representing the motion of the device around the x axis,
        expressed in degrees with values ranging from -180 to 180.
        This represents a front to back motion of the device.
        It defaults to `null`.
    - `gamma` (optional)
        A number representing the motion of the device around the y axis,
        expressed in degrees with values ranging from -90 to 90.
        This represents a left to right motion of the device.
        It defaults to `null`.
    - `absolute`
        A boolean value that indicates whether or not the device is providing orientation data absolutely.
        It defaults to `false`.

### Return value

A new `DeviceOrientationEvent` object.
