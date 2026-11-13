---
title: "DeviceOrientationEvent: absolute property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/deviceorientationevent/absolute/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DeviceOrientationEvent: absolute property

The **`absolute`** read-only property of the `DeviceOrientationEvent` interface indicates whether or not the device is providing orientation data absolutely (that is,
in reference to the Earth's coordinate frame) or using some arbitrary frame determined
by the device.
See Orientation and motion data explained for details.

## Value

- `true` if the orientation data in `instanceOfDeviceOrientationEvent` is provided as the difference between the Earth's coordinate frame and the device's coordinate frame
- `false` if the orientation data is being provided in reference to some arbitrary, device-determined coordinate frame.

## See also

- `Detecting device orientation`
- `Orientation and motion data explained`
- `deviceorientation` event
- `deviceorientationabsolute` event
