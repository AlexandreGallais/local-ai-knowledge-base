---
title: "GravitySensor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gravitysensor/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GravitySensor

The **`GravitySensor`** interface of the Sensor APIs provides on each reading the gravity applied to the device along all three axes.

To use this sensor, the user must grant permission to the `'accelerometer'` device sensor through the Permissions API. In addition, this feature may be blocked by a Permissions Policy set on your server.

## Constructor

- `GravitySensor()`
    Creates a new `GravitySensor` object.

## Instance properties

_Inherits properties from its ancestors, `Accelerometer`, `Sensor`, and `EventTarget`._

## Instance methods

_`GravitySensor` doesn't have own methods. However, it inherits methods from its parent interfaces, `Sensor` and `EventTarget`._

## Events

_`GravitySensor` doesn't have own events. However, it inherits events from its parent interface, `Sensor`._

## Example

Gravity is typically read in the `reading` event callback. In the example below this occurs sixty times a second.

```js
let gravitySensor = new GravitySensor({ frequency: 60 });

gravitySensor.addEventListener("reading", (e) => {
  console.log(`Gravity along the X-axis ${gravitySensor.x}`);
  console.log(`Gravity along the Y-axis ${gravitySensor.y}`);
  console.log(`Gravity along the Z-axis ${gravitySensor.z}`);
});

gravitySensor.start();
```
