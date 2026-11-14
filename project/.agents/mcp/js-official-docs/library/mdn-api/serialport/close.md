---
title: "SerialPort: close() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/serialport/close/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SerialPort: close() method

The **`close()`** method of the `SerialPort` interface returns a `Promise` that resolves when the port closes.

## Syntax

```js
close()
```

### Parameters

None.

### Return value

A `Promise`.

## Description

`close()` closes the serial port if previously-locked `SerialPort.readable` and `SerialPort.writable` members are unlocked, meaning the `releaseLock()` methods have been called for their respective reader and writer.

However, when continuously reading data from a serial device using a loop, the associated readable stream will always be locked until the reader encounters an error. In this case, calling `reader.cancel()` will force `reader.read()` to resolve immediately with `{ value: undefined, done: true }` allowing the loop to call `reader.releaseLock()`.

Closing a serial port is more complicated when using transform streams. See Close a serial port for guidance.

## Examples

### Closing a port after reading once the stream is done

The following example shows how to close a port after continuously reading data from it, once the stream is done.
A `keepReading` flag controls when to stop reading.
A button click sets `keepReading` to `false` and cancels the reader, which causes `reader.read()` to resolve immediately so the loop can release the lock and `close()` can be called.

```js
// Without transform streams.

let keepReading = true;
let reader;

async function readUntilClosed() {
  while (port.readable && keepReading) {
    reader = port.readable.getReader();
    try {
      while (true) {
        const { value, done } = await reader.read();
        if (done) {
          // reader.cancel() has been called.
          break;
        }
        // value is a Uint8Array.
        console.log(value);
      }
    } catch (error) {
      // Handle error...
    } finally {
      // Allow the serial port to be closed later.
      reader.releaseLock();
    }
  }

  await port.close();
}

const closedPromise = readUntilClosed();

document.querySelector("button").addEventListener("click", async () => {
  // User clicked a button to close the serial port.
  keepReading = false;
  // Force reader.read() to resolve immediately and subsequently
  // call reader.releaseLock() in the loop example above.
  reader.cancel();
  await closedPromise;
});
```
