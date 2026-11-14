---
title: "BluetoothUUID: getService() static method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/bluetoothuuid/getservice_static/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# BluetoothUUID: getService() static method

The **`getService()`** static method of the `BluetoothUUID` interface returns a UUID representing a registered service when passed a name or the 16- or 32-bit UUID alias.

## Syntax

```js
BluetoothUUID.getService(name)
```

### Parameters

- `name`
    A string containing the name of the service.

### Return value

A 128-bit UUID.

### Exceptions

- `TypeError`
    Thrown if `name` does not appear in the registry.

## Examples

In the following example the UUID representing the service named `device_information` is returned and printed to the console.

```js
let result = BluetoothUUID.getService("device_information");
console.log(result); // "0000180a-0000-1000-8000-00805f9b34fb"
```
