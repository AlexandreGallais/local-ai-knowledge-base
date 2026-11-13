---
title: "HIDDevice: close() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/hiddevice/close/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HIDDevice: close() method

The **`close()`** method of the `HIDDevice` interface closes the connection to the HID device.

## Syntax

```js
close()
```

### Parameters

None.

### Return value

A `Promise` that resolves with `undefined` once the connection is closed.

## Examples

In the following example we close the HID device, once all data has been sent and received.

```js
await device.close();
```
