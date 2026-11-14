---
title: "HIDConnectionEvent: device property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/hidconnectionevent/device/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HIDConnectionEvent: device property

The **`device`** read-only property of the `HIDConnectionEvent` interface returns the `HIDDevice` associated with this connection event.

## Value

A `HIDDevice`.

## Examples

The following example registers event listeners for `connect` and `disconnect` events, then prints the `HIDDevice.productName` to the console.

```js
navigator.hid.addEventListener("connect", ({ device }) => {
  console.log(`HID connected: ${device.productName}`);
});

navigator.hid.addEventListener("disconnect", ({ device }) => {
  console.log(`HID disconnected: ${device.productName}`);
});
```
