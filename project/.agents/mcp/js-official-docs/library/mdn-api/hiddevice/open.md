---
title: "HIDDevice: open() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/hiddevice/open/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HIDDevice: open() method

The **`open()`** method of the `HIDDevice` interface requests that the operating system opens the HID device.

> **Note:**
> HID devices are not opened automatically. Therefore, a `HIDDevice` returned by `HID.requestDevice()` must be opened with this method before it is available to transfer data.

## Syntax

```js
open()
```

### Parameters

None.

### Return value

A `Promise` that resolves with `undefined` once the connection is opened.

### Exceptions

- `InvalidStateError` `DOMException`
    Thrown if the connection is already open.
- `NotAllowedError` `DOMException`
    Thrown if the attempt to open the connection fails for any reason.

## Examples

In the following example, we wait for the HID connection to open before attempting to send or receive data.

```js
await device.open();
```
