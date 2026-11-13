---
title: "Web Streams API (part 2 of 4)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/webstreams.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Web Streams API (part 2 of 4)

## API

### `ReadableStreamTee(stream[, cloneForBranch2])`

> Stability: 1 - Experimental

* `stream` {ReadableStream}
* `cloneForBranch2` {boolean} When `true`, chunks enqueued into the second
  branch are cloned from chunks enqueued into the first branch. **Default:**
  `false`.
* Returns: {ReadableStream\[]} Two {ReadableStream} branches.

Runs the WHATWG `ReadableStreamTee` abstract operation on `stream`.

This differs from `readableStream.tee()` only when `cloneForBranch2` is
`true`. The `tee()` method always passes `false`, while other web platform
specifications, such as Fetch body cloning, pass `true` so that the second
branch receives cloned chunks and consumption of one branch cannot mutate chunks
seen by the other.

### Class: `ReadableStream`

#### `new ReadableStream([underlyingSource [, strategy]])`

* `underlyingSource` {Object}
  * `start` {Function} A user-defined function that is invoked immediately when
    the `ReadableStream` is created.
    * `controller` {ReadableStreamDefaultController|ReadableByteStreamController}
    * Returns: `undefined` or a promise fulfilled with `undefined`.
  * `pull` {Function} A user-defined function that is called repeatedly when the
    `ReadableStream` internal queue is not full. The operation may be sync or
    async. If async, the function will not be called again until the previously
    returned promise is fulfilled.
    * `controller` {ReadableStreamDefaultController|ReadableByteStreamController}
    * Returns: A promise fulfilled with `undefined`.
  * `cancel` {Function} A user-defined function that is called when the
    `ReadableStream` is canceled.
    * `reason` {any}
    * Returns: A promise fulfilled with `undefined`.
  * `type` {string} Must be `'bytes'` or `undefined`.
  * `autoAllocateChunkSize` {number} Used only when `type` is equal to
    `'bytes'`. When set to a non-zero value a view buffer is automatically
    allocated to `ReadableByteStreamController.byobRequest`. When not set
    one must use stream's internal queues to transfer data via the default
    reader `ReadableStreamDefaultReader`.
* `strategy` {Object}
  * `highWaterMark` {number} The maximum internal queue size before backpressure
    is applied.
  * `size` {Function} A user-defined function used to identify the size of each
    chunk of data.
    * `chunk` {any}
    * Returns: {number}

#### `readableStream.locked`

* Type: {boolean} Set to `true` if there is an active reader for this
  {ReadableStream}.

The `readableStream.locked` property is `false` by default, and is
switched to `true` while there is an active reader consuming the
stream's data.

#### `readableStream.cancel([reason])`

* `reason` {any}
* Returns: A promise fulfilled with `undefined` once cancelation has
  been completed.

#### `readableStream.getReader([options])`

* `options` {Object}
  * `mode` {string} `'byob'` or `undefined`
* Returns: {ReadableStreamDefaultReader|ReadableStreamBYOBReader}

```mjs
import { ReadableStream } from 'node:stream/web';

const stream = new ReadableStream();

const reader = stream.getReader();

console.log(await reader.read());
```

```cjs
const { ReadableStream } = require('node:stream/web');

const stream = new ReadableStream();

const reader = stream.getReader();

reader.read().then(console.log);
```

Causes the `readableStream.locked` to be `true`.

#### `readableStream.pipeThrough(transform[, options])`

* `transform` {Object}
  * `readable` {ReadableStream} The `ReadableStream` to which
    `transform.writable` will push the potentially modified data
    it receives from this `ReadableStream`.
  * `writable` {WritableStream} The `WritableStream` to which this
    `ReadableStream`'s data will be written.
* `options` {Object}
  * `preventAbort` {boolean} When `true`, errors in this `ReadableStream`
    will not cause `transform.writable` to be aborted.
  * `preventCancel` {boolean} When `true`, errors in the destination
    `transform.writable` do not cause this `ReadableStream` to be
    canceled.
  * `preventClose` {boolean} When `true`, closing this `ReadableStream`
    does not cause `transform.writable` to be closed.
  * `signal` {AbortSignal} Allows the transfer of data to be canceled
    using an {AbortController}.
* Returns: {ReadableStream} From `transform.readable`.

Connects this {ReadableStream} to the pair of {ReadableStream} and
{WritableStream} provided in the `transform` argument such that the
data from this {ReadableStream} is written in to `transform.writable`,
possibly transformed, then pushed to `transform.readable`. Once the
pipeline is configured, `transform.readable` is returned.

Causes the `readableStream.locked` to be `true` while the pipe operation
is active.

```mjs
import {
  ReadableStream,
  TransformStream,
} from 'node:stream/web';

const stream = new ReadableStream({
  start(controller) {
    controller.enqueue('a');
  },
});

const transform = new TransformStream({
  transform(chunk, controller) {
    controller.enqueue(chunk.toUpperCase());
  },
});

const transformedStream = stream.pipeThrough(transform);

for await (const chunk of transformedStream)
  console.log(chunk);
  // Prints: A
```

```cjs
const {
  ReadableStream,
  TransformStream,
} = require('node:stream/web');

const stream = new ReadableStream({
  start(controller) {
    controller.enqueue('a');
  },
});

const transform = new TransformStream({
  transform(chunk, controller) {
    controller.enqueue(chunk.toUpperCase());
  },
});

const transformedStream = stream.pipeThrough(transform);

(async () => {
  for await (const chunk of transformedStream)
    console.log(chunk);
    // Prints: A
})();
```

#### `readableStream.pipeTo(destination[, options])`

* `destination` {WritableStream} A {WritableStream} to which this
  `ReadableStream`'s data will be written.
* `options` {Object}
  * `preventAbort` {boolean} When `true`, errors in this `ReadableStream`
    will not cause `destination` to be aborted.
  * `preventCancel` {boolean} When `true`, errors in the `destination`
    will not cause this `ReadableStream` to be canceled.
  * `preventClose` {boolean} When `true`, closing this `ReadableStream`
    does not cause `destination` to be closed.
  * `signal` {AbortSignal} Allows the transfer of data to be canceled
    using an {AbortController}.
* Returns: A promise fulfilled with `undefined`

Causes the `readableStream.locked` to be `true` while the pipe operation
is active.

#### `readableStream.tee()`

* Returns: {ReadableStream\[]}

Returns a pair of new {ReadableStream} instances to which this
`ReadableStream`'s data will be forwarded. Each will receive the
same data.

Causes the `readableStream.locked` to be `true`.

#### `readableStream.values([options])`

* `options` {Object}
  * `preventCancel` {boolean} When `true`, prevents the {ReadableStream}
    from being closed when the async iterator abruptly terminates.
    **Default**: `false`.

Creates and returns an async iterator usable for consuming this
`ReadableStream`'s data.

Causes the `readableStream.locked` to be `true` while the async iterator
is active.

```mjs
import { Buffer } from 'node:buffer';

const stream = new ReadableStream(getSomeSource());

for await (const chunk of stream.values({ preventCancel: true }))
  console.log(Buffer.from(chunk).toString());
```

#### Async Iteration

The {ReadableStream} object supports the async iterator protocol using
`for await` syntax.

```mjs
import { Buffer } from 'node:buffer';

const stream = new ReadableStream(getSomeSource());

for await (const chunk of stream)
  console.log(Buffer.from(chunk).toString());
```

The async iterator will consume the {ReadableStream} until it terminates.

By default, if the async iterator exits early (via either a `break`,
`return`, or a `throw`), the {ReadableStream} will be closed. To prevent
automatic closing of the {ReadableStream}, use the `readableStream.values()`
method to acquire the async iterator and set the `preventCancel` option to
`true`.

The {ReadableStream} must not be locked (that is, it must not have an existing
active reader). During the async iteration, the {ReadableStream} will be locked.

#### Transferring with `postMessage()`

A {ReadableStream} instance can be transferred using a {MessagePort}.

```js
const stream = new ReadableStream(getReadableSourceSomehow());

const { port1, port2 } = new MessageChannel();

port1.onmessage = ({ data }) => {
  data.getReader().read().then((chunk) => {
    console.log(chunk);
  });
};

port2.postMessage(stream, [stream]);
```

### `ReadableStream.from(iterable)`

* `iterable` {Iterable} Object implementing the `Symbol.asyncIterator` or
  `Symbol.iterator` iterable protocol.

A utility method that creates a new {ReadableStream} from an iterable.

```mjs
import { ReadableStream } from 'node:stream/web';

async function* asyncIterableGenerator() {
  yield 'a';
  yield 'b';
  yield 'c';
}

const stream = ReadableStream.from(asyncIterableGenerator());

for await (const chunk of stream)
  console.log(chunk); // Prints: 'a', 'b', 'c'
```

```cjs
const { ReadableStream } = require('node:stream/web');

async function* asyncIterableGenerator() {
  yield 'a';
  yield 'b';
  yield 'c';
}

(async () => {
  const stream = ReadableStream.from(asyncIterableGenerator());

  for await (const chunk of stream)
    console.log(chunk); // Prints: 'a', 'b', 'c'
})();
```

To pipe the resulting {ReadableStream} into a {WritableStream} the {Iterable}
should yield a sequence of {Buffer}, {TypedArray}, or {DataView} objects.

```mjs
import { ReadableStream } from 'node:stream/web';
import { Buffer } from 'node:buffer';

async function* asyncIterableGenerator() {
  yield Buffer.from('a');
  yield Buffer.from('b');
  yield Buffer.from('c');
}

const stream = ReadableStream.from(asyncIterableGenerator());

await stream.pipeTo(createWritableStreamSomehow());
```

```cjs
const { ReadableStream } = require('node:stream/web');
const { Buffer } = require('node:buffer');

async function* asyncIterableGenerator() {
  yield Buffer.from('a');
  yield Buffer.from('b');
  yield Buffer.from('c');
}

const stream = ReadableStream.from(asyncIterableGenerator());

(async () => {
  await stream.pipeTo(createWritableStreamSomehow());
})();
```

### Class: `ReadableStreamDefaultReader`

By default, calling `readableStream.getReader()` with no arguments
will return an instance of `ReadableStreamDefaultReader`. The default
reader treats the chunks of data passed through the stream as opaque
values, which allows the {ReadableStream} to work with generally any
JavaScript value.

#### `new ReadableStreamDefaultReader(stream)`

* `stream` {ReadableStream}

Creates a new {ReadableStreamDefaultReader} that is locked to the
given {ReadableStream}.

#### `readableStreamDefaultReader.cancel([reason])`

* `reason` {any}
* Returns: A promise fulfilled with `undefined`.

Cancels the {ReadableStream} and returns a promise that is fulfilled
when the underlying stream has been canceled.

#### `readableStreamDefaultReader.closed`

* Type: {Promise} Fulfilled with `undefined` when the associated
  {ReadableStream} is closed or rejected if the stream errors or the reader's
  lock is released before the stream finishes closing.

#### `readableStreamDefaultReader.read()`

* Returns: A promise fulfilled with an object:
  * `value` {any}
  * `done` {boolean}

Requests the next chunk of data from the underlying {ReadableStream}
and returns a promise that is fulfilled with the data once it is
available.

#### `readableStreamDefaultReader.releaseLock()`

Releases this reader's lock on the underlying {ReadableStream}.
