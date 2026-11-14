---
title: "USBDevice: transferOut() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/usbdevice/transferout/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# USBDevice: transferOut() method

The **`transferOut()`** method of the `USBDevice`
interface returns a `Promise` that resolves with a
`USBOutTransferResult` when bulk or interrupt data is sent to the USB
device.

## Syntax

```js
transferOut(endpointNumber, data)
```

### Parameters

- `endpointNumber`
    The number of a device-specific endpoint (buffer).
- `data`
    A `TypedArray` containing the data to send to the device.

### Return value

A `Promise` that resolves with a `USBOutTransferResult`.
