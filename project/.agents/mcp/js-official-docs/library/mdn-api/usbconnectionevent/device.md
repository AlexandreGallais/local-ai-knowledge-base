---
title: "USBConnectionEvent: device property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/usbconnectionevent/device/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# USBConnectionEvent: device property

The **`device`** read-only property of the `USBConnectionEvent` interface returns a `USBDevice` object representing the device being connected or disconnected.

## Value

A `USBDevice` object.

## Examples

Connecting a USB device fires the `connect` event. The current `USBDevice` is returned by calling `event.device`.

```js
navigator.usb.addEventListener("connect", (event) => {
  console.log(event.device);
});
```
