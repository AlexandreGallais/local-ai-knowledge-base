---
title: "SerialPort: forget() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/serialport/forget/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SerialPort: forget() method

The **`forget()`** method of the `SerialPort` interface returns a `Promise` that resolves when access to the serial port is revoked.

## Syntax

```js
forget()
```

### Parameters

None.

### Return value

A `Promise` that resolves with `undefined` once the connection is revoked.

## Description

A website can clean up permissions to access a serial port it is no longer interested in retaining by calling `forget()`.
Calling this "forgets" the device, resetting any previously-set permissions so the calling site can no longer communicate with the port.

For example, for an educational web application used on a shared computer with many devices, a large number of accumulated user-generated permissions creates a poor user experience.
The application should call `forget()` after each user device is disconnected, to clean up after each session.
