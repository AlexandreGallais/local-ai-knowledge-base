---
title: "BluetoothUUID: canonicalUUID() static method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/bluetoothuuid/canonicaluuid_static/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# BluetoothUUID: canonicalUUID() static method

The **`canonicalUUID()`** static method of the `BluetoothUUID` interface returns the 128-bit UUID when passed a 16- or 32-bit UUID alias.

## Syntax

```js
BluetoothUUID.canonicalUUID(alias)
```

### Parameters

- `alias`
    A string containing a 16-bit or 32-bit UUID alias.

### Return value

A 128-bit UUID.

## Examples

In the following example the UUID represented by the alias `0x110A` is returned and printed to the console.

```js
let result = BluetoothUUID.canonicalUUID("0x110A");
console.log(result); // "0000110a-0000-1000-8000-00805f9b34fb"
```
