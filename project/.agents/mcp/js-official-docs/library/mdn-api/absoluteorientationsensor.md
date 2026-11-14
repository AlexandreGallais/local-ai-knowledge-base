---
title: "AbsoluteOrientationSensor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/absoluteorientationsensor/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AbsoluteOrientationSensor

The **`AbsoluteOrientationSensor`** interface of the Sensor APIs describes the device's physical orientation in relation to the Earth's reference coordinate system.

To use this sensor, the user must grant permission to the `'accelerometer'`, `'gyroscope'`, and `'magnetometer'` device sensors through the Permissions API.

This feature may be blocked by a Permissions Policy set on your server.

## Constructor

- `AbsoluteOrientationSensor()`
    Creates a new `AbsoluteOrientationSensor` object.

## Instance properties

_No specific properties; inherits properties from its ancestors `OrientationSensor` and `Sensor`._

## Instance methods

_No specific methods; inherits methods from its ancestors `OrientationSensor` and `Sensor`._

## Events

_No specific events; inherits methods from its ancestor, `Sensor`._

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
sensor.addEventListener("error", (event) => {
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
