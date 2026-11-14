---
title: "BluetoothRemoteGATTCharacteristic"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/bluetoothremotegattcharacteristic/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# BluetoothRemoteGATTCharacteristic

The `BluetoothRemoteGattCharacteristic` interface of the Web Bluetooth API represents a GATT Characteristic, which is a basic data element that provides further information about a peripheral's service.

## Instance properties

- `BluetoothRemoteGATTCharacteristic.service` (read-only) (experimental)
    Returns the `BluetoothRemoteGATTService` this characteristic belongs to.
- `BluetoothRemoteGATTCharacteristic.uuid` (read-only) (experimental)
    Returns a string containing the UUID of the characteristic, for example `'00002a37-0000-1000-8000-00805f9b34fb'` for the Heart Rate Measurement characteristic.
- `BluetoothRemoteGATTCharacteristic.properties` (read-only) (experimental)
    Returns the properties of this characteristic.
- `BluetoothRemoteGATTCharacteristic.value` (read-only) (experimental)
    The currently cached characteristic value. This value gets updated when the value of the characteristic is read or updated via a notification or indication.

## Instance methods

- `BluetoothRemoteGATTCharacteristic.getDescriptor()` (experimental)
    Returns a `Promise` that resolves to the first `BluetoothRemoteGATTDescriptor` for a given descriptor UUID.
- `BluetoothRemoteGATTCharacteristic.getDescriptors()` (experimental)
    Returns a `Promise` that resolves to an `Array` of all `BluetoothRemoteGATTDescriptor` objects for a given descriptor UUID.
- `BluetoothRemoteGATTCharacteristic.readValue()` (experimental)
    Returns a `Promise` that resolves to a `DataView` holding a duplicate of the `value` property if it is available and supported. Otherwise it throws an error.
- `BluetoothRemoteGATTCharacteristic.writeValue()` (deprecated)
    Sets the `value` property to the bytes contained in a given `ArrayBuffer`, writes the characteristic value with optional response, and returns the resulting `Promise`.
- `BluetoothRemoteGATTCharacteristic.writeValueWithResponse()` (experimental)
    Sets the `value` property to the bytes contained in a given `ArrayBuffer`, writes the characteristic value with required response, and returns the resulting `Promise`.
- `BluetoothRemoteGATTCharacteristic.writeValueWithoutResponse()` (experimental)
    Sets the `value` property to the bytes contained in a given `ArrayBuffer`, writes the characteristic value without response, and returns the resulting `Promise`.
- `BluetoothRemoteGATTCharacteristic.startNotifications()` (experimental)
    Returns a `Promise` that resolves when `navigator.bluetooth` is added to the active notification context.
- `BluetoothRemoteGATTCharacteristic.stopNotifications()` (experimental)
    Returns a `Promise` that resolves when `navigator.bluetooth` is removed from the active notification context.

## Events

- `characteristicvaluechanged` (experimental)
    Fired on a `BluetoothRemoteGATTCharacteristic` when its value changes.
