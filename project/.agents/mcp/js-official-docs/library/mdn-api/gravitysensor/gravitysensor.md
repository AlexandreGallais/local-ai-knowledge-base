---
title: "GravitySensor: GravitySensor() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gravitysensor/gravitysensor/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GravitySensor: GravitySensor() constructor

The **`GravitySensor()`**
constructor creates a new `GravitySensor` object which
provides on each reading the gravity applied to the device along all three axes.

## Syntax

```js
new GravitySensor()
new GravitySensor(options)
```

### Parameters

- `options` (optional)
    Options are as follows:
    - `frequency` (optional)
        The desired number of times per second a sample should
        be taken, meaning the number of times per second that the
        `reading` event will be called. A whole number or decimal may be
        used, the latter for frequencies less than a second. The actual reading frequency
        depends on device hardware and consequently may be less than requested. The default
        frequency is the one defined by the underlying platform.
    - `referenceFrame` (optional)
        The local coordinate system representing
        the reference frame. It can be either `'device'` or
        `'screen'`. The default is `'device'`.

### Exceptions

- `SecurityError` `DOMException`
    Use of this feature was blocked by a Permissions Policy.

## See also

- `reading` event
