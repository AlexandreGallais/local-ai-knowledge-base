---
title: "BluetoothRemoteGATTDescriptor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/bluetoothremotegattdescriptor/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# BluetoothRemoteGATTDescriptor

The `BluetoothRemoteGATTDescriptor` interface of the Web Bluetooth API provides a GATT Descriptor,
which provides further information about a characteristic's value.

## Instance properties

- `BluetoothRemoteGATTDescriptor.characteristic` (read-only) (experimental)
    Returns the `BluetoothRemoteGATTCharacteristic` this descriptor belongs
    to.
- `BluetoothRemoteGATTDescriptor.uuid` (read-only) (experimental)
    Returns the UUID of the characteristic descriptor, for
    example `"00002902-0000-1000-8000-00805f9b34fb"` for the Client
    Characteristic Configuration descriptor.
- `BluetoothRemoteGATTDescriptor.value` (read-only) (experimental)
    Returns the currently cached descriptor value. This value gets updated when the
    value of the descriptor is read.

## Instance methods

- `BluetoothRemoteGATTDescriptor.readValue()` (experimental)
    Returns a `Promise` that resolves to
    an `ArrayBuffer` holding a duplicate of the `value` property
    if it is available and supported. Otherwise it throws an error.
- `BluetoothRemoteGATTDescriptor.writeValue()` (experimental)
    Sets the value property to the bytes contained in an `ArrayBuffer` and
    returns a `Promise`.
