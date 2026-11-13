---
title: "USBConfiguration"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/usbconfiguration/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# USBConfiguration

The `USBConfiguration` interface of the WebUSB API provides information about a particular configuration of a USB device and the interfaces that it supports.

## Constructor

- `USBConfiguration()` (experimental)
    Creates a new `USBConfiguration` object which contains information about the configuration on the provided `USBDevice` with the given configuration value.

## Instance properties

- `USBConfiguration.configurationValue` (read-only) (experimental)
    Returns the configuration value of this configuration. This is equal to the `bConfigurationValue` field of the configuration descriptor provided by the device defining this configuration.
- `USBConfiguration.configurationName` (read-only) (experimental)
    Returns the name provided by the device to describe this configuration. This is equal to the value of the string descriptor with the index provided in the `iConfiguration` field of the configuration descriptor defining this configuration.
- `USBConfiguration.interfaces` (read-only) (experimental)
    Returns an array containing instances of the `USBInterface` describing each interface supported by this configuration.
