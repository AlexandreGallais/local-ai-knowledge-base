---
title: "HIDDevice: opened property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/hiddevice/opened/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HIDDevice: opened property

The **`opened`** read-only property of the `HIDDevice` interface returns true if the connection to the `HIDDevice` is open and ready to transfer data.

## Value

A boolean value, true if the connection is open.

## Examples

The following example retrieves devices with `HID.getDevices()` and logs the value of `opened` to the console.

```js
let devices = await navigator.hid.getDevices();
devices.forEach((device) => {
  console.log(`HID: ${device.opened}`);
});
```
