---
title: "USBIsochronousOutTransferResult"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/usbisochronousouttransferresult/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# USBIsochronousOutTransferResult

The `USBIsochronousOutTransferResult` interface of the WebUSB API provides the result from a call to the `isochronousTransferOut()` method of the `USBDevice` interface. It represents the result from requesting a transfer of data from the USB host to the USB device.

## Constructor

- `USBIsochronousOutTransferResult()` (experimental)
    Creates a new `USBIsochronousOutTransferResult` object with the provided `packet` field.

## Instance properties

- `USBIsochronousOutTransferResult.packets` (read-only) (experimental)
    Returns an array of `USBIsochronousOutTransferPacket` objects containing the result of each request to send a packet to the device.
