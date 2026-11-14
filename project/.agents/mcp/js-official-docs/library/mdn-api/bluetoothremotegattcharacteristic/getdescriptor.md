---
title: "BluetoothRemoteGATTCharacteristic: getDescriptor() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/bluetoothremotegattcharacteristic/getdescriptor/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# BluetoothRemoteGATTCharacteristic: getDescriptor() method

The **`BluetoothRemoteGATTCharacteristic.getDescriptor()`** method
returns a `Promise` that resolves to the
first `BluetoothRemoteGATTDescriptor` for a given descriptor UUID.

## Syntax

```js
getDescriptor(bluetoothDescriptorUUID)
```

### Parameters

None.

### Return value

A `Promise` that resolves to the
first `BluetoothRemoteGATTDescriptor`.
