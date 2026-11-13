---
title: "USBDevice: releaseInterface() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/usbdevice/releaseinterface/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# USBDevice: releaseInterface() method

The **`releaseInterface()`** method of the
`USBDevice` interface returns a `Promise` that resolves when a
claimed interface is released from exclusive access.

## Syntax

```js
releaseInterface(interfaceNumber)
```

### Parameters

- `interfaceNumber`
    The device-specific index of the currently-claimed interface.

### Return value

A `Promise`.
