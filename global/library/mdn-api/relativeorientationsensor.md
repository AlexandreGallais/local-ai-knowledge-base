---
title: "RelativeOrientationSensor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/relativeorientationsensor/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RelativeOrientationSensor

The **`RelativeOrientationSensor`** interface of the Sensor APIs describes the device's physical orientation without regard to the Earth's reference coordinate system.

To use this sensor, the user must grant permission to the `'accelerometer'`, and `'gyroscope'` device sensors through the Permissions API. In addition, this feature may be blocked by a Permissions Policy set on your server.

## Constructor

- `RelativeOrientationSensor()`
    Creates a new `RelativeOrientationSensor` object.

## Instance properties

_No specific properties; inherits properties from its ancestors `OrientationSensor` and `Sensor`._

## Instance methods

_No specific methods; inherits methods from its ancestors `OrientationSensor` and `Sensor`._

## Events

_No specific events; inherits events from its ancestor, `Sensor`._

## Examples

### Basic <example-value>

The following example, which is loosely based on Intel's Orientation Phone demo, instantiates a `RelativeOrientationSensor` with a frequency of 60 times a second.

> **Note:**
> The Intel demo this is based on uses the `AbsoluteOrientationSensor`. On each reading it uses `OrientationSensor.quaternion` to rotate a visual model of a phone.

```js
const options = { frequency: 60, referenceFrame: "device" };
const sensor = new RelativeOrientationSensor(options);

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
const sensor = new RelativeOrientationSensor();
Promise.all([
  navigator.permissions.query({ name: "accelerometer" }),
  navigator.permissions.query({ name: "gyroscope" }),
]).then((results) => {
  if (results.every((result) => result.state === "granted")) {
    sensor.start();
    // …
  } else {
    console.log("No permissions to use RelativeOrientationSensor.");
  }
});
```
