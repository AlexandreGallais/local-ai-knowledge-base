---
title: "USBInterface"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/usbinterface/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# USBInterface

The `USBInterface` interface of the WebUSB API provides information about an interface provided by the USB device. An interface represents a feature of the device which implements a particular protocol and may contain endpoints for bidirectional communication.

## Constructor

- `USBInterface()` (experimental)
    Creates a new `USBInterface` object which will be populated with information about the interface on the provided `USBConfiguration` with the given interface number.

## Instance properties

- `USBInterface.interfaceNumber` (read-only) (experimental)
    Returns the interface number of this interface. This is equal to the `bInterfaceNumber` field of the interface descriptor defining this interface.
- `USBInterface.alternate` (read-only) (experimental)
    Returns the currently selected alternative configuration of this interface. By default this is the `USBAlternateInterface` from `alternates` with `alternateSetting` equal to `0`. It can be changed by calling `USBDevice.selectAlternateInterface()` with any other value found in `alternates`.
- `USBInterface.alternates` (read-only) (experimental)
    Returns an array containing instances of the `USBAlternateInterface` interface describing each of the alternative configurations possible for this interface.
- `USBInterface.claimed` (read-only) (experimental)
    Returns whether or not this interface has been claimed by the current page by calling `USBDevice.claimInterface()`.
