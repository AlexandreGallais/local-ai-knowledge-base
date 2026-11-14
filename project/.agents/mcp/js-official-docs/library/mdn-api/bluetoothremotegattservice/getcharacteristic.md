---
title: "BluetoothRemoteGATTService: getCharacteristic() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/bluetoothremotegattservice/getcharacteristic/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# BluetoothRemoteGATTService: getCharacteristic() method

The **`BluetoothGATTService.getCharacteristic()`** method
returns a `Promise` to an instance of
`BluetoothRemoteGATTCharacteristic` for a given universally unique identifier
(UUID).

## Syntax

```js
getCharacteristic(characteristic)
```

### Parameters

- `characteristic`
    The UUID of a characteristic, for
    example `'00002a37-0000-1000-8000-00805f9b34fb'` for the Heart Rate
    Measurement characteristic.

### Return value

A `Promise` to an instance of `BluetoothRemoteGATTCharacteristic`
