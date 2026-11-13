---
title: "Magnetometer: z property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/magnetometer/z/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Magnetometer: z property

The **`z`** read-only property of the
`Magnetometer` interface returns a number specifying
the magnetic field around the device's z-axis.

## Value

A `Number`.

## Examples

The magnetometer is typically read in the `reading` event
callback. In the example below this occurs sixty times a second.

```js
let magSensor = new Magnetometer({ frequency: 60 });

magSensor.addEventListener("reading", (e) => {
  console.log(`Magnetic field along the X-axis ${magSensor.x}`);
  console.log(`Magnetic field along the Y-axis ${magSensor.y}`);
  console.log(`Magnetic field along the Z-axis ${magSensor.z}`);
});
magSensor.start();
```
