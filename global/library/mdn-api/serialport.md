---
title: "SerialPort"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/serialport/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SerialPort

The `SerialPort` interface of the Web Serial API provides access to a serial port on the host device.

## Constructor

Instances of this interface may be obtained by calling methods of the `Serial` interface, therefore it has no constructor of its own.

## Instance properties

- `SerialPort.connected` (read-only)
    Returns a boolean value that indicates whether the port is logically connected to the device.
- `SerialPort.readable` (read-only)
    Returns a `ReadableStream` for receiving data from the device connected to the port.
- `SerialPort.writable` (read-only)
    Returns a `WritableStream` for sending data to the device connected to the port.

## Instance methods

- `SerialPort.forget()`
    Returns a `Promise` that resolves when access to the serial port is revoked. Calling this "forgets" the device, resetting any previously-set permissions so the calling site can no longer communicate with the port.
- `SerialPort.getInfo()`
    Returns an object containing identifying information for the device available via the port.
- `SerialPort.open()`
    Returns a `Promise` that resolves when the port is opened. By default the port is opened with 8 data bits, 1 stop bit and no parity checking.
- `SerialPort.setSignals()`
    Sets control signals on the port and returns a `Promise` that resolves when they are set.
- `SerialPort.getSignals()`
    Returns a `Promise` that resolves with an object containing the current state of the port's control signals.
- `SerialPort.close()`
    Returns a `Promise` that resolves when the port closes.

## Events

- `connect`
    Fired when the port connects to the device.
- `disconnect`
    Fired when the port disconnects from the device.

## Examples

### Opening a port

Before communicating on a serial port it must be opened. Opening the port allows the site to specify the necessary parameters that control how data is transmitted and received. Developers should check the documentation for the device they are connecting to for the appropriate parameters.

```js
await port.open({ baudRate: 9600 /* pick your baud rate */ });
```

Once the `Promise` returned by `open()` resolves the `readable` and `writable` attributes can be accessed to get the `ReadableStream` and `WritableStream` instances for receiving data from and sending data to the connected device.

### Reading data from a port

The following example shows how to read data from a port. The outer loop handles non-fatal errors, creating a new reader until a fatal error is encountered and `readable` becomes `null`.

```js
while (port.readable) {
  const reader = port.readable.getReader();
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) {
        // |reader| has been canceled.
        break;
      }
      // Do something with |value|…
    }
  } catch (error) {
    // Handle |error|…
  } finally {
    reader.releaseLock();
  }
}
```

### Writing data to a port

The following example shows how to write a string to a port. A `TextEncoder` converts the string to a `Uint8Array` before transmission.

```js
const encoder = new TextEncoder();
const writer = port.writable.getWriter();
await writer.write(encoder.encode("PING"));
writer.releaseLock();
```
