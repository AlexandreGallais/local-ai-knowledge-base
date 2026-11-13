---
title: "RelativeOrientationSensor: RelativeOrientationSensor() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/relativeorientationsensor/relativeorientationsensor/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RelativeOrientationSensor: RelativeOrientationSensor() constructor

The **`RelativeOrientationSensor()`**
constructor creates a new `RelativeOrientationSensor` object which
describes the device's physical orientation.

## Syntax

```js
new RelativeOrientationSensor()
new RelativeOrientationSensor(options)
```

### Parameters

- `options` (optional)
    Options are as follows:
    - `frequency` (optional)
        The desired number of times per second a sample
        should be taken, meaning the number of times per second that the
        `reading` event will be called. A whole number or decimal
        may be used, the latter for frequencies less than a second. The actual
        reading frequency depends on device hardware and consequently may be less
        than requested.
    - `referenceFrame` (optional)
        Either `'device'` or
        `'screen'`. The default is `'device'`.

### Exceptions

- `SecurityError` `DOMException`
    Use of this feature was blocked by a Permissions Policy.

## See also

- `reading` event
