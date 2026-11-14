---
title: "USBDevice: claimInterface() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/usbdevice/claiminterface/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# USBDevice: claimInterface() method

The **`claimInterface()`** method of the
`USBDevice` interface returns a `Promise` that resolves when
the requested interface is claimed for exclusive access.

## Syntax

```js
claimInterface(interfaceNumber)
```

### Parameters

- `interfaceNumber`
    The index of one of the interfaces supported by the device. Interfaces are
    device specific.

### Return value

A `Promise`.

## Examples

The following example shows `claimInterface()` in the context of connecting
to a USB device.

```js
async function connectDevice(usbDevice) {
  await usbDevice.open();
  if (usbDevice.configuration === null) await usbDevice.selectConfiguration(1);
  await usbDevice.claimInterface(0);
}
```
