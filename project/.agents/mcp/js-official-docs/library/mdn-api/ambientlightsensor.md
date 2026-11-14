---
title: "AmbientLightSensor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/ambientlightsensor/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AmbientLightSensor

The **`AmbientLightSensor`** interface of the Sensor APIs returns the current light level or illuminance of the ambient light around the hosting device.

To use this sensor, the user must grant permission to the `'ambient-light-sensor'` device sensor through the Permissions API.

This feature may be blocked by a Permissions Policy set on your server.

## Constructor

- `AmbientLightSensor()` (experimental)
    Creates a new `AmbientLightSensor` object.

## Instance properties

- `AmbientLightSensor.illuminance` (read-only) (experimental)
    Returns the current light level in lux of the ambient light level around the hosting device.

## Instance methods

_`AmbientLightSensor` doesn't have own methods. However, it inherits methods from its parent interfaces, `Sensor` and `EventTarget`._

## Events

_`AmbientLightSensor` doesn't have own events. However, it inherits events from its parent interface, `Sensor`._

## Example

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
