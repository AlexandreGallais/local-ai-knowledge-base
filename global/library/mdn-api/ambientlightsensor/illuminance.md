---
title: "AmbientLightSensor: illuminance property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/ambientlightsensor/illuminance/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AmbientLightSensor: illuminance property

The **`illuminance`** read-only property of the `AmbientLightSensor` interface returns the current light level in lux of the ambient light level around the hosting device.

## Value

A `Number` indicating the current light level in lux.

## Examples

```js
if ("AmbientLightSensor" in window) {
  const sensor = new AmbientLightSensor();
  sensor.addEventListener("reading", (event) => {
    console.log("Current light level:", sensor.illuminance);
  });
  sensor.addEventListener("error", (event) => {
    console.log(event.error.name, event.error.message);
  });
  sensor.start();
}
```
