---
title: "BluetoothRemoteGATTCharacteristic: getDescriptors() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/bluetoothremotegattcharacteristic/getdescriptors/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# BluetoothRemoteGATTCharacteristic: getDescriptors() method

The **`BluetoothRemoteGATTCharacteristic.getDescriptors()`** method
returns a `Promise` that resolves to an `Array` of all
`BluetoothRemoteGATTDescriptor` objects for a given descriptor UUID.

## Syntax

```js
getDescriptors(bluetoothDescriptorUUID)
```

### Parameters

None.

### Return value

A `Promise` that resolves to an `Array`
of `BluetoothRemoteGATTDescriptor` objects.
