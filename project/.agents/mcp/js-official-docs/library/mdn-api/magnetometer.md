---
title: "Magnetometer"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/magnetometer/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Magnetometer

The **`Magnetometer`** interface of the Sensor APIs provides information about the magnetic field as detected by the device's primary magnetometer sensor.

To use this sensor, the user must grant permission to the `'magnetometer'` device sensor through the Permissions API. In addition, this feature may be blocked by a Permissions Policy set on your server.

## Constructor

- `Magnetometer()` (experimental)
    Creates a new `Magnetometer` object.

## Instance properties

- `Magnetometer.x` (read-only) (experimental)
    Returns a double containing the magnetic field around the device's x axis.
- `Magnetometer.y` (read-only) (experimental)
    Returns a double containing the magnetic field around the device's y axis.
- `Magnetometer.z` (read-only) (experimental)
    Returns a double containing the magnetic field around the device's z axis.

## Instance methods

_`Magnetometer` doesn't have own methods. However, it inherits methods from its parent interfaces, `Sensor` and `EventTarget`._

## Events

_`Magnetometer` doesn't have own events. However, it inherits events from its parent interface, `Sensor`._

## Example

The magnetometer is typically read in the `reading` event callback. In the example below this occurs sixty times a second.

```js
let magSensor = new Magnetometer({ frequency: 60 });

magSensor.addEventListener("reading", (e) => {
  console.log(`Magnetic field along the X-axis ${magSensor.x}`);
  console.log(`Magnetic field along the Y-axis ${magSensor.y}`);
  console.log(`Magnetic field along the Z-axis ${magSensor.z}`);
});
magSensor.start();
```
