---
title: "Stream (part 5 of 11)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/stream.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Stream (part 5 of 11)

```js
const readable = getReadableStreamSomehow();

// 'readable' may be triggered multiple times as data is buffered in
readable.on('readable', () => {
  let chunk;
  console.log('Stream is readable (new data received in buffer)');
  // Use a loop to make sure we read all currently available data
  while (null !== (chunk = readable.read())) {
    console.log(`Read ${chunk.length} bytes of data...`);
  }
});

// 'end' will be triggered once when there is no more data available
readable.on('end', () => {
  console.log('Reached end of stream.');
});
```

Each call to `readable.read()` returns a chunk of data or `null`, signifying
that there's no more data to read at that moment. These chunks aren't automatically
concatenated. Because a single `read()` call does not return all the data, using
a while loop may be necessary to continuously read chunks until all data is retrieved.
When reading a large file, `.read()` might return `null` temporarily, indicating
that it has consumed all buffered content but there may be more data yet to be
buffered. In such cases, a new `'readable'` event is emitted once there's more
data in the buffer, and the `'end'` event signifies the end of data transmission.

Therefore to read a file's whole contents from a `readable`, it is necessary
to collect chunks across multiple `'readable'` events:

```js
const chunks = [];

readable.on('readable', () => {
  let chunk;
  while (null !== (chunk = readable.read())) {
    chunks.push(chunk);
  }
});

readable.on('end', () => {
  const content = chunks.join('');
});
```

A `Readable` stream in object mode will always return a single item from
a call to `readable.read(size)`, regardless of the value of the
`size` argument.

If the `readable.read()` method returns a chunk of data, a `'data'` event will
also be emitted.

Calling `stream.read([size])` after the `'end'` event has
been emitted will return `null`. No runtime error will be raised.

##### `readable.readable`

* Type: {boolean}

Is `true` if it is safe to call `readable.read()`, which means
the stream has not been destroyed or emitted `'error'` or `'end'`.

##### `readable.readableAborted`

* Type: {boolean}

Returns whether the stream was destroyed or errored before emitting `'end'`.

##### `readable.readableDidRead`

* Type: {boolean}

Returns whether `'data'` has been emitted.

##### `readable.readableEncoding`

* Type: {null|string}

Getter for the property `encoding` of a given `Readable` stream. The `encoding`
property can be set using the `readable.setEncoding()` method.

##### `readable.readableEnded`

* Type: {boolean}

Becomes `true` when `'end'` event is emitted.

##### `readable.errored`

* Type: {Error}

Returns error if the stream has been destroyed with an error.

##### `readable.readableFlowing`

* Type: {boolean}

This property reflects the current state of a `Readable` stream as described
in the Three states section.

##### `readable.readableHighWaterMark`

* Type: {number}

Returns the value of `highWaterMark` passed when creating this `Readable`.

##### `readable.readableLength`

* Type: {number}

This property contains the number of bytes (or objects) in the queue
ready to be read. The value provides introspection data regarding
the status of the `highWaterMark`.

##### `readable.readableObjectMode`

* Type: {boolean}

Getter for the property `objectMode` of a given `Readable` stream.

##### `readable.resume()`

* Returns: {this}

The `readable.resume()` method causes an explicitly paused `Readable` stream to
resume emitting `'data'` events, switching the stream into flowing mode.

The `readable.resume()` method can be used to fully consume the data from a
stream without actually processing any of that data:

```js
getReadableStreamSomehow()
  .resume()
  .on('end', () => {
    console.log('Reached the end, but did not read anything.');
  });
```

The `readable.resume()` method has no effect if there is a `'readable'`
event listener.

##### `readable.setEncoding(encoding)`

* `encoding` {string} The encoding to use.
* Returns: {this}

The `readable.setEncoding()` method sets the character encoding for
data read from the `Readable` stream.

By default, no encoding is assigned and stream data will be returned as
`Buffer` objects. Setting an encoding causes the stream data
to be returned as strings of the specified encoding rather than as `Buffer`
objects. For instance, calling `readable.setEncoding('utf8')` will cause the
output data to be interpreted as UTF-8 data, and passed as strings. Calling
`readable.setEncoding('hex')` will cause the data to be encoded in hexadecimal
string format.

The `Readable` stream will properly handle multi-byte characters delivered
through the stream that would otherwise become improperly decoded if simply
pulled from the stream as `Buffer` objects.

```js
const readable = getReadableStreamSomehow();
readable.setEncoding('utf8');
readable.on('data', (chunk) => {
  assert.equal(typeof chunk, 'string');
  console.log('Got %d characters of string data:', chunk.length);
});
```

##### `readable.unpipe([destination])`

* `destination` {stream.Writable} Optional specific stream to unpipe
* Returns: {this}

The `readable.unpipe()` method detaches a `Writable` stream previously attached
using the `stream.pipe()` method.

If the `destination` is not specified, then _all_ pipes are detached.

If the `destination` is specified, but no pipe is set up for it, then
the method does nothing.

```js
const fs = require('node:fs');
const readable = getReadableStreamSomehow();
const writable = fs.createWriteStream('file.txt');
// All the data from readable goes into 'file.txt',
// but only for the first second.
readable.pipe(writable);
setTimeout(() => {
  console.log('Stop writing to file.txt.');
  readable.unpipe(writable);
  console.log('Manually close the file stream.');
  writable.end();
}, 1000);
```

##### `readable.unshift(chunk[, encoding])`

* `chunk` {Buffer|TypedArray|DataView|string|null|any} Chunk of data to unshift
  onto the read queue. For streams not operating in object mode, `chunk` must
  be a {string}, {Buffer}, {TypedArray}, {DataView} or `null`.
  For object mode streams, `chunk` may be any JavaScript value.
* `encoding` {string} Encoding of string chunks. Must be a valid
  `Buffer` encoding, such as `'utf8'` or `'ascii'`.

Passing `chunk` as `null` signals the end of the stream (EOF) and behaves the
same as `readable.push(null)`, after which no more data can be written. The EOF
signal is put at the end of the buffer and any buffered data will still be
flushed.

The `readable.unshift()` method pushes a chunk of data back into the internal
buffer. This is useful in certain situations where a stream is being consumed by
code that needs to "un-consume" some amount of data that it has optimistically
pulled out of the source, so that the data can be passed on to some other party.

The `stream.unshift(chunk)` method cannot be called after the `'end'` event
has been emitted or a runtime error will be thrown.

Developers using `stream.unshift()` often should consider switching to
use of a `Transform` stream instead. See the API for stream implementers
section for more information.

```js
// Pull off a header delimited by \n\n.
// Use unshift() if we get too much.
// Call the callback with (error, header, stream).
const { StringDecoder } = require('node:string_decoder');
function parseHeader(stream, callback) {
  stream.on('error', callback);
  stream.on('readable', onReadable);
  const decoder = new StringDecoder('utf8');
  let header = '';
  function onReadable() {
    let chunk;
    while (null !== (chunk = stream.read())) {
      const str = decoder.write(chunk);
      if (str.includes('\n\n')) {
        // Found the header boundary.
        const split = str.split(/\n\n/);
        header += split.shift();
        const remaining = split.join('\n\n');
        const buf = Buffer.from(remaining, 'utf8');
        stream.removeListener('error', callback);
        // Remove the 'readable' listener before unshifting.
        stream.removeListener('readable', onReadable);
        if (buf.length)
          stream.unshift(buf);
        // Now the body of the message can be read from the stream.
        callback(null, header, stream);
        return;
      }
      // Still reading the header.
      header += str;
    }
  }
}
```

Unlike `stream.push(chunk)`, `stream.unshift(chunk)` will not
end the reading process by resetting the internal reading state of the stream.
This can cause unexpected results if `readable.unshift()` is called during a
read (i.e. from within a `stream._read()` implementation on a
custom stream). Following the call to `readable.unshift()` with an immediate
`stream.push('')` will reset the reading state appropriately,
however it is best to simply avoid calling `readable.unshift()` while in the
process of performing a read.

##### `readable.wrap(stream)`

* `stream` {Stream} An "old style" readable stream
* Returns: {this}

Prior to Node.js 0.10, streams did not implement the entire `node:stream`
module API as it is currently defined. (See Compatibility for more
information.)

When using an older Node.js library that emits `'data'` events and has a
`stream.pause()` method that is advisory only, the
`readable.wrap()` method can be used to create a `Readable` stream that uses
the old stream as its data source.

It will rarely be necessary to use `readable.wrap()` but the method has been
provided as a convenience for interacting with older Node.js applications and
libraries.

```js
const { OldReader } = require('./old-api-module.js');
const { Readable } = require('node:stream');
const oreader = new OldReader();
const myReader = new Readable().wrap(oreader);

myReader.on('readable', () => {
  myReader.read(); // etc.
});
```

##### `readableSymbol.asyncIterator`

* Returns: {AsyncIterator} to fully consume the stream.

```js
const fs = require('node:fs');

async function print(readable) {
  readable.setEncoding('utf8');
  let data = '';
  for await (const chunk of readable) {
    data += chunk;
  }
  console.log(data);
}

print(fs.createReadStream('file')).catch(console.error);
```

If the loop terminates with a `break`, `return`, or a `throw`, the stream will
be destroyed. In other terms, iterating over a stream will consume the stream
fully. The stream will be read in chunks of size equal to the `highWaterMark`
option. In the code example above, data will be in a single chunk if the file
has less than 64 KiB of data because no `highWaterMark` option is provided to
`fs.createReadStream()`.

##### `readableSymbol.for('Stream.toAsyncStreamable')`

> Stability: 1 - Experimental

* Returns: {AsyncIterable} An `AsyncIterable<Uint8Array[]>` that yields
  batched chunks from the stream.

When the `--experimental-stream-iter` flag is enabled, `Readable` streams
implement the `Stream.toAsyncStreamable` protocol, enabling efficient
consumption by the `stream/iter` API.

This provides a batched async iterator that drains the stream's internal
buffer into `Uint8Array[]` batches, amortizing the per-chunk Promise overhead
of the standard `Symbol.asyncIterator` path. For byte-mode streams, chunks
are yielded directly as `Buffer` instances (which are `Uint8Array` subclasses).
For object-mode or encoded streams, each chunk is normalized to `Uint8Array`
before batching.

The returned iterator is tagged as a validated source, so `from()`
passes it through without additional normalization.

```mjs
import { Readable } from 'node:stream';
import { text, from } from 'node:stream/iter';

const readable = new Readable({
  read() { this.push('hello'); this.push(null); },
});

// Readable is automatically consumed via toAsyncStreamable
console.log(await text(from(readable))); // 'hello'
```

```cjs
const { Readable } = require('node:stream');
const { text, from } = require('node:stream/iter');

async function run() {
  const readable = new Readable({
    read() { this.push('hello'); this.push(null); },
  });

  console.log(await text(from(readable))); // 'hello'
}

run().catch(console.error);
```

Without the `--experimental-stream-iter` flag, calling this method throws
`ERR_STREAM_ITER_MISSING_FLAG`.

##### `readableSymbol.asyncDispose`

Calls `readable.destroy()` with an `AbortError` and returns
a promise that fulfills when the stream is finished.

##### `readable.compose(stream[, options])`

* `stream` {Writable|Duplex|WritableStream|TransformStream|Function}
* `options` {Object}
  * `signal` {AbortSignal} allows destroying the stream if the signal is
    aborted.
* Returns: {Duplex} a stream composed with the stream `stream`.

```mjs
import { Readable } from 'node:stream';

async function* splitToWords(source) {
  for await (const chunk of source) {
    const words = String(chunk).split(' ');

    for (const word of words) {
      yield word;
    }
  }
}

const wordsStream = Readable.from(['text passed through', 'composed stream']).compose(splitToWords);
const words = await wordsStream.toArray();

console.log(words); // prints ['text', 'passed', 'through', 'composed', 'stream']
```

`readable.compose(s)` is equivalent to `stream.compose(readable, s)`.

This method also allows for an {AbortSignal} to be provided, which will destroy
the composed stream when aborted.

See `stream.compose(...streams)` for more information.

##### `readable.iterator([options])`

* `options` {Object}
  * `destroyOnReturn` {boolean} When set to `false`, calling `return` on the
    async iterator, or exiting a `for await...of` iteration using a `break`,
    `return`, or `throw` will not destroy the stream. **Default:** `true`.
* Returns: {AsyncIterator} to consume the stream.

The iterator created by this method gives users the option to cancel the
destruction of the stream if the `for await...of` loop is exited by `return`,
`break`, or `throw`, or if the iterator should destroy the stream if the stream
emitted an error during iteration.

```js
const { Readable } = require('node:stream');

async function printIterator(readable) {
  for await (const chunk of readable.iterator({ destroyOnReturn: false })) {
    console.log(chunk); // 1
    break;
  }

  console.log(readable.destroyed); // false

  for await (const chunk of readable.iterator({ destroyOnReturn: false })) {
    console.log(chunk); // Will print 2 and then 3
  }

  console.log(readable.destroyed); // True, stream was totally consumed
}

async function printSymbolAsyncIterator(readable) {
  for await (const chunk of readable) {
    console.log(chunk); // 1
    break;
  }

  console.log(readable.destroyed); // true
}

async function showBoth() {
  await printIterator(Readable.from([1, 2, 3]));
  await printSymbolAsyncIterator(Readable.from([1, 2, 3]));
}

showBoth();
```

##### `readable.map(fn[, options])`

> Stability: 1 - Experimental
