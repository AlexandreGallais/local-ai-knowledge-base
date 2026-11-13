---
title: "Bluetooth"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/bluetooth/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Bluetooth

The **`Bluetooth`** interface of the Web Bluetooth API provides methods to query Bluetooth availability and request access to devices.

## Instance properties

_Inherits properties from its parent `EventTarget`._

## Instance methods

- `Bluetooth.getAvailability()` (experimental)
    Returns a `Promise` that resolves to a boolean value indicating whether the user agent can support Bluetooth. Some user agents let the user configure an option that specifies what value is returned by this method.
- `Bluetooth.getDevices()` (experimental)
    Returns a `Promise` that resolves to an array of `BluetoothDevice`s this origin is allowed to access. Permission is obtained via previous calls to `Bluetooth.requestDevice()`.
- `Bluetooth.requestDevice()` (experimental)
    Returns a `Promise` that resolves to a `BluetoothDevice` object matching the specified options.
