---
title: "HIDDevice"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/hiddevice/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HIDDevice

The **`HIDDevice`** interface of the WebHID API represents a HID Device. It provides properties for accessing information about the device, methods for opening and closing the connection, and the sending and receiving of reports.

## Instance properties

This interface also inherits properties from `EventTarget`.

- `HIDDevice.opened` (read-only) (experimental)
    Returns a `Boolean`, true if the device has an open connection.
- `HIDDevice.vendorId` (read-only) (experimental)
    Returns the vendorId of the HID device.
- `HIDDevice.productId` (read-only) (experimental)
    Returns the productId of the HID device.
- `HIDDevice.productName` (read-only) (experimental)
    Returns a string containing the product name of the HID device.
- `HIDDevice.collections` (read-only) (experimental)
    Returns an array of report formats for the HID device.

## Instance methods

This interface also inherits methods from `EventTarget`.

- `HIDDevice.open()` (experimental)
    Opens a connection to this HID device, and returns a `Promise` which resolves once the connection has been successful.
- `HIDDevice.close()` (experimental)
    Closes the connection to this HID device, and returns a `Promise` which resolves once the connection has been closed.
- `HIDDevice.forget()` (experimental)
    Closes the connection to this HID device and resets access permission, and returns a `Promise` which resolves once the permission was reset.
- `HIDDevice.sendReport()` (experimental)
    Sends an output report to this HID Device, and returns a `Promise` which resolves once the report has been sent.
- `HIDDevice.sendFeatureReport()` (experimental)
    Sends a feature report to this HID device, and returns a `Promise` which resolves once the report has been sent.
- `HIDDevice.receiveFeatureReport()` (experimental)
    Receives a feature report from this HID device in the form of a `Promise` which resolves with a `DataView`. This allows typed access to the contents of this message.

## Events

- `inputreport` (experimental)
    Fires when a report is sent from the device.

## Examples

The following example demonstrates listening for an `inputreport` event that will allow the application to detect which button is pressed on a Joy-Con Right device.

```js
device.addEventListener("inputreport", (event) => {
  const { data, device, reportId } = event;

  // Handle only the Joy-Con Right device and a specific report ID.
  if (device.productId !== 0x2007 && reportId !== 0x3f) return;

  const value = data.getUint8(0);
  if (value === 0) return;

  const someButtons = { 1: "A", 2: "X", 4: "B", 8: "Y" };
  console.log(`User pressed button ${someButtons[value]}.`);
});
```

In the following example `sendFeatureReport` is used to make a device blink.

```js
const reportId = 1;
for (let i = 0; i < 10; i++) {
  // Turn off
  await device.sendFeatureReport(reportId, Uint32Array.from([0, 0]));
  await new Promise((resolve) => setTimeout(resolve, 100));
  // Turn on
  await device.sendFeatureReport(reportId, Uint32Array.from([512, 0]));
  await new Promise((resolve) => setTimeout(resolve, 100));
}
```

You can see more examples, and live demos in the article Connecting to uncommon HID devices.
