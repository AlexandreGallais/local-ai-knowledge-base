---
title: "Stream (part 11 of 11)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/stream.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Stream (part 11 of 11)

### Implementing a transform stream

A `Transform` stream is a `Duplex` stream where the output is computed
in some way from the input. Examples include zlib streams or crypto
streams that compress, encrypt, or decrypt data.

There is no requirement that the output be the same size as the input, the same
number of chunks, or arrive at the same time. For example, a `Hash` stream will
only ever have a single chunk of output which is provided when the input is
ended. A `zlib` stream will produce output that is either much smaller or much
larger than its input.

The `stream.Transform` class is extended to implement a `Transform` stream.

The `stream.Transform` class prototypically inherits from `stream.Duplex` and
implements its own versions of the `writable._write()` and
`readable._read()` methods. Custom `Transform` implementations _must_
implement the `transform._transform()` method and _may_
also implement the `transform._flush()` method.

Care must be taken when using `Transform` streams in that data written to the
stream can cause the `Writable` side of the stream to become paused if the
output on the `Readable` side is not consumed.

#### `new stream.Transform([options])`

* `options` {Object} Passed to both `Writable` and `Readable`
  constructors. Also has the following fields:
  * `transform` {Function} Implementation for the
    `stream._transform()` method.
  * `flush` {Function} Implementation for the `stream._flush()`
    method.

```cjs
const { Transform } = require('node:stream');

class MyTransform extends Transform {
  constructor(options) {
    super(options);
    // ...
  }
}
```

```mjs
import { Transform } from 'node:stream';

class MyTransform extends Transform {
  constructor(options) {
    super(options);
    // ...
  }
}
```

Or, using the simplified constructor approach:

```js
const { Transform } = require('node:stream');

const myTransform = new Transform({
  transform(chunk, encoding, callback) {
    // ...
  },
});
```

#### Event: `'end'`

The `'end'` event is from the `stream.Readable` class. The `'end'` event is
emitted after all data has been output, which occurs after the callback in
`transform._flush()` has been called. In the case of an error,
`'end'` should not be emitted.

#### Event: `'finish'`

The `'finish'` event is from the `stream.Writable` class. The `'finish'`
event is emitted after `stream.end()` is called and all chunks
have been processed by `stream._transform()`. In the case
of an error, `'finish'` should not be emitted.

#### `transform._flush(callback)`

* `callback` {Function} A callback function (optionally with an error
  argument and data) to be called when remaining data has been flushed.

This function MUST NOT be called by application code directly. It should be
implemented by child classes, and called by the internal `Readable` class
methods only.

In some cases, a transform operation may need to emit an additional bit of
data at the end of the stream. For example, a `zlib` compression stream will
store an amount of internal state used to optimally compress the output. When
the stream ends, however, that additional data needs to be flushed so that the
compressed data will be complete.

Custom `Transform` implementations _may_ implement the `transform._flush()`
method. This will be called when there is no more written data to be consumed,
but before the `'end'` event is emitted signaling the end of the
`Readable` stream.

Within the `transform._flush()` implementation, the `transform.push()` method
may be called zero or more times, as appropriate. The `callback` function must
be called when the flush operation is complete.

The `transform._flush()` method is prefixed with an underscore because it is
internal to the class that defines it, and should never be called directly by
user programs.

#### `transform._transform(chunk, encoding, callback)`

* `chunk` {Buffer|string|any} The `Buffer` to be transformed, converted from
  the `string` passed to `stream.write()`. If the stream's
  `decodeStrings` option is `false` or the stream is operating in object mode,
  the chunk will not be converted & will be whatever was passed to
  `stream.write()`.
* `encoding` {string} If the chunk is a string, then this is the
  encoding type. If chunk is a buffer, then this is the special
  value `'buffer'`. Ignore it in that case.
* `callback` {Function} A callback function (optionally with an error
  argument and data) to be called after the supplied `chunk` has been
  processed.

This function MUST NOT be called by application code directly. It should be
implemented by child classes, and called by the internal `Readable` class
methods only.

All `Transform` stream implementations must provide a `_transform()`
method to accept input and produce output. The `transform._transform()`
implementation handles the bytes being written, computes an output, then passes
that output off to the readable portion using the `transform.push()` method.

The `transform.push()` method may be called zero or more times to generate
output from a single input chunk, depending on how much is to be output
as a result of the chunk.

It is possible that no output is generated from any given chunk of input data.

The `callback` function must be called only when the current chunk is completely
consumed. The first argument passed to the `callback` must be an `Error` object
if an error occurred while processing the input or `null` otherwise. If a second
argument is passed to the `callback`, it will be forwarded on to the
`transform.push()` method, but only if the first argument is falsy. In other
words, the following are equivalent:

```js
transform.prototype._transform = function(data, encoding, callback) {
  this.push(data);
  callback();
};

transform.prototype._transform = function(data, encoding, callback) {
  callback(null, data);
};
```

The `transform._transform()` method is prefixed with an underscore because it
is internal to the class that defines it, and should never be called directly by
user programs.

`transform._transform()` is never called in parallel; streams implement a
queue mechanism, and to receive the next chunk, `callback` must be
called, either synchronously or asynchronously.

#### Class: `stream.PassThrough`

The `stream.PassThrough` class is a trivial implementation of a `Transform`
stream that simply passes the input bytes across to the output. Its purpose is
primarily for examples and testing, but there are some use cases where
`stream.PassThrough` is useful as a building block for novel sorts of streams.

## Additional notes

### Streams compatibility with async generators and async iterators

With the support of async generators and iterators in JavaScript, async
generators are effectively a first-class language-level stream construct at
this point.

Some common interop cases of using Node.js streams with async generators
and async iterators are provided below.

#### Consuming readable streams with async iterators

```js
(async function() {
  for await (const chunk of readable) {
    console.log(chunk);
  }
})();
```

Async iterators register a permanent error handler on the stream to prevent any
unhandled post-destroy errors.

#### Creating readable streams with async generators

A Node.js readable stream can be created from an asynchronous generator using
the `Readable.from()` utility method:

```js
const { Readable } = require('node:stream');

const ac = new AbortController();
const signal = ac.signal;

async function * generate() {
  yield 'a';
  await someLongRunningFn({ signal });
  yield 'b';
  yield 'c';
}

const readable = Readable.from(generate());
readable.on('close', () => {
  ac.abort();
});

readable.on('data', (chunk) => {
  console.log(chunk);
});
```

#### Piping to writable streams from async iterators

When writing to a writable stream from an async iterator, ensure correct
handling of backpressure and errors. `stream.pipeline()` abstracts away
the handling of backpressure and backpressure-related errors:

```js
const fs = require('node:fs');
const { pipeline } = require('node:stream');
const { pipeline: pipelinePromise } = require('node:stream/promises');

const writable = fs.createWriteStream('./file');

const ac = new AbortController();
const signal = ac.signal;

const iterator = createIterator({ signal });

// Callback Pattern
pipeline(iterator, writable, (err, value) => {
  if (err) {
    console.error(err);
  } else {
    console.log(value, 'value returned');
  }
}).on('close', () => {
  ac.abort();
});

// Promise Pattern
pipelinePromise(iterator, writable)
  .then((value) => {
    console.log(value, 'value returned');
  })
  .catch((err) => {
    console.error(err);
    ac.abort();
  });
```

### Compatibility with older Node.js versions

Prior to Node.js 0.10, the `Readable` stream interface was simpler, but also
less powerful and less useful.

* Rather than waiting for calls to the `stream.read()` method,
  `'data'` events would begin emitting immediately. Applications that
  would need to perform some amount of work to decide how to handle data
  were required to store read data into buffers so the data would not be lost.
* The `stream.pause()` method was advisory, rather than
  guaranteed. This meant that it was still necessary to be prepared to receive
  `'data'` events _even when the stream was in a paused state_.

In Node.js 0.10, the `Readable` class was added. For backward
compatibility with older Node.js programs, `Readable` streams switch into
"flowing mode" when a `'data'` event handler is added, or when the
`stream.resume()` method is called. The effect is that, even
when not using the new `stream.read()` method and
`'readable'` event, it is no longer necessary to worry about losing
`'data'` chunks.

While most applications will continue to function normally, this introduces an
edge case in the following conditions:

* No `'data'` event listener is added.
* The `stream.resume()` method is never called.
* The stream is not piped to any writable destination.

For example, consider the following code:

```js
// WARNING!  BROKEN!
net.createServer((socket) => {

  // We add an 'end' listener, but never consume the data.
  socket.on('end', () => {
    // It will never get here.
    socket.end('The message was received but was not processed.\n');
  });

}).listen(1337);
```

Prior to Node.js 0.10, the incoming message data would be simply discarded.
However, in Node.js 0.10 and beyond, the socket remains paused forever.

The workaround in this situation is to call the
`stream.resume()` method to begin the flow of data:

```js
// Workaround.
net.createServer((socket) => {
  socket.on('end', () => {
    socket.end('The message was received but was not processed.\n');
  });

  // Start the flow of data, discarding it.
  socket.resume();
}).listen(1337);
```

In addition to new `Readable` streams switching into flowing mode,
pre-0.10 style streams can be wrapped in a `Readable` class using the
`readable.wrap()` method.

### `readable.read(0)`

There are some cases where it is necessary to trigger a refresh of the
underlying readable stream mechanisms, without actually consuming any
data. In such cases, it is possible to call `readable.read(0)`, which will
always return `null`.

If the internal read buffer is below the `highWaterMark`, and the
stream is not currently reading, then calling `stream.read(0)` will trigger
a low-level `stream._read()` call.

While most applications will almost never need to do this, there are
situations within Node.js where this is done, particularly in the
`Readable` stream class internals.

### `readable.push('')`

Use of `readable.push('')` is not recommended.

Pushing a zero-byte {string}, {Buffer}, {TypedArray} or {DataView} to a stream
that is not in object mode has an interesting side effect.
Because it _is_ a call to
`readable.push()`, the call will end the reading process.
However, because the argument is an empty string, no data is added to the
readable buffer so there is nothing for a user to consume.

### `highWaterMark` discrepancy after calling `readable.setEncoding()`

The use of `readable.setEncoding()` will change the behavior of how the
`highWaterMark` operates in non-object mode.

Typically, the size of the current buffer is measured against the
`highWaterMark` in _bytes_. However, after `setEncoding()` is called, the
comparison function will begin to measure the buffer's size in _characters_.

This is not a problem in common cases with `latin1` or `ascii`. But it is
advised to be mindful about this behavior when working with strings that could
contain multi-byte characters.
