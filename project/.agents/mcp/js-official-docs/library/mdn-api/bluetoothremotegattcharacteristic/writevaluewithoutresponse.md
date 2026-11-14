---
title: "BluetoothRemoteGATTCharacteristic: writeValueWithoutResponse() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/bluetoothremotegattcharacteristic/writevaluewithoutresponse/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# BluetoothRemoteGATTCharacteristic: writeValueWithoutResponse() method

The **`BluetoothRemoteGATTCharacteristic.writeValueWithoutResponse()`** method sets a `BluetoothRemoteGATTCharacteristic` object's `value` property to the bytes contained in a given `ArrayBuffer`, `TypedArray`, or `DataView`, writes the characteristic value without response, and returns the resulting `Promise`.

## Syntax

```js
writeValueWithoutResponse(value)
```

### Parameters

- `value`
    An `ArrayBuffer`, `TypedArray`, or `DataView`.

### Return value

A `Promise`.
