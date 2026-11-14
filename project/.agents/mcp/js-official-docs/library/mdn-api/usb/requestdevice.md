---
title: "USB: requestDevice() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/usb/requestdevice/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# USB: requestDevice() method

The **`requestDevice()`** method of the `USB`
interface returns a `Promise` that resolves with an instance of
`USBDevice` if the specified device is found. Calling this function
triggers the user agent's pairing flow.

## Syntax

```js
requestDevice(options)
```

### Parameters

- `options`
    An object that sets options for selecting an appropriate device.
    The available options are:
    - `filters`
        An array of filter objects for possible devices you would like to pair. Each filter
        object can have the following properties:
        - `vendorId`
        - `productId`
        - `classCode`
        - `subclassCode`
        - `protocolCode`
        - `serialNumber`
    - `exclusionFilters` (optional)
        An array of filter objects representing devices to exclude from the pairing flow. These objects have the same properties as those in `filters`. Exclusion takes priority over inclusion.

### Return value

A `Promise` that resolves with an instance of `USBDevice`.

## Security

Transient user activation is required. The user has to interact with the page or a UI element in order for this feature to work.

## Examples

### Requesting specific USB devices

The following example looks for one of two USB devices. Notice that two product IDs are
specified. Both are passed to `requestDevice()`. This triggers a user-agent
flow that prompts the user to select a device for pairing. Only the selected device is
passed to `then()`.

The number of filters does not specify the number of devices shown by the user agent.
For example, if only a USB device with product ID `0xa800` is found, then
only one device will be listed by the user agent. On the other hand if the user agent
finds two of the first listed device and one of the second, then all three devices will
be listed.

```js
const filters = [
  { vendorId: 0x1209, productId: 0xa800 },
  { vendorId: 0x1209, productId: 0xa850 },
];
navigator.usb
  .requestDevice({ filters })
  .then((usbDevice) => {
    console.log(`Product name: ${usbDevice.productName}`);
  })
  .catch((e) => {
    console.error(`There is no device. ${e}`);
  });
```

### Excluding devices

The following example requests a device with vendor ID `0x1209`; it excludes devices with that vendor ID that have the product ID `0xa850`:

```js
navigator.usb
  .requestDevice({
    filters: [{ vendorId: 0x1209 }],
    exclusionFilters: [{ vendorId: 0x1209, productId: 0xa850 }],
  })
  .then((usbDevice) => {
    console.log(`Product name: ${usbDevice.productName}`);
  })
  .catch((e) => {
    console.error(`There is no device. ${e}`);
  });
```
