---
title: "SerialPort: getSignals() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/serialport/getsignals/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SerialPort: getSignals() method

The **`getSignals()`** method of the `SerialPort` interface returns a `Promise` that resolves with an object containing the current state of the port's control signals.

## Syntax

```js
getSignals()
```

### Parameters

None.

### Return value

Returns a `Promise` that resolves with an object containing the following members:

- `clearToSend`
    A boolean indicating to the other end of a serial connection that is clear to send data.
- `dataCarrierDetect`
    A boolean that toggles the control signal needed to communicate over a serial connection.
- `dataSetReady`
    A boolean indicating whether the device is ready to send and receive data.
- `ringIndicator`
    A boolean indicating whether a ring signal should be sent down the serial connection.

### Exceptions

The returned `Promise` rejects with one of the following exceptions:

- `InvalidStateError` `DOMException`
    If `getSignals()` is called when the port is not open. Call `SerialPort.open()` to open the port first.
- `NetworkError` `DOMException`
    If the signals on the device could not be read.

## Examples

### Check whether the device is ready to send and receive data

The following example reads the control signals from an open port and checks the `dataSetReady` property to determine whether the connected device is ready to communicate.

```js
const signals = await port.getSignals();
console.log(`Device ready: ${signals.dataSetReady}`);
```
