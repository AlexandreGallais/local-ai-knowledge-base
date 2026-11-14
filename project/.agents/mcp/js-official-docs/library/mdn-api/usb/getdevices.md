---
title: "USB: getDevices() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/usb/getdevices/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# USB: getDevices() method

The **`getDevices`** method of the `USB` interface
returns a `Promise` that resolves with an array of `USBDevice`
objects for paired attached devices. For information on pairing devices, see
`USB.requestDevice()`.

## Syntax

```js
getDevices()
```

### Parameters

None.

### Return value

A `Promise` that resolves with an array of `USBDevice`
objects.

## Examples

The following example logs the product name and serial number of paired devices to the
console. For information on pairing devices, see
`USB.requestDevice()`.

```js
navigator.usb.getDevices().then((devices) => {
  console.log(`Total devices: ${devices.length}`);
  devices.forEach((device) => {
    console.log(
      `Product name: ${device.productName}, serial number ${device.serialNumber}`,
    );
  });
});
```
