---
title: "BluetoothUUID: getDescriptor() static method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/bluetoothuuid/getdescriptor_static/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# BluetoothUUID: getDescriptor() static method

The **`getDescriptor()`** static method of the `BluetoothUUID` interface returns a UUID representing a registered descriptor when passed a name or the 16- or 32-bit UUID alias.

## Syntax

```js
BluetoothUUID.getDescriptor(name)
```

### Parameters

- `name`
    A string containing the name of the descriptor.

### Return value

A 128-bit UUID.

### Exceptions

- `TypeError`
    Thrown if `name` does not appear in the registry.

## Examples

In the following example the UUID representing the descriptor named `time_trigger_setting` is returned and printed to the console.

```js
let result = BluetoothUUID.getDescriptor("time_trigger_setting");
console.log(result); // "0000290e-0000-1000-8000-00805f9b34fb"
```
