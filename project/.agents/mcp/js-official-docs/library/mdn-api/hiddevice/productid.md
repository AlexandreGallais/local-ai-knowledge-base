---
title: "HIDDevice: productId property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/hiddevice/productid/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HIDDevice: productId property

The **`productId`** read-only property of the `HIDDevice` interface returns the product ID of the connected HID device.

## Value

An integer. If the device has no product ID, or the product ID cannot be accessed this will return `0`.

## Examples

The following example retrieves devices with `HID.getDevices()` and logs the value of `productId` to the console.

```js
let devices = await navigator.hid.getDevices();
devices.forEach((device) => {
  console.log(`HID: ${device.productId}`);
});
```
