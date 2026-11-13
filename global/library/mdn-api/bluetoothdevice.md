---
title: "BluetoothDevice"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/bluetoothdevice/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# BluetoothDevice

The BluetoothDevice interface of the Web Bluetooth API represents a Bluetooth device inside a particular script execution
environment.

## Instance properties

- `BluetoothDevice.id` (experimental) (read-only)
    A string that uniquely identifies a device.
- `BluetoothDevice.name` (experimental) (read-only)
    A string that provides a human-readable name for the device.
- `BluetoothDevice.gatt` (experimental) (read-only)
    A reference to the device's `BluetoothRemoteGATTServer`.

## Instance methods

- `BluetoothDevice.watchAdvertisements()` (experimental)
    A `Promise` that resolves to `undefined` or is rejected with
    an error if advertisements can't be shown for any reason.
- `BluetoothDevice.forget()` (experimental)
    Provides a way for the page to revoke access to a device the user has granted access to.

## Events

Listen to these events using `addEventListener()` or by assigning an event listener to the `oneventname` property of this interface.

- `gattserverdisconnected` (experimental)
    Fired on a device when an active GATT connection is lost.
