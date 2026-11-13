---
title: "USBConnectionEvent: USBConnectionEvent() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/usbconnectionevent/usbconnectionevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# USBConnectionEvent: USBConnectionEvent() constructor

The **`USBConnectionEvent()`** constructor creates a new `USBConnectionEvent` object.
This constructor is not typically used,
it is created by the browser in response to the connection and disconnection of a USB device.

## Syntax

```js
new USBConnectionEvent(type, options)
```

### Parameters

- `type`
    A string with the name of the event.
    It is case-sensitive and browsers set it to `connect` or `disconnect`.
- `options`
    An object that, _in addition of the properties defined in `Event()`_, can have the following properties:
    - `device`
        A `USBDevice` representing the USB device being connected or disconnected.

### Return value

A new `USBConnectionEvent` object.
