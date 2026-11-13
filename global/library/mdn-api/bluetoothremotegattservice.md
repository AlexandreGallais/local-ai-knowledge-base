---
title: "BluetoothRemoteGATTService"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/bluetoothremotegattservice/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# BluetoothRemoteGATTService

The `BluetoothRemoteGATTService` interface of the Web Bluetooth API represents a
service provided by a GATT server, including a device, a list of referenced services,
and a list of the characteristics of this service.

## Instance properties

- `BluetoothRemoteGATTService.device` (read-only) (experimental)
    Returns information about a Bluetooth device through an instance of
    `BluetoothDevice`.
- `BluetoothRemoteGATTService.isPrimary` (read-only) (experimental)
    Returns a boolean value indicating whether this is a primary or secondary
    service.
- `BluetoothRemoteGATTService.uuid` (read-only) (experimental)
    Returns a string representing the UUID of this service.

## Instance methods

- `BluetoothRemoteGATTService.getCharacteristic()` (experimental)
    Returns a `Promise` to an instance of
    `BluetoothRemoteGATTCharacteristic` for a given universally unique identifier
    (UUID).
- `BluetoothRemoteGATTService.getCharacteristics()` (experimental)
    Returns a `Promise` to an `Array` of
    `BluetoothRemoteGATTCharacteristic` instances for an optional universally
    unique identifier (UUID).
