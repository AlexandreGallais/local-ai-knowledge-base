---
title: "SerialPort: writable property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/serialport/writable/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SerialPort: writable property

The **`writable`** read-only property of the `SerialPort` interface returns a `WritableStream` for sending data to the device connected to the port.
Chunks written to this stream must be instances of `ArrayBuffer`, `TypedArray`, or `DataView`. This property is non-null as long as the port is open and has not encountered a fatal error.

## Value

A `WritableStream`.

## Examples

### Writing a string to a port

The following example shows how to write a string to a port.
A `TextEncoder` converts the string to a `Uint8Array` before transmission.

```js
const encoder = new TextEncoder();
const writer = port.writable.getWriter();
await writer.write(encoder.encode("PING"));
writer.releaseLock();
```
