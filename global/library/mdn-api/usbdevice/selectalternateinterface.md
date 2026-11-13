---
title: "USBDevice: selectAlternateInterface() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/usbdevice/selectalternateinterface/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# USBDevice: selectAlternateInterface() method

The **`selectAlternateInterface()`** method of the
`USBDevice` interface returns a `Promise` that resolves when
the specified alternative endpoint is selected.

## Syntax

```js
selectAlternateInterface(interfaceNumber, alternateSetting)
```

### Parameters

- `interfaceNumber`
    The index of one of the interfaces supported by the device. Interfaces are
    device-specific.
- `alternateSetting`
    The configuration of the selected interface.

### Return value

A `Promise`.
