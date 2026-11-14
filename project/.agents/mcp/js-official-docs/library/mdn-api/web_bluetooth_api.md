---
title: "Web Bluetooth API"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/web_bluetooth_api/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Web Bluetooth API

The Web Bluetooth API provides the ability to connect and interact with Bluetooth Low Energy peripherals.

> **Note:**
> This API is _not available_ in Web Workers (not exposed via `WorkerNavigator`).

## Interfaces

- `Bluetooth`
    Provides methods to query Bluetooth availability and request access to devices.
- `BluetoothCharacteristicProperties`
    Provides properties of a particular `BluetoothRemoteGATTCharacteristic`.
- `BluetoothDevice`
    Represents a Bluetooth device inside a particular script execution environment.
- `BluetoothRemoteGATTCharacteristic`
    Represents a GATT Characteristic, which is a basic data element that provides further information about a peripheral's service.
- `BluetoothRemoteGATTDescriptor`
    Represents a GATT Descriptor, which provides further information about a characteristic's value.
- `BluetoothRemoteGATTServer`
    Represents a GATT Server on a remote device.
- `BluetoothRemoteGATTService`
    Represents a service provided by a GATT server, including a device, a list of referenced services, and a list of the characteristics of this service.

## Extensions to other interfaces

The Bluetooth API extends the following APIs, adding the listed features.

### Navigator

- `Navigator.bluetooth`
    Returns a `Bluetooth` object for the current document, providing access to Web Bluetooth API functionality.

## Security considerations

The Web Bluetooth API can only be used in a secure context.

Access to the API is controlled by the Permissions Policy directive `bluetooth`.
The default allowlist for the `bluetooth` policy is `self`, which enables Bluetooth usage in same-origin nested frames but prevents access by third-party content by default.
Cross-origin access is enabled by specifying the allowed origins in both the `Permissions-Policy: bluetooth` HTTP header and the desired ``.

In order to use the feature the user must first grant explicit permission (they will not be prompted for access if it is not allowed for other reasons, such as being blocked by a Permissions Policy).
The permission prompt is displayed when calling `Bluetooth.requestDevice()` to request access to a new Bluetooth device for which permission is not granted (the owning global object must also have transient activation).
You can use `Bluetooth.getDevices()` to retrieve any devices that have previously been granted permission for the site.

The Permissions API `navigator.permissions.query()` method can be used with the `bluetooth` permission to test whether a site has permission to use Bluetooth devices.
The permission state will be `granted`, `denied` or `prompt` (requires user acknowledgement of a prompt):

```js
const btPermission = await navigator.permissions.query({ name: "bluetooth" });
if (btPermission.state !== "denied") {
  // Do something
}
```

<!--
You can also use `query()` to directly retrieve devices that have previously been granted permission for the site.
For example, the following code (modified from the example in the specification) returns the last Bluetooth device that was used, and for which the user granted permission:

```js
const btPermission = await navigator.permissions.query({
  name: "bluetooth",
  deviceId: sessionStorage.lastDevice,
});
if (result.devices.length === 1) {
  return result.devices[0];
} else {
  throw new DOMException("Lost permission", "NotFoundError");
}
```

Note that the options that can be passed to `query()` for the `bluetooth` permission are the same as the options that can be passed as arguments to `Bluetooth.requestDevice()`.
The returned `Promise` resolves to a `BluetoothPermissionResult`, an extended `PermissionStatus` object that returns an array of permitted devices in its `devices` property.
-->
