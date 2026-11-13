---
title: "BluetoothRemoteGATTServer: getPrimaryServices() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/bluetoothremotegattserver/getprimaryservices/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# BluetoothRemoteGATTServer: getPrimaryServices() method

The **BluetoothRemoteGATTServer.getPrimaryServices()** method returns a
promise to a list of primary `BluetoothRemoteGATTService` objects offered by the
Bluetooth device for a specified `BluetoothServiceUUID`.

## Syntax

```js
getPrimaryServices(bluetoothServiceUUID)
```

### Parameters

- `bluetoothServiceUUID`
    A Bluetooth service universally unique identifier for a specified device.

### Return value

A `Promise` that resolves to a list of `BluetoothRemoteGATTService`
objects.
