---
title: "USBDevice: isochronousTransferIn() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/usbdevice/isochronoustransferin/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# USBDevice: isochronousTransferIn() method

The **`isochronousTransferIn()`** method of the `USBDevice` interface returns a `Promise` that resolves with a `USBIsochronousInTransferResult` when time sensitive information has been transmitted to (received by) the USB device.

## Syntax

```js
isochronousTransferIn(endpointNumber, packetLengths)
```

### Parameters

- `endpointNumber`
    The number of a device-specific endpoint (buffer).
- `packetLengths`
    An array of lengths for the packets being received.

### Return value

A `Promise` that resolves with a `USBIsochronousInTransferResult`.
