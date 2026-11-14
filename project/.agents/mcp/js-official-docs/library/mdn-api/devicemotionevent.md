---
title: "DeviceMotionEvent"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/devicemotionevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DeviceMotionEvent

The **`DeviceMotionEvent`** interface of the `Device Orientation Events` provides web developers with information about the speed of changes for the device's position and orientation.

> **Warning:**
> Currently, Firefox and Chrome do not handle the coordinates the same way. Take care about this while using them.

## Constructor

- `DeviceMotionEvent()`
    Creates a new `DeviceMotionEvent`.

## Instance properties

- `DeviceMotionEvent.acceleration` (read-only)
    An object giving the acceleration of the device on the three axis X, Y and Z. Acceleration is expressed in m/s².
- `DeviceMotionEvent.accelerationIncludingGravity` (read-only)
    An object giving the acceleration of the device on the three axis X, Y and Z with the effect of gravity. Acceleration is expressed in m/s².
- `DeviceMotionEvent.rotationRate` (read-only)
    An object giving the rate of change of the device's orientation on the three orientation axis alpha, beta and gamma. Rotation rate is expressed in degrees per seconds.
- `DeviceMotionEvent.interval` (read-only)
    A number representing the interval of time, in milliseconds, at which data is obtained from the device.

## Static methods

- `DeviceMotionEvent.requestPermission()`
    Requests the user's permission to access device motion data from the accelerometer and gyroscope sensors. Returns a `Promise` that resolves with a string of `"granted"` or `"denied"`.

## Example

```js
window.addEventListener("devicemotion", (event) => {
  console.log(`${event.acceleration.x} m/s2`);
});
```

## See also

- `Detecting device orientation`
- `Orientation and motion data explained`
- `DeviceOrientationEvent`
- `deviceorientation` event
- `deviceorientationabsolute` event
- `devicemotion` event
- `Accelerometer`
- `LinearAccelerationSensor`
