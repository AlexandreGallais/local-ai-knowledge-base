---
title: "USBDevice: forget() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/usbdevice/forget/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# USBDevice: forget() method

The **`forget()`** method of the `USBDevice` interface returns a `Promise` that resolves when all pending operations are aborted, all open interfaces are released, the device session has ended, and the permission is reset.

## Syntax

```js
forget()
```

### Parameters

None.

### Return value

A `Promise` which resolves with `undefined` once the device access permission is revoked.
