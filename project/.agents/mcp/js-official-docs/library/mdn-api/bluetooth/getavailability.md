---
title: "Bluetooth: getAvailability() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/bluetooth/getavailability/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Bluetooth: getAvailability() method

The **`getAvailability()`** method of the `Bluetooth` interface _nominally_ returns `true` if the user agent can support Bluetooth (because the device has a Bluetooth adapter), and `false` otherwise.

The word "nominally" is used because if permission to use the Web Bluetooth API is disallowed by the `Permissions-Policy: bluetooth` permission, the method will always return `false`.
In addition, a user can configure their browser to return `false` from a `getAvailability()` call even if the browser does have an operational Bluetooth adapter, and vice versa. This setting value is ignored if access is blocked by the permission.

Even if `getAvailability()` returns `true` and the device actually has a Bluetooth adaptor, this does not necessarily mean that calling `navigator.bluetooth.requestDevice()` will resolve with a `BluetoothDevice`.
The Bluetooth adapter may not be powered, and a user might deny permission to use the API when prompted.

## Syntax

```js
getAvailability()
```

### Parameters

None.

### Return value

A `Promise` that resolves with a `Boolean`.

The `Promise` will resolve with a value of `false` if access is disallowed by `Permissions-Policy: bluetooth`, if the user has configured the browser to always resolve with `false`, or if the device does not have a Bluetooth adapter.
Otherwise it will resolve with `true`.

### Exceptions

None.

## Examples

The following snippet prints out a message in the console specifying whether or not Bluetooth is supported by the device:

```js
navigator.bluetooth.getAvailability().then((available) => {
  if (available) {
    console.log("This device supports Bluetooth!");
  } else {
    console.log("Doh! Bluetooth is not supported");
  }
});
```
