---
title: "USBDevice: configuration property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/usbdevice/configuration/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# USBDevice: configuration property

The **`configuration`** read-only property of the
`USBDevice` interface returns a `USBConfiguration` object for
the currently selected interface for a paired USB device.

## Value

A `USBConfiguration` object.

## Examples

The following example uses this property to test for the existence of a
USBConfiguration property to select a configuration before claiming an interface.

```js
async function connectDevice(usbDevice) {
  await usbDevice.open();
  if (usbDevice.configuration === null) await usbDevice.selectConfiguration(1);
  await usbDevice.claimInterface(0);
}
```
