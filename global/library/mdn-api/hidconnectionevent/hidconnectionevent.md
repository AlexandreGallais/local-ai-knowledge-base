---
title: "HIDConnectionEvent: HIDConnectionEvent() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/hidconnectionevent/hidconnectionevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HIDConnectionEvent: HIDConnectionEvent() constructor

The **`HIDConnectionEvent()`** constructor creates a new `HIDConnectionEvent` object. Typically this constructor is not used as events are created when a device's connection state changes.

## Syntax

```js
new HIDConnectionEvent(type, options)
```

### Parameters

- `type`
    A string with the name of the event.
    It is case-sensitive and browsers set it to `connect` or `disconnect`.
- `options`
    An object that, _in addition of the properties defined in `Event()`_, can have the following properties:
    - `device`
        The `HIDDevice` instance representing the device being connected or disconnected.

### Return value

A new `HIDConnectionEvent` object.
