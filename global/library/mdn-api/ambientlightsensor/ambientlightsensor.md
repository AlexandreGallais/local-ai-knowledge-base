---
title: "AmbientLightSensor: AmbientLightSensor() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/ambientlightsensor/ambientlightsensor/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AmbientLightSensor: AmbientLightSensor() constructor

The **`AmbientLightSensor()`** constructor creates a new `AmbientLightSensor` object, which returns the current light level or illuminance of the ambient light around the hosting device.

## Syntax

```js
new AmbientLightSensor()
new AmbientLightSensor(options)
```

### Parameters

- `options` (optional)
    Currently only one option is supported:
    - `frequency` (optional)
        The desired number of times per second a sample should be taken, meaning the number of times per second that `reading` event will be called. A whole number or decimal may be used, the latter for frequencies less than a second. The actual reading frequency depends on the device hardware and consequently may be less than requested.

### Exceptions

- `SecurityError` `DOMException`
    Use of this feature was blocked by a Permissions Policy.

## See also

- `reading` event
