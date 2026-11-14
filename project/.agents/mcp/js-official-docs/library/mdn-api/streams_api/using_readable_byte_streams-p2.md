---
title: "Using readable byte streams (part 2 of 4)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/streams_api/using_readable_byte_streams/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Using readable byte streams (part 2 of 4)

## Examples

### Underlying push source with byte reader

This live example shows how to create a readable byte stream with a _push_ underlying byte source, and read it using a byte reader.

Unlike with a pull underlying byte source, data can arrive at any time.
Therefore the underlying source must use `controller.byobRequest` to transfer incoming data if one exists, and otherwise enqueue the data into the stream's internal queues.
Further, since the data can arrive at any time the monitoring behavior is set up in the `underlyingSource.start()` callback function.

The example is highly influenced by a push byte source example in the stream specification.
It uses a mocked "hypothetical socket" source that supplies data of arbitrary sizes.
The reader is deliberately delayed at various points to allow the underlying source to use both transfer and enqueuing to send data to the stream.
Backpressure support is not demonstrated.

> **Note:**
> An underlying byte source can also be used with a default reader.
> If automatic buffer allocation is enabled the controller will supply fixed-size buffers for zero-copy transfers when there is an outstanding request from a reader and the stream's internal queues are empty.
> If automatic buffer allocation is not enabled then all data from the byte stream will always be enqueued.
> This is similar to the behavior shown in the Underlying pull source with default reader and Underlying pull source with default reader and no allocation examples.

#### Mocked underlying socket source

The mocked underlying source has three important methods:

- `select2()` represents an outstanding request on the socket.
  It returns a promise that is resolved when data is available.
- `readInto()` reads data from the socket into a supplied buffer and then clears the data.
- `close()` closes the socket.

The implementation is very simplistic.
As shown below, `select2()` creates a randomly sized buffer of random data on a timeout.
The created data is read into a buffer then cleared in `readInto()`.

```js
class MockHypotheticalSocket {
  constructor() {
    this.max_data = 800; // total amount of data to stream from "socket"
    this.max_per_read = 100; // max data per read
    this.min_per_read = 40; // min data per read
    this.data_read = 0; // total data read so far (capped is maxdata)
    this.socketData = null;
  }

  // Method returning promise when this socket is readable.
  select2() {
    // Object used to resolve promise
    const resultObj = {};
    resultObj["bytesRead"] = 0;

    return new Promise((resolve /*, reject */) => {
      if (this.data_read >= this.max_data) {
        // Out of data
        resolve(resultObj);
        return;
      }

      // Emulate slow read of data
      setTimeout(() => {
        const numberBytesReceived = this.getNumberRandomBytesSocket();
        this.data_read += numberBytesReceived;
        this.socketData = this.randomByteArray(numberBytesReceived);
        resultObj["bytesRead"] = numberBytesReceived;
        resolve(resultObj);
      }, 500);
    });
  }

  /* Read data into specified buffer offset */
  readInto(buffer, offset, length) {
    let dataLength = 0;
    if (this.socketData) {
      dataLength = this.socketData.length;
      const myView = new Uint8Array(buffer, offset, length);
      // Write the length of data specified into buffer
      // Code assumes buffer always bigger than incoming data
      for (let i = 0; i < dataLength; i++) {
        myView[i] = this.socketData[i];
      }
      this.socketData = null; // Clear "socket" data after reading
    }
    return dataLength;
  }

  // Dummy close function
  close() {}

  // Return random number bytes in this call of socket
  getNumberRandomBytesSocket() {
    // Capped to remaining data and the max min return-per-read range
    const remainingData = this.max_data - this.data_read;
    const numberBytesReceived =
      remainingData < this.min_per_read
        ? remainingData
        : this.getRandomIntInclusive(
            this.min_per_read,
            Math.min(this.max_per_read, remainingData),
          );
    return numberBytesReceived;
  }

  // Return random number between two values
  getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  // Return random character string
  randomChars(length = 8) {
    let string = "";
    let choices =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";

    for (let i = 0; i < length; i++) {
      string += choices.charAt(Math.floor(Math.random() * choices.length));
    }
    return string;
  }

  /* Return random Uint8Array of bytes */
  randomByteArray(bytes = 8) {
    const textEncoder = new TextEncoder();
    return textEncoder.encode(this.randomChars(bytes));
  }
}
```

```css
.input {
  float: left;
  width: 50%;
}
.output {
  float: right;
  width: 50%;
  overflow-wrap: break-word;
}
button {
  display: block;
}
```

```html
<button>Cancel stream</button>
<div class="input">
  <h2>Underlying source</h2>
  <ul></ul>
</div>
<div class="output">
  <h2>Consumer</h2>
  <ul></ul>
</div>
```

```js
// Store reference to lists, paragraph and button
const list1 = document.querySelector(".input ul");
const list2 = document.querySelector(".output ul");
const button = document.querySelector("button");

// Create empty string in which to store final result
let result = "";

// Function to log data from underlying source
function logSource(result) {
  const listItem = document.createElement("li");
  listItem.textContent = result;
  list1.appendChild(listItem);
}

// Function to log data from consumer
function logConsumer(result) {
  const listItem = document.createElement("li");
  listItem.textContent = result;
  list2.appendChild(listItem);
}
```

#### Creating a readable socket push byte stream

The following code shows how to define a readable socket "push" byte stream.

The `underlyingSource` object definition is passed as the first parameter to the `ReadableStream()` constructor.
To make this a readable "byte" stream, we specify `type: "bytes"` as a property of the object.
This ensures that the stream is handed a `ReadableByteStreamController` (instead of the default controller (`ReadableStreamDefaultController`))

Since data can arrive at the socket before the consumer is ready to handle it, everything about reading the underlying source is configured in the `start()` callback method (we don't wait on a pull to start handling data).
The implementation opens the "socket" and calls `select2()` to request data.
When the returned promise resolves the code checks if `controller.byobRequest` exists (is not `null`), and if so calls `socket.readInto()` to copy data into the request and transfer it.
If `byobRequest` does not exist there is no outstanding request from a consuming stream that can be satisfied as a zero-copy transfer.
In this case, `controller.enqueue()` used to copy data to the stream internal queues.

The `select2()` request for more data is reposted until a request is returned with no data.
A this point the controller is used to close the stream.

```js
const stream = makeSocketStream("dummy host", "dummy port");

const DEFAULT_CHUNK_SIZE = 400;

function makeSocketStream(host, port) {
  const socket = new MockHypotheticalSocket();

  return new ReadableStream({
    type: "bytes",

    start(controller) {
      readRepeatedly().catch((e) => controller.error(e));
      function readRepeatedly() {
        return socket.select2().then(() => {
          // Since the socket can become readable even when there's
          // no pending BYOB requests, we need to handle both cases.
          let bytesRead;
          if (controller.byobRequest) {
            const v = controller.byobRequest.view;
            bytesRead = socket.readInto(v.buffer, v.byteOffset, v.byteLength);
            if (bytesRead === 0) {
              controller.close();
            }
            controller.byobRequest.respond(bytesRead);
            logSource(`byobRequest with ${bytesRead} bytes`);
          } else {
            const buffer = new ArrayBuffer(DEFAULT_CHUNK_SIZE);
            bytesRead = socket.readInto(buffer, 0, DEFAULT_CHUNK_SIZE);
            if (bytesRead === 0) {
              controller.close();
            } else {
              controller.enqueue(new Uint8Array(buffer, 0, bytesRead));
            }
            logSource(`enqueue() ${bytesRead} bytes (no byobRequest)`);
          }

          if (bytesRead === 0) {
            return;
            // no more bytes in source
          }
          return readRepeatedly();
        });
      }
    },

    cancel() {
      socket.close();
      logSource(`cancel(): socket closed`);
    },
  });
}
```

Note that `readRepeatedly()` returns a promise, and we use this to catch any errors from setting up or handling the read operation.
The errors are then passed to the controller as shown above (see `readRepeatedly().catch((e) => controller.error(e));`).

A `cancel()` method is provided at the end to close the underlying source; the `pull()` callback is not needed, and is therefore not implemented.

#### Consuming the push byte stream

The following code creates a `ReadableStreamBYOBReader` for the socket byte stream and uses it read data into a buffer.
Note `processText()` is called recursively to read more data until the buffer is filled.
When the underlying source signals that it has no more data, the `reader.read()` will have `done` set to true, which in turn completes the read operation.

This code is almost exactly the same as for the Underlying pull source with byte reader example above.
The only difference is that the reader includes some code to slow down reading, so the log output can demonstrate that data will be enqueued if not read fast enough.

```js
const reader = stream.getReader({ mode: "byob" });
let buffer = new ArrayBuffer(4000);
readStream(reader);

function readStream(reader) {
  let bytesReceived = 0;
  let offset = 0;

  while (offset < buffer.byteLength) {
    // read() returns a promise that resolves when a value has been received
    reader
      .read(new Uint8Array(buffer, offset, buffer.byteLength - offset))
      .then(async function processText({ done, value }) {
        // Result objects contain two properties:
        // done  - true if the stream has already given all its data.
        // value - some data. Always undefined when done is true.

        if (done) {
          logConsumer(`readStream() complete. Total bytes: ${bytesReceived}`);
          return;
        }

        buffer = value.buffer;
        offset += value.byteLength;
        bytesReceived += value.byteLength;

        // logConsumer(`Read ${bytesReceived} bytes: ${value}`);
        logConsumer(`Read ${bytesReceived} bytes`);
        result += value;

        // Add delay to emulate when data can't be read and data is enqueued
        if (bytesReceived > 300 && bytesReceived < 600) {
          logConsumer(`Delaying read to emulate slow stream reading`);
          const delay = (ms) =>
            new Promise((resolve) => {
              setTimeout(resolve, ms);
            });
          await delay(1000);
        }

        // Read some more, and call this function again
        return reader
          .read(new Uint8Array(buffer, offset, buffer.byteLength - offset))
          .then(processText);
      });
  }
}
```

#### Canceling the stream using the reader

We can use `ReadableStreamBYOBReader.cancel()` to cancel the stream.
For this example we call the method if a button is clicked with a reason "user choice" (other HTML and code for the button not shown).
We also log when the cancel operation completes.

```js
button.addEventListener("click", () => {
  reader
    .cancel("user choice")
    .then(() => logConsumer("reader.cancel complete"));
});
```

`ReadableStreamBYOBReader.releaseLock()` can be used to release the reader without canceling the stream.
Note however that any outstanding read requests will immediately be rejected.
A new reader can be acquired later on to read the remaining chunks.

#### Monitoring for stream for close/error

The `ReadableStreamBYOBReader.closed` property returns a promise that will resolve when the stream is closed, and reject if there is an error.
While no errors are expected in this case, the following code should log the completion case.

```js
reader.closed
  .then(() => {
    logConsumer("ReadableStreamBYOBReader.closed: resolved");
  })
  .catch(() => {
    logConsumer("ReadableStreamBYOBReader.closed: rejected:");
  });
```

#### Result

The logging from the underlying push source (left) and consumer (right) are shown below.
Not the period in the middle where data is enqueued rather than transferred as a zero-copy operation.
