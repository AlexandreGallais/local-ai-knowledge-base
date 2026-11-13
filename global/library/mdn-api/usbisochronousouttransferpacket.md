---
title: "USBIsochronousOutTransferPacket"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/usbisochronousouttransferpacket/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# USBIsochronousOutTransferPacket

The `USBIsochronousOutTransferPacket` interface of the WebUSB API is part of the response from a call to the `isochronousTransferOut()` method of the `USBDevice` interface. It represents the status of an individual packet from a request to transfer data from the USB host to the USB device over an isochronous endpoint.

## Constructor

- `USBIsochronousOutTransferPacket()` (experimental)
    Creates a new `USBIsochronousOutTransferPacket` object with the provided `status` and `bytesWritten` fields.

## Instance properties

- `USBIsochronousOutTransferPacket.bytesWritten` (read-only) (experimental)
    Returns the number of bytes from the packet that were sent to the device.
- `USBIsochronousOutTransferPacket.status` (read-only) (experimental)
    Returns the status of the transfer request, one of:
    - `"ok"` - The transfer was successful.
    - `"stall"` - The device indicated an error by generating a stall condition on the endpoint. A stall on an isochronous endpoint does not need to be cleared.
