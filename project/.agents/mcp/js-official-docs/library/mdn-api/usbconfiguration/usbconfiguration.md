---
title: "USBConfiguration: USBConfiguration() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/usbconfiguration/usbconfiguration/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# USBConfiguration: USBConfiguration() constructor

The **`USBConfiguration()`** constructor
creates a new `USBConfiguration` object which contains information about
the configuration on the provided USBDevice with the given configuration value.

## Syntax

```js
new USBConfiguration(device, configurationValue)
```

### Parameters

- `device`
    Specifies the `USBDevice` you want to configure.
- `configurationValue`
    Specifies the configuration descriptor you want to read. This is an unsigned integer in the range 0 to 255.
