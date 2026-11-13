---
title: "Gyroscope"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gyroscope/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Gyroscope

The **`Gyroscope`** interface of the Sensor APIs provides on each reading the angular velocity of the device along all three axes.

To use this sensor, the user must grant permission to the `'gyroscope'` device sensor through the Permissions API. In addition, this feature may be blocked by a Permissions Policy set on your server.

## Constructor

- `Gyroscope()`
    Creates a new `Gyroscope` object.

## Instance properties

- `Gyroscope.x` (read-only)
    Returns a double, containing the angular velocity of the device along the device's x axis.
- `Gyroscope.y` (read-only)
    Returns a double, containing the angular velocity of the device along the device's y axis.
- `Gyroscope.z` (read-only)
    Returns a double, containing the angular velocity of the device along the device's z axis.

## Instance methods

_`Gyroscope` doesn't have own methods. However, it inherits methods from its parent interfaces, `Sensor` and `EventTarget`._

## Events

_`Gyroscope` doesn't have own events. However, it inherits events from its parent interface, `Sensor`._

## Example

The gyroscope is typically read in the `reading` event callback. In the example below this occurs sixty times a second.

```js
let gyroscope = new Gyroscope({ frequency: 60 });

gyroscope.addEventListener("reading", (e) => {
  console.log(`Angular velocity along the X-axis ${gyroscope.x}`);
  console.log(`Angular velocity along the Y-axis ${gyroscope.y}`);
  console.log(`Angular velocity along the Z-axis ${gyroscope.z}`);
});
gyroscope.start();
```
