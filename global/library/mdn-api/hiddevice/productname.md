---
title: "HIDDevice: productName property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/hiddevice/productname/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HIDDevice: productName property

The **`productName`** read-only property of the `HIDDevice` interface returns the product name of the connected HID device.

## Value

A string.

## Examples

The following example retrieves devices with `HID.getDevices()` and logs the value of `productName` to the console.

```js
let devices = await navigator.hid.getDevices();
devices.forEach((device) => {
  console.log(`HID: ${device.productName}`);
});
```
