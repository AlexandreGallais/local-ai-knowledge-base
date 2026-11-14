---
title: "USBDevice: opened property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/usbdevice/opened/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# USBDevice: opened property

The **`opened`** read-only property of the
`USBDevice` interface indicates whether a session has been started with a
paired USB device. A device must be opened before it can be controlled by a web page.

## Value

A `Boolean`.

## Examples

This example is for a hypothetical USB device with a multi-colored LED. It shows how to
test that a device is open before calling `USBDevice.controlTransferOut` to
set a specified LED color.

> **Note:**
> What data can be passed to a USB device and how it is passed is particular and unique
> to each device.

```js
async function setDeviceColor(usbDevice, r, g, b) {
  if (device.opened) {
    // This hypothetical USB device requires that the data passed to
    // it be in a Uint8Array.
    const payload = new Uint8Array([r, g, b]);

    await usbDevice.controlTransferOut(
      {
        requestType: "vendor",
        recipient: "device",
        request: 1,
        value: 0,
        index: 0,
      },
      payload,
    );
  }
}
```
