---
title: "USBInTransferResult"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/usbintransferresult/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# USBInTransferResult

The `USBInTransferResult` interface of the WebUSB API provides the result from a call to the `transferIn()` and `controlTransferIn()` methods of the `USBDevice` interface. It represents the result from requesting a transfer of data from the USB device to the USB host.

## Constructor

- `USBInTransferResult()` (experimental)
    Creates a new `USBInTransferResult` object with the provided `status` and `data` fields.

## Instance properties

- `USBInTransferResult.data` (read-only) (experimental)
    Returns a `DataView` object containing the data received from the USB device, if any.
- `USBInTransferResult.status` (read-only) (experimental)
    Returns the status of the transfer request, one of:
    - `"ok"` - The transfer was successful.
    - `"stall"` - The device indicated an error by generating a stall condition on the endpoint. A stall on the control endpoint does not need to be cleared. A stall on a bulk or interrupt endpoint must be cleared by calling `clearHalt()` before `transferIn()` can be called again.
    - `"babble"` - The device responded with more data than was expected.
