---
title: "Bluetooth: getDevices() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/bluetooth/getdevices/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Bluetooth: getDevices() method

The **`getDevices()`** method of the `Bluetooth` interface returns an array containing the Bluetooth devices that this origin is allowed to access — including those that are out of range and powered off.

## Syntax

```js
getDevices()
```

### Parameters

None.

### Return value

A `Promise` that resolves with an array of `BluetoothDevice` objects.

### Exceptions

- `SecurityError` `DOMException`
    Thrown if this operation is not permitted in this context due to security concerns, such as being called when access to the current document is blocked by the Permissions Policy directive `bluetooth`.
