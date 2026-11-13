---
title: "BluetoothRemoteGATTServer"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/bluetoothremotegattserver/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# BluetoothRemoteGATTServer

The **`BluetoothRemoteGATTServer`** interface of the Web Bluetooth API represents a GATT
Server on a remote device.

## Instance properties

- `BluetoothRemoteGATTServer.connected` (read-only) (experimental)
    A boolean value that returns true while this script execution environment is
    connected to `this.device`. It can be false while the user agent is
    physically connected.
- `BluetoothRemoteGATTServer.device` (read-only) (experimental)
    A reference to the `BluetoothDevice` running the server.

## Instance methods

- `BluetoothRemoteGATTServer.connect()` (experimental)
    Causes the script execution environment to connect to `this.device`.
- `BluetoothRemoteGATTServer.disconnect()` (experimental)
    Causes the script execution environment to disconnect from `this.device`.
- `BluetoothRemoteGATTServer.getPrimaryService()` (experimental)
    Returns a promise to the primary `BluetoothRemoteGATTService` offered by the
    Bluetooth device for a specified `BluetoothServiceUUID`.
- `BluetoothRemoteGATTServer.getPrimaryServices()` (experimental)
    Returns a promise to a list of primary `BluetoothRemoteGATTService` objects
    offered by the Bluetooth device for a specified `BluetoothServiceUUID`.
