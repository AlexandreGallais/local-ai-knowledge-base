---
title: "SerialPort: setSignals() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/serialport/setsignals/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SerialPort: setSignals() method

The **`setSignals()`** method of the `SerialPort` interface sets control signals on the port and returns a `Promise` that resolves when they are set.

## Syntax

```js
setSignals()
setSignals(options)
```

### Parameters

- `options` (optional)
    An object with any of the following values:
    - `dataTerminalReady`
        A boolean indicating whether to invoke the operating system to either assert (if true) or de-assert (if false) the "data terminal ready" or "DTR" signal on the serial port.
    - `requestToSend`
        A boolean indicating whether to invoke the operating system to either assert (if true) or de-assert (if false) the "request to send" or "RTS" signal on the serial port.
    - `break`
        A boolean indicating whether to invoke the operating system to either assert (if true) or de-assert (if false) the "break" signal on the serial port.

### Return value

A `Promise`.

### Exceptions

The returned `Promise` rejects with one of the following exceptions:

- `InvalidStateError` `DOMException`
    If `setSignals()` is called when the port is not open. Call `SerialPort.open()` to open the port first.
- `NetworkError` `DOMException`
    If the signals on the device could not be set.

## Examples

### Assert the data terminal ready signal

The following example asserts the DTR signal when a connection is established.

```js
await port.open({ baudRate: 9600 });
await port.setSignals({ dataTerminalReady: true });
```
