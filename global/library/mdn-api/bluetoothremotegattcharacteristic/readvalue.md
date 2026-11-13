---
title: "BluetoothRemoteGATTCharacteristic: readValue() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/bluetoothremotegattcharacteristic/readvalue/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# BluetoothRemoteGATTCharacteristic: readValue() method

The **`BluetoothRemoteGATTCharacteristic.readValue()`** method
returns a `Promise` that resolves to a `DataView` holding a
duplicate of the `value` property if it is available and supported. Otherwise
it throws an error.

## Syntax

```js
readValue()
```

### Parameters

None.

### Return value

A `Promise` that resolves to a `DataView`.
