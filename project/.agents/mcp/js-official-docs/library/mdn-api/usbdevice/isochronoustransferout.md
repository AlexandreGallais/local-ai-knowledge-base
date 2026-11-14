---
title: "USBDevice: isochronousTransferOut() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/usbdevice/isochronoustransferout/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# USBDevice: isochronousTransferOut() method

The **`isochronousTransferOut()`** method of the
`USBDevice` interface returns a `Promise` that resolves with a `USBIsochronousOutTransferResult` when time sensitive information has been transmitted from the USB device.

## Syntax

```js
isochronousTransferOut(endpointNumber, data, packetLengths)
```

### Parameters

- `endpointNumber`
    The number of a device-specific endpoint (buffer).
- `data`
    A `TypedArray` containing the data to send to the device.
- `packetLengths`
    An array of lengths for the packets being transferred.

### Return value

A `Promise` that resolves with a `USBIsochronousOutTransferResult`.
