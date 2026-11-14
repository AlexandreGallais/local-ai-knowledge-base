---
title: "OrientationSensor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/orientationsensor/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# OrientationSensor

The **`OrientationSensor`** interface of the Sensor APIs is the base class for orientation sensors. This interface cannot be used directly. Instead it provides properties and methods accessed by interfaces that inherit from it.

This feature may be blocked by a Permissions Policy set on your server.

## Interfaces based on OrientationSensor

Below is a list of interfaces based on the OrientationSensor interface.

- `AbsoluteOrientationSensor`
- `RelativeOrientationSensor`

## Instance properties

- `OrientationSensor.quaternion` (read-only)
    Returns a four element `Array` whose elements contain the components of the unit quaternion representing the device's orientation.

## Instance methods

- `OrientationSensor.populateMatrix()`
    Populates the given object with the rotation matrix based on the latest sensor reading.

## Examples

### Basic <example-value>

The following example, which is loosely based on Intel's Orientation Phone demo, instantiates an `AbsoluteOrientationSensor` with a frequency of 60 times a second. On each reading it uses `OrientationSensor.quaternion` to rotate a visual model of a phone.

```js
const options = { frequency: 60, referenceFrame: "device" };
const sensor = new AbsoluteOrientationSensor(options);

sensor.addEventListener("reading", () => {
  // model is a Three.js object instantiated elsewhere.
  model.quaternion.fromArray(sensor.quaternion).inverse();
});
sensor.addEventListener("error", (error) => {
  if (event.error.name === "NotReadableError") {
    console.log("Sensor is not available.");
  }
});
sensor.start();
```

### Permissions Example

Using orientation sensors requires requesting permissions for multiple device sensors. Because the `Permissions` interface uses promises, a good way to request permissions is to use `Promise.all`.

```js
const sensor = new AbsoluteOrientationSensor();
Promise.all([
  navigator.permissions.query({ name: "accelerometer" }),
  navigator.permissions.query({ name: "magnetometer" }),
  navigator.permissions.query({ name: "gyroscope" }),
]).then((results) => {
  if (results.every((result) => result.state === "granted")) {
    sensor.start();
    // …
  } else {
    console.log("No permissions to use AbsoluteOrientationSensor.");
  }
});
```
