---
title: "Accelerometer"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/accelerometer/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Accelerometer

The **`Accelerometer`** interface of the Sensor APIs provides on each reading the acceleration applied to the device along all three axes.

To use this sensor, the user must grant permission to the `'accelerometer'`, device sensor through the Permissions API.

This feature may be blocked by a Permissions Policy set on your server.

## Constructor

- `Accelerometer()` (experimental)
    Creates a new `Accelerometer` object.

## Instance properties

_In addition to the properties listed below, `Accelerometer` inherits properties from its parent interfaces, `Sensor` and `EventTarget`._

- `Accelerometer.x` (read-only) (experimental)
    Returns a double containing the acceleration of the device along the device's x axis.
- `Accelerometer.y` (read-only) (experimental)
    Returns a double containing the acceleration of the device along the device's y axis.
- `Accelerometer.z` (read-only) (experimental)
    Returns a double containing the acceleration of the device along the device's z axis.

## Instance methods

_`Accelerometer` doesn't have its own methods. However, it inherits methods from its parent interfaces, `Sensor` and `EventTarget`._

## Events

_`Accelerometer` doesn't have its own events. However, it inherits events from its parent interface, `Sensor`._

## Example

Acceleration is typically read in the `reading` event callback. In the example below this occurs sixty times a second.

```js
const acl = new Accelerometer({ frequency: 60 });
acl.addEventListener("reading", () => {
  console.log(`Acceleration along the X-axis ${acl.x}`);
  console.log(`Acceleration along the Y-axis ${acl.y}`);
  console.log(`Acceleration along the Z-axis ${acl.z}`);
});

acl.start();
```
