---
title: "SensorErrorEvent: SensorErrorEvent() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/sensorerrorevent/sensorerrorevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SensorErrorEvent: SensorErrorEvent() constructor

The **`SensorErrorEvent()`** constructor
creates a new `SensorErrorEvent` object which provides information about
errors thrown by any of the interfaces based on `Sensor`.

## Syntax

```js
new SensorErrorEvent(type, options)
```

### Parameters

- `type`
    A string with the name of the event.
    It is case-sensitive and browsers always set it to `error`.
- `options`
    An object that, _in addition of the properties defined in `Event()`_, can have the following properties:
    - `error`
        A `DOMException` object describing the error.

### Return value

A new `SensorErrorEvent` object.
