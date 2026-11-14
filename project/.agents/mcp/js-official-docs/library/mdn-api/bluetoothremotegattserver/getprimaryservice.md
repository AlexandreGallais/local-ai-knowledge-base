---
title: "BluetoothRemoteGATTServer: getPrimaryService() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/bluetoothremotegattserver/getprimaryservice/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# BluetoothRemoteGATTServer: getPrimaryService() method

The **`BluetoothRemoteGATTServer.getPrimaryService()`** method
returns a promise to the primary `BluetoothRemoteGATTService` offered by the
Bluetooth device for a specified bluetooth service UUID.

## Syntax

```js
getPrimaryService(bluetoothServiceUUID)
```

### Parameters

- `bluetoothServiceUUID`
    A Bluetooth service universally unique identifier for a specified device, that is either a 128-bit UUID, a 16-bit or 32-bit UUID alias, or a string from the list of GATT assigned services keys.

### Return value

A `Promise` that resolves to a `BluetoothRemoteGATTService` object.
