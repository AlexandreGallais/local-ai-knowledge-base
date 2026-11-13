---
title: "USBDevice: controlTransferIn() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/usbdevice/controltransferin/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# USBDevice: controlTransferIn() method

The **`controlTransferIn()`** method of the `USBDevice` interface returns a `Promise` that resolves with a `USBInTransferResult` when a command or status request has been transmitted to (received by) the USB device.

## Syntax

```js
controlTransferIn(setup, length)
```

### Parameters

- `setup`
    An object that sets options for. The available options are:
    - `requestType`
        Must be one of three values specifying whether the transfer is `"standard"` (common to all USB devices) `"class"` (common to an industry-standard class of devices) or `"vendor"`.
    - `recipient`
        Specifies the target of the transfer on the device, one of `"device"`, `"interface"`, `"endpoint"`, or `"other"`.
    - `request`
        A vendor-specific command.
    - `value`
        Vendor-specific request parameters.
    - `index`
        The interface number of the recipient.

- `length`
    The maximum number of bytes to read from the device. The actual data is in the `USBInTransferResult` in the resolved Promise.

### Return value

`Promise` that resolves with a `USBInTransferResult`.
