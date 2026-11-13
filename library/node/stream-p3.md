---
title: "Stream (part 3 of 11)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/stream.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Stream (part 3 of 11)

### Writable streams

Writable streams are an abstraction for a _destination_ to which data is
written.

Examples of `Writable` streams include:

* HTTP requests, on the client
* HTTP responses, on the server
* fs write streams
* zlib streams
* crypto streams
* TCP sockets
* child process stdin
* `process.stdout`, `process.stderr`

Some of these examples are actually `Duplex` streams that implement the
`Writable` interface.

All `Writable` streams implement the interface defined by the
`stream.Writable` class.

While specific instances of `Writable` streams may differ in various ways,
all `Writable` streams follow the same fundamental usage pattern as illustrated
in the example below:

```js
const myStream = getWritableStreamSomehow();
myStream.write('some data');
myStream.write('some more data');
myStream.end('done writing data');
```

#### Class: `stream.Writable`

##### Event: `'close'`

The `'close'` event is emitted when the stream and any of its underlying
resources (a file descriptor, for example) have been closed. The event indicates
that no more events will be emitted, and no further computation will occur.

A `Writable` stream will always emit the `'close'` event if it is
created with the `emitClose` option.

##### Event: `'drain'`

If a call to `stream.write(chunk)` returns `false`, the
`'drain'` event will be emitted when it is appropriate to resume writing data
to the stream.

```js
// Write the data to the supplied writable stream one million times.
// Be attentive to back-pressure.
function writeOneMillionTimes(writer, data, encoding, callback) {
  let i = 1000000;
  write();
  function write() {
    let ok = true;
    do {
      i--;
      if (i === 0) {
        // Last time!
        writer.write(data, encoding, callback);
      } else {
        // See if we should continue, or wait.
        // Don't pass the callback, because we're not done yet.
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      // Had to stop early!
      // Write some more once it drains.
      writer.once('drain', write);
    }
  }
}
```

##### Event: `'error'`

* Type: {Error}

The `'error'` event is emitted if an error occurred while writing or piping
data. The listener callback is passed a single `Error` argument when called.

The stream is closed when the `'error'` event is emitted unless the
`autoDestroy` option was set to `false` when creating the
stream.

After `'error'`, no further events other than `'close'` _should_ be emitted
(including `'error'` events).

##### Event: `'finish'`

The `'finish'` event is emitted after the `stream.end()` method
has been called, and all data has been flushed to the underlying system.

```js
const writer = getWritableStreamSomehow();
for (let i = 0; i < 100; i++) {
  writer.write(`hello, #${i}!\n`);
}
writer.on('finish', () => {
  console.log('All writes are now complete.');
});
writer.end('This is the end\n');
```

##### Event: `'pipe'`

* `src` {stream.Readable} source stream that is piping to this writable

The `'pipe'` event is emitted when the `stream.pipe()` method is called on
a readable stream, adding this writable to its set of destinations.

```js
const writer = getWritableStreamSomehow();
const reader = getReadableStreamSomehow();
writer.on('pipe', (src) => {
  console.log('Something is piping into the writer.');
  assert.equal(src, reader);
});
reader.pipe(writer);
```

##### Event: `'unpipe'`

* `src` {stream.Readable} The source stream that
  unpiped this writable

The `'unpipe'` event is emitted when the `stream.unpipe()` method is called
on a `Readable` stream, removing this `Writable` from its set of
destinations.

This is also emitted in case this `Writable` stream emits an error when a
`Readable` stream pipes into it.

```js
const writer = getWritableStreamSomehow();
const reader = getReadableStreamSomehow();
writer.on('unpipe', (src) => {
  console.log('Something has stopped piping into the writer.');
  assert.equal(src, reader);
});
reader.pipe(writer);
reader.unpipe(writer);
```

##### `writable.cork()`

The `writable.cork()` method forces all written data to be buffered in memory.
The buffered data will be flushed when either the `stream.uncork()` or
`stream.end()` methods are called.

The primary intent of `writable.cork()` is to accommodate a situation in which
several small chunks are written to the stream in rapid succession. Instead of
immediately forwarding them to the underlying destination, `writable.cork()`
buffers all the chunks until `writable.uncork()` is called, which will pass them
all to `writable._writev()`, if present. This prevents a head-of-line blocking
situation where data is being buffered while waiting for the first small chunk
to be processed. However, use of `writable.cork()` without implementing
`writable._writev()` may have an adverse effect on throughput.

See also: `writable.uncork()`, `writable._writev()`.

##### `writable.destroy([error])`

* `error` {Error} Optional, an error to emit with `'error'` event.
* Returns: {this}

Destroy the stream. Optionally emit an `'error'` event, and emit a `'close'`
event (unless `emitClose` is set to `false`). After this call, the writable
stream has ended and subsequent calls to `write()` or `end()` will result in
an `ERR_STREAM_DESTROYED` error.
This is a destructive and immediate way to destroy a stream. Previous calls to
`write()` may not have drained, and may trigger an `ERR_STREAM_DESTROYED` error.
Use `end()` instead of destroy if data should flush before close, or wait for
the `'drain'` event before destroying the stream.

```cjs
const { Writable } = require('node:stream');

const myStream = new Writable();

const fooErr = new Error('foo error');
myStream.destroy(fooErr);
myStream.on('error', (fooErr) => console.error(fooErr.message)); // foo error
```

```cjs
const { Writable } = require('node:stream');

const myStream = new Writable();

myStream.destroy();
myStream.on('error', function wontHappen() {});
```

```cjs
const { Writable } = require('node:stream');

const myStream = new Writable();
myStream.destroy();

myStream.write('foo', (error) => console.error(error.code));
// ERR_STREAM_DESTROYED
```

Once `destroy()` has been called any further calls will be a no-op and no
further errors except from `_destroy()` may be emitted as `'error'`.

Implementors should not override this method,
but instead implement `writable._destroy()`.

##### `writable.closed`

* Type: {boolean}

Is `true` after `'close'` has been emitted.

##### `writable.destroyed`

* Type: {boolean}

Is `true` after `writable.destroy()` has been called.

```cjs
const { Writable } = require('node:stream');

const myStream = new Writable();

console.log(myStream.destroyed); // false
myStream.destroy();
console.log(myStream.destroyed); // true
```

##### `writable.end(chunk[, encoding])`

* `chunk` {string|Buffer|TypedArray|DataView|any} Optional data to write. For
  streams not operating in object mode, `chunk` must be a {string}, {Buffer},
  {TypedArray} or {DataView}. For object mode streams, `chunk` may be any
  JavaScript value other than `null`.
* `encoding` {string} The encoding if `chunk` is a string
* `callback` {Function} Callback for when the stream is finished.
* Returns: {this}

Calling the `writable.end()` method signals that no more data will be written
to the `Writable`. The optional `chunk` and `encoding` arguments allow one
final additional chunk of data to be written immediately before closing the
stream.

Calling the `stream.write()` method after calling
`stream.end()` will raise an error.

```js
// Write 'hello, ' and then end with 'world!'.
const fs = require('node:fs');
const file = fs.createWriteStream('example.txt');
file.write('hello, ');
file.end('world!');
// Writing more now is not allowed!
```

##### `writable.setDefaultEncoding(encoding)`

* `encoding` {string} The new default encoding
* Returns: {this}

The `writable.setDefaultEncoding()` method sets the default `encoding` for a
`Writable` stream.

##### `writable.uncork()`

The `writable.uncork()` method flushes all data buffered since
`stream.cork()` was called.

When using `writable.cork()` and `writable.uncork()` to manage the buffering
of writes to a stream, defer calls to `writable.uncork()` using
`process.nextTick()`. Doing so allows batching of all
`writable.write()` calls that occur within a given Node.js event loop phase.

```js
stream.cork();
stream.write('some ');
stream.write('data ');
process.nextTick(() => stream.uncork());
```

If the `writable.cork()` method is called multiple times on a stream, the
same number of calls to `writable.uncork()` must be called to flush the buffered
data.

```js
stream.cork();
stream.write('some ');
stream.cork();
stream.write('data ');
process.nextTick(() => {
  stream.uncork();
  // The data will not be flushed until uncork() is called a second time.
  stream.uncork();
});
```

See also: `writable.cork()`.

##### `writable.writable`

* Type: {boolean}

Is `true` if it is safe to call `writable.write()`, which means
the stream has not been destroyed, errored, or ended.

##### `writable.writableAborted`

* Type: {boolean}

Returns whether the stream was destroyed or errored before emitting `'finish'`.

##### `writable.writableEnded`

* Type: {boolean}

Is `true` after `writable.end()` has been called. This property
does not indicate whether the data has been flushed, for this use
`writable.writableFinished` instead.

##### `writable.writableCorked`

* Type: {integer}

Number of times `writable.uncork()` needs to be
called in order to fully uncork the stream.

##### `writable.errored`

* Type: {Error}

Returns error if the stream has been destroyed with an error.

##### `writable.writableFinished`

* Type: {boolean}

Is set to `true` immediately before the `'finish'` event is emitted.

##### `writable.writableHighWaterMark`

* Type: {number}

Return the value of `highWaterMark` passed when creating this `Writable`.

##### `writable.writableLength`

* Type: {number}

This property contains the number of bytes (or objects) in the queue
ready to be written. The value provides introspection data regarding
the status of the `highWaterMark`.

##### `writable.writableNeedDrain`

* Type: {boolean}

Is `true` if the stream's buffer has been full and stream will emit `'drain'`.

##### `writable.writableObjectMode`

* Type: {boolean}

Getter for the property `objectMode` of a given `Writable` stream.

##### `writableSymbol.asyncDispose`

Calls `writable.destroy()` with an `AbortError` and returns
a promise that fulfills when the stream is finished.

##### `writable.write(chunk, encoding)`

* `chunk` {string|Buffer|TypedArray|DataView|any} Optional data to write. For
  streams not operating in object mode, `chunk` must be a {string}, {Buffer},
  {TypedArray} or {DataView}. For object mode streams, `chunk` may be any
  JavaScript value other than `null`.
* `encoding` {string|null} The encoding, if `chunk` is a string. **Default:** `'utf8'`
* `callback` {Function} Callback for when this chunk of data is flushed.
* Returns: {boolean} `false` if the stream wishes for the calling code to
  wait for the `'drain'` event to be emitted before continuing to write
  additional data; otherwise `true`.

The `writable.write()` method writes some data to the stream, and calls the
supplied `callback` once the data has been fully handled. If an error
occurs, the `callback` will be called with the error as its
first argument. The `callback` is called asynchronously and before `'error'` is
emitted.

The return value is `true` if the internal buffer is less than the
`highWaterMark` configured when the stream was created after admitting `chunk`.
If `false` is returned, further attempts to write data to the stream should
stop until the `'drain'` event is emitted.

While a stream is not draining, calls to `write()` will buffer `chunk`, and
return false. Once all currently buffered chunks are drained (accepted for
delivery by the operating system), the `'drain'` event will be emitted.
Once `write()` returns false, do not write more chunks
until the `'drain'` event is emitted. While calling `write()` on a stream that
is not draining is allowed, Node.js will buffer all written chunks until
maximum memory usage occurs, at which point it will abort unconditionally.
Even before it aborts, high memory usage will cause poor garbage collector
performance and high RSS (which is not typically released back to the system,
even after the memory is no longer required). Since TCP sockets may never
drain if the remote peer does not read the data, writing a socket that is
not draining may lead to a remotely exploitable vulnerability.

Writing data while the stream is not draining is particularly
problematic for a `Transform`, because the `Transform` streams are paused
by default until they are piped or a `'data'` or `'readable'` event handler
is added.

If the data to be written can be generated or fetched on demand, it is
recommended to encapsulate the logic into a `Readable` and use
`stream.pipe()`. However, if calling `write()` is preferred, it is
possible to respect backpressure and avoid memory issues using the
`'drain'` event:

```js
function write(data, cb) {
  if (!stream.write(data)) {
    stream.once('drain', cb);
  } else {
    process.nextTick(cb);
  }
}

// Wait for cb to be called before doing any other write.
write('hello', () => {
  console.log('Write completed, do more writes now.');
});
```

A `Writable` stream in object mode will always ignore the `encoding` argument.
