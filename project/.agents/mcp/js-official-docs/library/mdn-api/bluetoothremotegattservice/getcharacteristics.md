---
title: "BluetoothRemoteGATTService: getCharacteristics() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/bluetoothremotegattservice/getcharacteristics/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# BluetoothRemoteGATTService: getCharacteristics() method

The **`BluetoothGATTService.getCharacteristics()`** method
returns a `Promise` to a list of `BluetoothRemoteGATTCharacteristic`
instances for a given universally unique identifier (UUID).

## Syntax

```js
getCharacteristics(characteristics)
```

### Parameters

- `characteristics`
    The UUID of a characteristic, for
    example `'00002a37-0000-1000-8000-00805f9b34fb'` for the Heart Rate
    Measurement characteristic.

### Return value

A `Promise` to an
`Array` of `BluetoothRemoteGATTCharacteristic` instances.
