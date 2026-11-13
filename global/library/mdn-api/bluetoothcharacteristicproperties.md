---
title: "BluetoothCharacteristicProperties"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/bluetoothcharacteristicproperties/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# BluetoothCharacteristicProperties

The **`BluetoothCharacteristicProperties`** interface of the Web Bluetooth API provides the operations that are valid on the given `BluetoothRemoteGATTCharacteristic`.

This interface is returned by calling `BluetoothRemoteGATTCharacteristic.properties`.

## Instance properties

- `authenticatedSignedWrites` (read-only) (experimental)
    Returns a `boolean` that is `true` if signed writing to the characteristic value is permitted.
- `broadcast` (read-only) (experimental)
    Returns a `boolean` that is `true` if the broadcast of the characteristic value is permitted using the Server Characteristic Configuration Descriptor.
- `indicate` (read-only) (experimental)
    Returns a `boolean` that is `true` if indications of the characteristic value with acknowledgement is permitted.
- `notify` (read-only) (experimental)
    Returns a `boolean` that is `true` if notifications of the characteristic value without acknowledgement is permitted.
- `read` (read-only) (experimental)
    Returns a `boolean` that is `true` if the reading of the characteristic value is permitted.
- `reliableWrite` (read-only) (experimental)
    Returns a `boolean` that is `true` if reliable writes to the characteristic is permitted.
- `writableAuxiliaries` (read-only) (experimental)
    Returns a `boolean` that is `true` if reliable writes to the characteristic descriptor is permitted.
- `write` (read-only) (experimental)
    Returns a `boolean` that is `true` if the writing to the characteristic with response is permitted.
- `writeWithoutResponse` (read-only) (experimental)
    Returns a `boolean` that is `true` if the writing to the characteristic without response is permitted.

## Examples

The following example shows how tell if a GATT characteristic supports value change notifications.

```js
let device = await navigator.bluetooth.requestDevice({
  filters: [{ services: ["heart_rate"] }],
});
let gatt = await device.gatt.connect();
let service = await gatt.getPrimaryService("heart_rate");
let characteristic = await service.getCharacteristic("heart_rate_measurement");
if (characteristic.properties.notify) {
  characteristic.addEventListener(
    "characteristicvaluechanged",
    async (event) => {
      console.log(`Received heart rate measurement: ${event.target.value}`);
    },
  );
  await characteristic.startNotifications();
}
```
