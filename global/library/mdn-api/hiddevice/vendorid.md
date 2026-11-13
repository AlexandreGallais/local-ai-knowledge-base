---
title: "HIDDevice: vendorId property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/hiddevice/vendorid/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HIDDevice: vendorId property

The **`vendorId`** read-only property of the `HIDDevice` interface returns the vendor ID of the connected HID device. This identifies the vendor of the device.

## Value

An integer. If the device has no vendor ID, or the vendor ID cannot be accessed this will return `0`.

## Examples

The following example retrieves devices with `HID.getDevices()` and logs the value of `vendorId` to the console.

```js
let devices = await navigator.hid.getDevices();
devices.forEach((device) => {
  console.log(`HID: ${device.vendorId}`);
});
```
