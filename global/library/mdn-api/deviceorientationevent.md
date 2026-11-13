---
title: "DeviceOrientationEvent"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/deviceorientationevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DeviceOrientationEvent

The **`DeviceOrientationEvent`** interface of the `Device Orientation Events` provides web developers with information from the physical orientation of the device running the web page.

## Constructor

- `DeviceOrientationEvent.DeviceOrientationEvent()`
    Creates a new `DeviceOrientationEvent`.

## Instance properties

- `DeviceOrientationEvent.absolute` (read-only)
    A boolean that indicates whether or not the device is providing orientation data absolutely.
- `DeviceOrientationEvent.alpha` (read-only)
    A number representing the motion of the device around the z axis, express in degrees with values ranging from 0 (inclusive) to 360 (exclusive).
- `DeviceOrientationEvent.beta` (read-only)
    A number representing the motion of the device around the x axis, express in degrees with values ranging from -180 (inclusive) to 180 (exclusive). This represents a front to back motion of the device.
- `DeviceOrientationEvent.gamma` (read-only)
    A number representing the motion of the device around the y axis, express in degrees with values ranging from -90 (inclusive) to 90 (exclusive). This represents a left to right motion of the device.
- `DeviceOrientationEvent.webkitCompassHeading` (non-standard) (read-only)
    A number represents the difference between the motion of the device around the z axis of the world system and the direction of the north, express in degrees with values ranging from 0 to 360.
- `DeviceOrientationEvent.webkitCompassAccuracy` (non-standard) (read-only)
    The accuracy of the compass means that the deviation is positive or negative. It's usually 10.

## Static methods

- `DeviceOrientationEvent.requestPermission()`
    Requests the user's permission to access device orientation data. Returns a `Promise` that resolves with a string of `"granted"` or `"denied"`.

## Example

```js
window.addEventListener("deviceorientation", (event) => {
  console.log(`${event.alpha} : ${event.beta} : ${event.gamma}`);
});
```

## See also

- `Detecting device orientation`
- `Orientation and motion data explained`
- `DeviceMotionEvent`
- `devicemotion` event
- `deviceorientation` event
- `deviceorientationabsolute` event
