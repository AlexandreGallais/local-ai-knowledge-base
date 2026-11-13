---
title: "AbsoluteOrientationSensor: AbsoluteOrientationSensor() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/absoluteorientationsensor/absoluteorientationsensor/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AbsoluteOrientationSensor: AbsoluteOrientationSensor() constructor

The **`AbsoluteOrientationSensor()`** constructor creates a new `AbsoluteOrientationSensor` object which describes the device's physical orientation in relation to the Earth's reference coordinate system.

## Syntax

```js
new AbsoluteOrientationSensor()
new AbsoluteOrientationSensor(options)
```

### Parameters

- `options` (optional)
    Options are as follows:
    - `frequency` (optional)
        The desired number of times per second a sample should be taken, meaning the number of times per second that the `reading` event will be called. A whole number or decimal may be used, the latter for frequencies less than a second. The actual reading frequency depends on the device hardware and consequently may be less than requested.
    - `referenceFrame` (optional)
        Either `'device'` or `'screen'`. The default is `'device'`.

## See also

- `reading` event
