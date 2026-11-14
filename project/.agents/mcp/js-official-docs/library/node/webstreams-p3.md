---
title: "Web Streams API (part 3 of 4)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/webstreams.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Web Streams API (part 3 of 4)

### Class: `ReadableStreamBYOBReader`

The `ReadableStreamBYOBReader` is an alternative consumer for
byte-oriented {ReadableStream}s (those that are created with
`underlyingSource.type` set equal to `'bytes'` when the
`ReadableStream` was created).

The `BYOB` is short for "bring your own buffer". This is a
pattern that allows for more efficient reading of byte-oriented
data that avoids extraneous copying.

```mjs
import {
  open,
} from 'node:fs/promises';

import {
  ReadableStream,
} from 'node:stream/web';

import { Buffer } from 'node:buffer';

class Source {
  type = 'bytes';
  autoAllocateChunkSize = 1024;

  async start(controller) {
    this.file = await open(new URL(import.meta.url));
    this.controller = controller;
  }

  async pull(controller) {
    const view = controller.byobRequest?.view;
    const {
      bytesRead,
    } = await this.file.read({
      buffer: view,
      offset: view.byteOffset,
      length: view.byteLength,
    });

    if (bytesRead === 0) {
      await this.file.close();
      this.controller.close();
    }
    controller.byobRequest.respond(bytesRead);
  }
}

const stream = new ReadableStream(new Source());

async function read(stream) {
  const reader = stream.getReader({ mode: 'byob' });

  const chunks = [];
  let result;
  do {
    result = await reader.read(Buffer.alloc(100));
    if (result.value !== undefined)
      chunks.push(Buffer.from(result.value));
  } while (!result.done);

  return Buffer.concat(chunks);
}

const data = await read(stream);
console.log(Buffer.from(data).toString());
```

#### `new ReadableStreamBYOBReader(stream)`

* `stream` {ReadableStream}

Creates a new `ReadableStreamBYOBReader` that is locked to the
given {ReadableStream}.

#### `readableStreamBYOBReader.cancel([reason])`

* `reason` {any}
* Returns: A promise fulfilled with `undefined`.

Cancels the {ReadableStream} and returns a promise that is fulfilled
when the underlying stream has been canceled.

#### `readableStreamBYOBReader.closed`

* Type: {Promise} Fulfilled with `undefined` when the associated
  {ReadableStream} is closed or rejected if the stream errors or the reader's
  lock is released before the stream finishes closing.

#### `readableStreamBYOBReader.read(view[, options])`

* `view` {Buffer|TypedArray|DataView}
* `options` {Object}
  * `min` {number} When set, the returned promise will only be
    fulfilled as soon as `min` number of elements are available.
    When not set, the promise fulfills when at least one element
    is available.
* Returns: A promise fulfilled with an object:
  * `value` {TypedArray|DataView}
  * `done` {boolean}

Requests the next chunk of data from the underlying {ReadableStream}
and returns a promise that is fulfilled with the data once it is
available.

Do not pass a pooled {Buffer} object instance in to this method.
Pooled `Buffer` objects are created using `Buffer.allocUnsafe()`,
or `Buffer.from()`, or are often returned by various `node:fs` module
callbacks. These types of `Buffer`s use a shared underlying
{ArrayBuffer} object that contains all of the data from all of
the pooled `Buffer` instances. When a `Buffer`, {TypedArray},
or {DataView} is passed in to `readableStreamBYOBReader.read()`,
the view's underlying `ArrayBuffer` is _detached_, invalidating
all existing views that may exist on that `ArrayBuffer`. This
can have disastrous consequences for your application.

#### `readableStreamBYOBReader.releaseLock()`

Releases this reader's lock on the underlying {ReadableStream}.

### Class: `ReadableStreamDefaultController`

Every {ReadableStream} has a controller that is responsible for
the internal state and management of the stream's queue. The
`ReadableStreamDefaultController` is the default controller
implementation for `ReadableStream`s that are not byte-oriented.

#### `readableStreamDefaultController.close()`

Closes the {ReadableStream} to which this controller is associated.

#### `readableStreamDefaultController.desiredSize`

* Type: {number}

Returns the amount of data remaining to fill the {ReadableStream}'s
queue.

#### `readableStreamDefaultController.enqueue([chunk])`

* `chunk` {any}

Appends a new chunk of data to the {ReadableStream}'s queue.

#### `readableStreamDefaultController.error([error])`

* `error` {any}

Signals an error that causes the {ReadableStream} to error and close.

### Class: `ReadableByteStreamController`

Every {ReadableStream} has a controller that is responsible for
the internal state and management of the stream's queue. The
`ReadableByteStreamController` is for byte-oriented `ReadableStream`s.

#### `readableByteStreamController.byobRequest`

* Type: {ReadableStreamBYOBRequest}

#### `readableByteStreamController.close()`

Closes the {ReadableStream} to which this controller is associated.

#### `readableByteStreamController.desiredSize`

* Type: {number}

Returns the amount of data remaining to fill the {ReadableStream}'s
queue.

#### `readableByteStreamController.enqueue(chunk)`

* `chunk` {Buffer|TypedArray|DataView}

Appends a new chunk of data to the {ReadableStream}'s queue.

#### `readableByteStreamController.error([error])`

* `error` {any}

Signals an error that causes the {ReadableStream} to error and close.

### Class: `ReadableStreamBYOBRequest`

When using `ReadableByteStreamController` in byte-oriented
streams, and when using the `ReadableStreamBYOBReader`,
the `readableByteStreamController.byobRequest` property
provides access to a `ReadableStreamBYOBRequest` instance
that represents the current read request. The object
is used to gain access to the `ArrayBuffer`/`TypedArray`
that has been provided for the read request to fill,
and provides methods for signaling that the data has
been provided.

#### `readableStreamBYOBRequest.respond(bytesWritten)`

* `bytesWritten` {number}

Signals that a `bytesWritten` number of bytes have been written
to `readableStreamBYOBRequest.view`.

#### `readableStreamBYOBRequest.respondWithNewView(view)`

* `view` {Buffer|TypedArray|DataView}

Signals that the request has been fulfilled with bytes written
to a new `Buffer`, `TypedArray`, or `DataView`.

#### `readableStreamBYOBRequest.view`

* Type: {Buffer|TypedArray|DataView}

### Class: `WritableStream`

The `WritableStream` is a destination to which stream data is sent.

```mjs
import {
  WritableStream,
} from 'node:stream/web';

const stream = new WritableStream({
  write(chunk) {
    console.log(chunk);
  },
});

await stream.getWriter().write('Hello World');
```

#### `new WritableStream([underlyingSink[, strategy]])`

* `underlyingSink` {Object}
  * `start` {Function} A user-defined function that is invoked immediately when
    the `WritableStream` is created.
    * `controller` {WritableStreamDefaultController}
    * Returns: `undefined` or a promise fulfilled with `undefined`.
  * `write` {Function} A user-defined function that is invoked when a chunk of
    data has been written to the `WritableStream`.
    * `chunk` {any}
    * `controller` {WritableStreamDefaultController}
    * Returns: A promise fulfilled with `undefined`.
  * `close` {Function} A user-defined function that is called when the
    `WritableStream` is closed.
    * Returns: A promise fulfilled with `undefined`.
  * `abort` {Function} A user-defined function that is called to abruptly close
    the `WritableStream`.
    * `reason` {any}
    * Returns: A promise fulfilled with `undefined`.
  * `type` {any} The `type` option is reserved for future use and _must_ be
    undefined.
* `strategy` {Object}
  * `highWaterMark` {number} The maximum internal queue size before backpressure
    is applied.
  * `size` {Function} A user-defined function used to identify the size of each
    chunk of data.
    * `chunk` {any}
    * Returns: {number}

#### `writableStream.abort([reason])`

* `reason` {any}
* Returns: A promise fulfilled with `undefined`.

Abruptly terminates the `WritableStream`. All queued writes will be
canceled with their associated promises rejected.

#### `writableStream.close()`

* Returns: A promise fulfilled with `undefined`.

Closes the `WritableStream` when no additional writes are expected.

#### `writableStream.getWriter()`

* Returns: {WritableStreamDefaultWriter}

Creates and returns a new writer instance that can be used to write
data into the `WritableStream`.

#### `writableStream.locked`

* Type: {boolean}

The `writableStream.locked` property is `false` by default, and is
switched to `true` while there is an active writer attached to this
`WritableStream`.

#### Transferring with postMessage()

A {WritableStream} instance can be transferred using a {MessagePort}.

```js
const stream = new WritableStream(getWritableSinkSomehow());

const { port1, port2 } = new MessageChannel();

port1.onmessage = ({ data }) => {
  data.getWriter().write('hello');
};

port2.postMessage(stream, [stream]);
```

### Class: `WritableStreamDefaultWriter`

#### `new WritableStreamDefaultWriter(stream)`

* `stream` {WritableStream}

Creates a new `WritableStreamDefaultWriter` that is locked to the given
`WritableStream`.

#### `writableStreamDefaultWriter.abort([reason])`

* `reason` {any}
* Returns: A promise fulfilled with `undefined`.

Abruptly terminates the `WritableStream`. All queued writes will be
canceled with their associated promises rejected.

#### `writableStreamDefaultWriter.close()`

* Returns: A promise fulfilled with `undefined`.

Closes the `WritableStream` when no additional writes are expected.

#### `writableStreamDefaultWriter.closed`

* Type: {Promise} Fulfilled with `undefined` when the associated
  {WritableStream} is closed or rejected if the stream errors or the writer's
  lock is released before the stream finishes closing.

#### `writableStreamDefaultWriter.desiredSize`

* Type: {number}

The amount of data required to fill the {WritableStream}'s queue.

#### `writableStreamDefaultWriter.ready`

* Type: {Promise} Fulfilled with `undefined` when the writer is ready
  to be used.

#### `writableStreamDefaultWriter.releaseLock()`

Releases this writer's lock on the underlying {ReadableStream}.

#### `writableStreamDefaultWriter.write([chunk])`

* `chunk` {any}
* Returns: A promise fulfilled with `undefined`.

Appends a new chunk of data to the {WritableStream}'s queue.

### Class: `WritableStreamDefaultController`

The `WritableStreamDefaultController` manages the {WritableStream}'s
internal state.

#### `writableStreamDefaultController.error([error])`

* `error` {any}

Called by user-code to signal that an error has occurred while processing
the `WritableStream` data. When called, the {WritableStream} will be aborted,
with currently pending writes canceled.

#### `writableStreamDefaultController.signal`

* Type: {AbortSignal} An `AbortSignal` that can be used to cancel pending
  write or close operations when a {WritableStream} is aborted.

### Class: `TransformStream`

A `TransformStream` consists of a {ReadableStream} and a {WritableStream} that
are connected such that the data written to the `WritableStream` is received,
and potentially transformed, before being pushed into the `ReadableStream`'s
queue.

```mjs
import {
  TransformStream,
} from 'node:stream/web';

const transform = new TransformStream({
  transform(chunk, controller) {
    controller.enqueue(chunk.toUpperCase());
  },
});

await Promise.all([
  transform.writable.getWriter().write('A'),
  transform.readable.getReader().read(),
]);
```

#### `new TransformStream([transformer[, writableStrategy[, readableStrategy]]])`

* `transformer` {Object}
  * `start` {Function} A user-defined function that is invoked immediately when
    the `TransformStream` is created.
    * `controller` {TransformStreamDefaultController}
    * Returns: `undefined` or a promise fulfilled with `undefined`
  * `transform` {Function} A user-defined function that receives, and
    potentially modifies, a chunk of data written to `transformStream.writable`,
    before forwarding that on to `transformStream.readable`.
    * `chunk` {any}
    * `controller` {TransformStreamDefaultController}
    * Returns: A promise fulfilled with `undefined`.
  * `flush` {Function} A user-defined function that is called immediately before
    the writable side of the `TransformStream` is closed, signaling the end of
    the transformation process.
    * `controller` {TransformStreamDefaultController}
    * Returns: A promise fulfilled with `undefined`.
  * `cancel` {Function} A user-defined function that is called when either the
    readable side of the `TransformStream` is canceled or the writable side is
    aborted.
    * `reason` {any}
    * Returns: A promise fulfilled with `undefined`.
  * `readableType` {any} the `readableType` option is reserved for future use
    and _must_ be `undefined`.
  * `writableType` {any} the `writableType` option is reserved for future use
    and _must_ be `undefined`.
* `writableStrategy` {Object}
  * `highWaterMark` {number} The maximum internal queue size before backpressure
    is applied.
  * `size` {Function} A user-defined function used to identify the size of each
    chunk of data.
    * `chunk` {any}
    * Returns: {number}
* `readableStrategy` {Object}
  * `highWaterMark` {number} The maximum internal queue size before backpressure
    is applied.
  * `size` {Function} A user-defined function used to identify the size of each
    chunk of data.
    * `chunk` {any}
    * Returns: {number}

#### `transformStream.readable`

* Type: {ReadableStream}

#### `transformStream.writable`

* Type: {WritableStream}

#### Transferring with postMessage()

A {TransformStream} instance can be transferred using a {MessagePort}.

```js
const stream = new TransformStream();

const { port1, port2 } = new MessageChannel();

port1.onmessage = ({ data }) => {
  const { writable, readable } = data;
  // ...
};

port2.postMessage(stream, [stream]);
```

### Class: `TransformStreamDefaultController`

The `TransformStreamDefaultController` manages the internal state
of the `TransformStream`.

#### `transformStreamDefaultController.desiredSize`

* Type: {number}

The amount of data required to fill the readable side's queue.

#### `transformStreamDefaultController.enqueue([chunk])`

* `chunk` {any}

Appends a chunk of data to the readable side's queue.

#### `transformStreamDefaultController.error([reason])`

* `reason` {any}

Signals to both the readable and writable side that an error has occurred
while processing the transform data, causing both sides to be abruptly
closed.

#### `transformStreamDefaultController.terminate()`

Closes the readable side of the transport and causes the writable side
to be abruptly closed with an error.

### Class: `ByteLengthQueuingStrategy`

#### `new ByteLengthQueuingStrategy(init)`

* `init` {Object}
  * `highWaterMark` {number}

#### `byteLengthQueuingStrategy.highWaterMark`

* Type: {number}

#### `byteLengthQueuingStrategy.size`

* Type: {Function}
  * `chunk` {any}
  * Returns: {number}
