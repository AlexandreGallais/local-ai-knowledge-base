---
title: "Stream (part 1 of 11)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/stream.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Stream

> Stability: 2 - Stable

A stream is an abstract interface for working with streaming data in Node.js.
The `node:stream` module provides an API for implementing the stream interface.

There are many stream objects provided by Node.js. For instance, a
request to an HTTP server and `process.stdout`
are both stream instances.

Streams can be readable, writable, or both. All streams are instances of
`EventEmitter`.

To access the `node:stream` module:

```js
const stream = require('node:stream');
```

The `node:stream` module is useful for creating new types of stream instances.
It is usually not necessary to use the `node:stream` module to consume streams.

## Organization of this document

This document contains two primary sections and a third section for notes. The
first section explains how to use existing streams within an application. The
second section explains how to create new types of streams.

## Types of streams

There are four fundamental stream types within Node.js:

* `Writable`: streams to which data can be written (for example,
  `fs.createWriteStream()`).
* `Readable`: streams from which data can be read (for example,
  `fs.createReadStream()`).
* `Duplex`: streams that are both `Readable` and `Writable` (for example,
  `net.Socket`).
* `Transform`: `Duplex` streams that can modify or transform the data as it
  is written and read (for example, `zlib.createDeflate()`).

Additionally, this module includes the utility functions
`stream.duplexPair()`,
`stream.pipeline()`,
`stream.finished()`
`stream.Readable.from()`, and
`stream.addAbortSignal()`.

### Streams Promises API

The `stream/promises` API provides an alternative set of asynchronous utility
functions for streams that return `Promise` objects rather than using
callbacks. The API is accessible via `require('node:stream/promises')`
or `require('node:stream').promises`.

### `stream.pipeline(source[, ...transforms], destination[, options])`

* `streams` {Stream\[]|Iterable\[]|AsyncIterable\[]|Function\[]|
  ReadableStream\[]|WritableStream\[]|TransformStream\[]}
* `source` {Stream|Iterable|AsyncIterable|Function|ReadableStream}
  * Returns: {Promise|AsyncIterable}
* `...transforms` {Stream|Function|TransformStream}
  * `source` {AsyncIterable}
  * Returns: {Promise|AsyncIterable}
* `destination` {Stream|Function|WritableStream}
  * `source` {AsyncIterable}
  * Returns: {Promise|AsyncIterable}
* `options` {Object} Pipeline options
  * `signal` {AbortSignal}
  * `end` {boolean} End the destination stream when the source stream ends.
    Transform streams are always ended, even if this value is `false`.
    **Default:** `true`.
* Returns: {Promise} Fulfills when the pipeline is complete.

```cjs
const { pipeline } = require('node:stream/promises');
const fs = require('node:fs');
const zlib = require('node:zlib');

async function run() {
  await pipeline(
    fs.createReadStream('archive.tar'),
    zlib.createGzip(),
    fs.createWriteStream('archive.tar.gz'),
  );
  console.log('Pipeline succeeded.');
}

run().catch(console.error);
```

```mjs
import { pipeline } from 'node:stream/promises';
import { createReadStream, createWriteStream } from 'node:fs';
import { createGzip } from 'node:zlib';

await pipeline(
  createReadStream('archive.tar'),
  createGzip(),
  createWriteStream('archive.tar.gz'),
);
console.log('Pipeline succeeded.');
```

To use an `AbortSignal`, pass it inside an options object, as the last argument.
When the signal is aborted, `destroy` will be called on the underlying pipeline,
with an `AbortError`.

```cjs
const { pipeline } = require('node:stream/promises');
const fs = require('node:fs');
const zlib = require('node:zlib');

async function run() {
  const ac = new AbortController();
  const signal = ac.signal;

  setImmediate(() => ac.abort());
  await pipeline(
    fs.createReadStream('archive.tar'),
    zlib.createGzip(),
    fs.createWriteStream('archive.tar.gz'),
    { signal },
  );
}

run().catch(console.error); // AbortError
```

```mjs
import { pipeline } from 'node:stream/promises';
import { createReadStream, createWriteStream } from 'node:fs';
import { createGzip } from 'node:zlib';

const ac = new AbortController();
const { signal } = ac;
setImmediate(() => ac.abort());
try {
  await pipeline(
    createReadStream('archive.tar'),
    createGzip(),
    createWriteStream('archive.tar.gz'),
    { signal },
  );
} catch (err) {
  console.error(err); // AbortError
}
```

The `pipeline` API also supports async generators:

```cjs
const { pipeline } = require('node:stream/promises');
const fs = require('node:fs');

async function run() {
  await pipeline(
    fs.createReadStream('lowercase.txt'),
    async function* (source, { signal }) {
      source.setEncoding('utf8');  // Work with strings rather than `Buffer`s.
      for await (const chunk of source) {
        yield await processChunk(chunk, { signal });
      }
    },
    fs.createWriteStream('uppercase.txt'),
  );
  console.log('Pipeline succeeded.');
}

run().catch(console.error);
```

```mjs
import { pipeline } from 'node:stream/promises';
import { createReadStream, createWriteStream } from 'node:fs';

await pipeline(
  createReadStream('lowercase.txt'),
  async function* (source, { signal }) {
    source.setEncoding('utf8');  // Work with strings rather than `Buffer`s.
    for await (const chunk of source) {
      yield await processChunk(chunk, { signal });
    }
  },
  createWriteStream('uppercase.txt'),
);
console.log('Pipeline succeeded.');
```

Remember to handle the `signal` argument passed into the async generator.
Especially in the case where the async generator is the source for the
pipeline (i.e. first argument) or the pipeline will never complete.

```cjs
const { pipeline } = require('node:stream/promises');
const fs = require('node:fs');

async function run() {
  await pipeline(
    async function* ({ signal }) {
      await someLongRunningfn({ signal });
      yield 'asd';
    },
    fs.createWriteStream('uppercase.txt'),
  );
  console.log('Pipeline succeeded.');
}

run().catch(console.error);
```

```mjs
import { pipeline } from 'node:stream/promises';
import fs from 'node:fs';
await pipeline(
  async function* ({ signal }) {
    await someLongRunningfn({ signal });
    yield 'asd';
  },
  fs.createWriteStream('uppercase.txt'),
);
console.log('Pipeline succeeded.');
```

The `pipeline` API provides callback version:

### `stream.finished(stream[, options])`

* `stream` {Stream|ReadableStream|WritableStream} A readable and/or writable
  stream/webstream.
* `options` {Object}
  * `error` {boolean|undefined}
  * `readable` {boolean|undefined}
  * `writable` {boolean|undefined}
  * `signal` {AbortSignal|undefined}
  * `cleanup` {boolean|undefined} If `true`, removes the listeners registered by
    this function before the promise is fulfilled. **Default:** `false`.
* Returns: {Promise} Fulfills when the stream is no
  longer readable or writable.

```cjs
const { finished } = require('node:stream/promises');
const fs = require('node:fs');

const rs = fs.createReadStream('archive.tar');

async function run() {
  await finished(rs);
  console.log('Stream is done reading.');
}

run().catch(console.error);
rs.resume(); // Drain the stream.
```

```mjs
import { finished } from 'node:stream/promises';
import { createReadStream } from 'node:fs';

const rs = createReadStream('archive.tar');

async function run() {
  await finished(rs);
  console.log('Stream is done reading.');
}

run().catch(console.error);
rs.resume(); // Drain the stream.
```

The `finished` API also provides a callback version.

`stream.finished()` leaves dangling event listeners (in particular
`'error'`, `'end'`, `'finish'` and `'close'`) after the returned promise is
resolved or rejected. The reason for this is so that unexpected `'error'`
events (due to incorrect stream implementations) do not cause unexpected
crashes. If this is unwanted behavior then `options.cleanup` should be set to
`true`:

```mjs
await finished(rs, { cleanup: true });
```

### Object mode

All streams created by Node.js APIs operate exclusively on strings, {Buffer},
{TypedArray} and {DataView} objects:

* `Strings` and `Buffers` are the most common types used with streams.
* `TypedArray` and `DataView` lets you handle binary data with types like
  `Int32Array` or `Uint8Array`. When you write a TypedArray or DataView to a
  stream, Node.js processes
  the raw bytes.

It is possible, however, for stream
implementations to work with other types of JavaScript values (with the
exception of `null`, which serves a special purpose within streams).
Such streams are considered to operate in "object mode".

Stream instances are switched into object mode using the `objectMode` option
when the stream is created. Attempting to switch an existing stream into
object mode is not safe.

### Buffering

Both `Writable` and `Readable` streams will store data in an internal
buffer.

The amount of data potentially buffered depends on the `highWaterMark` option
passed into the stream's constructor. For normal streams, the `highWaterMark`
option specifies a total number of bytes. For streams operating
in object mode, the `highWaterMark` specifies a total number of objects. For
streams operating on (but not decoding) strings, the `highWaterMark` specifies
a total number of UTF-16 code units.

Data is buffered in `Readable` streams when the implementation calls
`stream.push(chunk)`. If the consumer of the Stream does not
call `stream.read()`, the data will sit in the internal
queue until it is consumed.

Once the total size of the internal read buffer reaches the threshold specified
by `highWaterMark`, the stream will temporarily stop reading data from the
underlying resource until the data currently buffered can be consumed (that is,
the stream will stop calling the internal `readable._read()` method that is
used to fill the read buffer).

Data is buffered in `Writable` streams when the
`writable.write(chunk)` method is called repeatedly. While the
total size of the internal write buffer is below the threshold set by
`highWaterMark`, calls to `writable.write()` will return `true`. Once
the size of the internal buffer reaches or exceeds the `highWaterMark`, `false`
will be returned.

A key goal of the `stream` API, particularly the `stream.pipe()` method,
is to limit the buffering of data to acceptable levels such that sources and
destinations of differing speeds will not overwhelm the available memory.

The `highWaterMark` option is a threshold, not a limit: it dictates the amount
of data that a stream buffers before it stops asking for more data. It does not
enforce a strict memory limitation in general. Specific stream implementations
may choose to enforce stricter limits but doing so is optional.

Because `Duplex` and `Transform` streams are both `Readable` and
`Writable`, each maintains _two_ separate internal buffers used for reading and
writing, allowing each side to operate independently of the other while
maintaining an appropriate and efficient flow of data. For example,
`net.Socket` instances are `Duplex` streams whose `Readable` side allows
consumption of data received _from_ the socket and whose `Writable` side allows
writing data _to_ the socket. Because data may be written to the socket at a
faster or slower rate than data is received, each side should
operate (and buffer) independently of the other.

The mechanics of the internal buffering are an internal implementation detail
and may be changed at any time. However, for certain advanced implementations,
the internal buffers can be retrieved using `writable.writableBuffer` or
`readable.readableBuffer`. Use of these undocumented properties is discouraged.
