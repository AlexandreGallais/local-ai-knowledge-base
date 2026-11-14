---
title: "BluetoothUUID"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/bluetoothuuid/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# BluetoothUUID

The **`BluetoothUUID`** interface of the Web Bluetooth API provides a way to look up Universally Unique Identifier (UUID) values by name in the
registry maintained by the Bluetooth SIG.

## Static methods

- `BluetoothUUID.canonicalUUID()` (experimental)
    Returns the 128-bit UUID when passed the 16- or 32-bit UUID alias.
- `BluetoothUUID.getCharacteristic()` (experimental)
    Returns the 128-bit UUID representing a registered characteristic when passed a name or the 16- or 32-bit UUID alias.
- `BluetoothUUID.getDescriptor()` (experimental)
    Returns a UUID representing a registered descriptor when passed a name or the 16- or 32-bit UUID alias.
- `BluetoothUUID.getService()` (experimental)
    Returns a UUID representing a registered service when passed a name or the 16- or 32-bit UUID alias.

## Description

A UUID string is a 128-bit UUID, for example `00001818-0000-1000-8000-00805f9b34fb`.
The Bluetooth registry contains lists of descriptors, services, and characteristics identified by these UUIDs in addition to a 16- or 32- bit alias, and a name.

The `BluetoothUUID` interface provides methods to retrieve these 128-bit UUIDs.

## Examples

In the following example the UUID representing the service named `device_information` is returned and printed to the console.

```js
let result = BluetoothUUID.getService("device_information");
console.log(result); // "0000180a-0000-1000-8000-00805f9b34fb"
```
