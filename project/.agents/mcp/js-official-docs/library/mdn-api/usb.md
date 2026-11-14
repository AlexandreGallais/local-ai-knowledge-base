---
title: "USB"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/usb/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# USB

The **`USB`** interface of the WebUSB API provides attributes and methods for finding and connecting USB devices from a web page.

Use `navigator.usb` to get access to the `USB` object.

The USB interface inherits from `EventTarget`.

## Instance properties

None.

## Instance methods

- `USB.getDevices()` (experimental)
    Returns a `Promise` that resolves with an array of `USBDevice` objects for paired attached devices.
- `USB.requestDevice()` (experimental)
    Returns a `Promise` that resolves with an instance of `USBDevice` if the specified device is found. Calling this function triggers the user agent's pairing flow.

## Events

- `connect` (experimental)
    Fired whenever a previously paired device is connected.
- `disconnect` (experimental)
    Fired whenever a paired device is disconnected.
