---
title: "LinearAccelerationSensor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/linearaccelerationsensor/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# LinearAccelerationSensor

The **`LinearAccelerationSensor`** interface of the Sensor APIs provides on each reading the acceleration applied to the device along all three axes, but without the contribution of gravity.

To use this sensor, the user must grant permission to the `'accelerometer'` device sensor through the Permissions API. In addition, this feature may be blocked by a Permissions Policy set on your server.

## Constructor

- `LinearAccelerationSensor()`
    Creates a new `LinearAccelerationSensor` object.

## Instance properties

_Inherits properties from its ancestors, `Accelerometer`, `Sensor`, and `EventTarget`._

## Instance methods

_`LinearAccelerationSensor` doesn't have own methods. However, it inherits methods from its parent interfaces, `Sensor` and `EventTarget`._

## Events

_`LinearAccelerationSensor` doesn't have own events. However, it inherits events from its parent interface, `Sensor`._

## Example

Linear acceleration is typically read in the `reading` event callback. In the example below this occurs sixty times a second.

```js
let laSensor = new LinearAccelerationSensor({ frequency: 60 });

laSensor.addEventListener("reading", (e) => {
  console.log(`Linear acceleration along the X-axis ${laSensor.x}`);
  console.log(`Linear acceleration along the Y-axis ${laSensor.y}`);
  console.log(`Linear acceleration along the Z-axis ${laSensor.z}`);
});
laSensor.start();
```
