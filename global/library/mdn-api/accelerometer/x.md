---
title: "Accelerometer: x property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/accelerometer/x/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Accelerometer: x property

The **`x`** read-only property of the `Accelerometer` interface returns a number specifying the acceleration of the device along its x-axis.

## Value

A `Number`.

## Examples

Acceleration is typically read in the `reading` event callback. In the example below this occurs sixty times a second.

```js
const accelerometer = new Accelerometer({ frequency: 60 });

accelerometer.addEventListener("reading", (e) => {
  console.log(`Acceleration along the X-axis ${accelerometer.x}`);
  console.log(`Acceleration along the Y-axis ${accelerometer.y}`);
  console.log(`Acceleration along the Z-axis ${accelerometer.z}`);
});
accelerometer.start();
```
