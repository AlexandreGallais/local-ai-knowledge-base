---
title: "SerialPort: getInfo() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/serialport/getinfo/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SerialPort: getInfo() method

The **`getInfo()`** method of the `SerialPort` interface returns an object containing identifying information for the device available via the port.

## Syntax

```js
getInfo()
```

### Parameters

None.

### Return value

An object containing the following properties:

- `usbVendorId`
    If the port is part of a USB device, this property is a positive integer that identifies the device's vendor. If not, it is `undefined`.
- `usbProductId`
    If the port is part of a USB device, this property is a positive integer that identifies the USB device. If not, it is `undefined`.
- `bluetoothServiceClassId` (experimental)
    If the port is a Bluetooth RFCOMM service, this property is a positive integer or string representing the device's Bluetooth service class ID. If not, it is `undefined`.

## Examples

### Get information from a selected device

This snippet calls the `Serial.requestPort()` method when a `` is pressed.
We pass a filter to `requestPort()` to filter for Arduino Uno USB devices.
Once a port is requested, we call `getInfo()` to return the device's `usbProductId` and `usbVendorId`.

```html
<button id="connect">Connect</button>
```

```js
const connectBtn = document.getElementById("connect");

// Filter for devices with the Arduino Uno USB Vendor/Product IDs
const filters = [
  { usbVendorId: 0x2341, usbProductId: 0x0043 },
  { usbVendorId: 0x2341, usbProductId: 0x0001 },
];

connectBtn.addEventListener("click", async () => {
  try {
    // Prompt the user to select an Arduino Uno device
    const port = await navigator.serial.requestPort({ filters });

    // Return the device's identifying info
    const { usbProductId, usbVendorId } = port.getInfo();
  } catch (e) {
    // The user didn't select a device
  }
});
```
