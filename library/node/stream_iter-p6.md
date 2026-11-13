---
title: "Iterable Streams (part 6 of 7)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/stream_iter.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Iterable Streams (part 6 of 7)

## Classic stream interop

These utility functions bridge between classic
`stream.Readable`/`stream.Writable` streams and the `stream/iter`
API.

Both `fromReadable()` and `fromWritable()` accept duck-typed objects -- they
do not require the input to extend `stream.Readable` or `stream.Writable`
directly. The minimum contract is described below for each function.

### `fromReadable(readable)`

> Stability: 1 - Experimental

* `readable` {stream.Readable|Object} A classic Readable stream or a compatible
  object with `read()`, `pipe()`, `destroy()`, `on()`, and `removeListener()`
  methods.
* Returns: {AsyncIterable} whose chunks fulfill with {Uint8Array\[]}

Converts a classic Readable stream (or duck-typed equivalent) into a
stream/iter async iterable source that can be passed to `from()`,
`pull()`, `text()`, etc.

If the object implements the `toAsyncStreamable` protocol (as
`stream.Readable` does), that protocol is used. Otherwise, the function
duck-types on `read()`, `pipe()`, `destroy()`, `on()`, and `removeListener()`
(EventEmitter) and wraps the stream with a batched async iterator.

The result is cached per instance -- calling `fromReadable()` twice with the
same stream returns the same iterable.

For object-mode or encoded Readable streams, chunks are automatically
normalized to `Uint8Array`.

```mjs
import { Readable } from 'node:stream';
import { fromReadable, text } from 'node:stream/iter';

const readable = new Readable({
  read() { this.push('hello world'); this.push(null); },
});

const result = await text(fromReadable(readable));
console.log(result); // 'hello world'
```

```cjs
const { Readable } = require('node:stream');
const { fromReadable, text } = require('node:stream/iter');

const readable = new Readable({
  read() { this.push('hello world'); this.push(null); },
});

async function run() {
  const result = await text(fromReadable(readable));
  console.log(result); // 'hello world'
}
run();
```

### `fromWritable(writable[, options])`

> Stability: 1 - Experimental

* `writable` {stream.Writable|Object} A classic Writable stream or a compatible
  object with `write()`, `end()`, `destroy()`, `on()`, and `removeListener()`
  methods.
* `options` {Object}
  * `backpressure` {string} Backpressure policy. **Default:** `'strict'`.
    * `'strict'` -- one write may wait while the buffer is full. Further writes
      are rejected until it is accepted or canceled.
    * `'unbounded'` -- writes are queued while the buffer is full. Recommended
      for use with `pipeTo()`.
    * `'drop-newest'` -- writes are silently discarded when the buffer is full.
    * `'drop-oldest'` -- **not supported**. Throws `ERR_INVALID_ARG_VALUE`.
* Returns: {Object} A stream/iter Writer adapter.

Creates a stream/iter Writer adapter from a classic Writable stream (or
duck-typed equivalent). The adapter can be passed to `pipeTo()` as a
destination.

Since all writes on a classic Writable are fundamentally asynchronous,
the synchronous Writer methods (`writeSync`, `writevSync`, `endSync`) always
return `false` or `-1`, deferring to the async path. A queued `write()` or
`writev()` can be canceled with its `options.signal` before it reaches the
classic Writable.

If `writer.fail(reason)` receives a non-Error reason, the classic Writable is
destroyed with an `ERR_FALSY_VALUE_REJECTION` or `ERR_OPERATION_FAILED` error.
Its `reason` property contains the original value, which remains the Writer's
stored failure reason.

The result is cached per instance and backpressure policy -- calling
`fromWritable()` twice with the same stream and `backpressure` option returns
the same Writer.

For duck-typed streams that do not expose `writableHighWaterMark`,
`writableLength`, or similar properties, sensible defaults are used.
Object-mode writables (if detectable) are rejected since the Writer
interface is bytes-only.

```mjs
import { Writable } from 'node:stream';
import { from, fromWritable, pipeTo } from 'node:stream/iter';

const writable = new Writable({
  write(chunk, encoding, cb) { console.log(chunk.toString()); cb(); },
});

await pipeTo(from('hello world'),
             fromWritable(writable, { backpressure: 'unbounded' }));
```

```cjs
const { Writable } = require('node:stream');
const { from, fromWritable, pipeTo } = require('node:stream/iter');

async function run() {
  const writable = new Writable({
    write(chunk, encoding, cb) { console.log(chunk.toString()); cb(); },
  });

  await pipeTo(from('hello world'),
               fromWritable(writable, { backpressure: 'unbounded' }));
}
run();
```

### `toReadable(source[, options])`

> Stability: 1 - Experimental

* `source` {AsyncIterable} whose chunks must fulfill with {Uint8Array\[]}
  the return value of `pull()` or `from()`.
* `options` {Object}
  * `highWaterMark` {number} The internal buffer size in bytes before
    backpressure is applied. **Default:** `65536` (64 KB).
  * `signal` {AbortSignal} An optional signal to abort the readable.
* Returns: {stream.Readable}

Creates a byte-mode `stream.Readable` from the `source`
(the native batch format used by the stream/iter API). Each `Uint8Array` in a
yielded batch is pushed as a separate chunk into the Readable.

Classic streams cannot represent arbitrary values as emitted errors. A
non-Error reason is wrapped in an `ERR_FALSY_VALUE_REJECTION` or
`ERR_OPERATION_FAILED` error whose `reason` property contains the original
value.

```mjs
import { createWriteStream } from 'node:fs';
import { from, pull, toReadable } from 'node:stream/iter';
import { compressGzip } from 'node:zlib/iter';

const source = pull(from('hello world'), compressGzip());
const readable = toReadable(source);

readable.pipe(createWriteStream('output.gz'));
```

```cjs
const { createWriteStream } = require('node:fs');
const { from, pull, toReadable } = require('node:stream/iter');
const { compressGzip } = require('node:zlib/iter');

const source = pull(from('hello world'), compressGzip());
const readable = toReadable(source);

readable.pipe(createWriteStream('output.gz'));
```

### `toReadableSync(source[, options])`

> Stability: 1 - Experimental

* `source` {Iterable} whose chunks must return {Uint8Array\[]}, such as the
  return value of `pullSync()` or `fromSync()`.
* `options` {Object}
  * `highWaterMark` {number} The internal buffer size in bytes before
    backpressure is applied. **Default:** `65536` (64 KB).
* Returns: {stream.Readable}

Creates a byte-mode `stream.Readable` from the `source`.
The `_read()` method pulls from the iterator
synchronously, so data is available immediately via `readable.read()`.

```mjs
import { fromSync, toReadableSync } from 'node:stream/iter';

const source = fromSync('hello world');
const readable = toReadableSync(source);

console.log(readable.read().toString()); // 'hello world'
```

```cjs
const { fromSync, toReadableSync } = require('node:stream/iter');

const source = fromSync('hello world');
const readable = toReadableSync(source);

console.log(readable.read().toString()); // 'hello world'
```

### `toWritable(writer)`

> Stability: 1 - Experimental

* `writer` {Object} A stream/iter Writer. Only the `write()` method is
  required; `end()`, `fail()`, `writeSync()`, `writevSync()`, `endSync()`,
  and `writev()` are optional.
* Returns: {stream.Writable}

Creates a classic `stream.Writable` backed by a stream/iter Writer.

Each `_write()` / `_writev()` call attempts the Writer's synchronous method
first (`writeSync` / `writevSync`), falling back to the async method if the
sync path returns `false`. Similarly, `_final()` tries `endSync()`
before `end()`. When the sync path succeeds, the callback is deferred via
`queueMicrotask` to preserve the async resolution contract.

Classic stream callbacks cannot represent arbitrary values as errors. A
non-Error reason is wrapped in an `ERR_FALSY_VALUE_REJECTION` or
`ERR_OPERATION_FAILED` error before it is passed to the callback. The error's
`reason` property contains the original value.

Destroying the Writable before successful completion calls `writer.fail()`.
If `fail()` is unavailable, `Symbol.dispose` or `Symbol.asyncDispose` is used
when implemented by the Writer.

The Writable uses the default classic stream `highWaterMark`. Classic stream
backpressure bounds writes waiting to reach the underlying Writer, while the
Writer controls completion of the active `_write()` or `_writev()` operation.

```mjs
import { push, toWritable } from 'node:stream/iter';

const { writer, readable } = push();
const writable = toWritable(writer);

writable.write('hello');
writable.end();
```

```cjs
const { push, toWritable } = require('node:stream/iter');

const { writer, readable } = push();
const writable = toWritable(writer);

writable.write('hello');
writable.end();
```
