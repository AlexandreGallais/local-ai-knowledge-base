---
title: "USBDevice: selectConfiguration() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/usbdevice/selectconfiguration/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# USBDevice: selectConfiguration() method

The **`selectConfiguration()`** method of the
`USBDevice` interface returns a `Promise` that resolves when
the specified configuration is selected.

## Syntax

```js
selectConfiguration(configurationValue)
```

### Parameters

- `configurationValue`
    The number of a device-specific configuration.

### Return value

A `Promise`.
