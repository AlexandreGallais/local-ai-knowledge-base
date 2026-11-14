---
title: "Stream (part 8 of 11)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/stream.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Stream (part 8 of 11)

### `stream.Readable.toWeb(streamReadable[, options])`

* `streamReadable` {stream.Readable}
* `options` {Object}
  * `strategy` {Object}
    * `highWaterMark` {number} The maximum internal queue size (of the created
      `ReadableStream`) before backpressure is applied in reading from the given
      `stream.Readable`. If no value is provided, it will be taken from the
      given `stream.Readable`.
    * `size` {Function} A function that size of the given chunk of data.
      If no value is provided, the size will be `1` for all the chunks.
      * `chunk` {any}
      * Returns: {number}
  * `type` {string} Specifies the type of the created `ReadableStream`. Must be
    `'bytes'` or undefined.
* Returns: {ReadableStream}

### `stream.Writable.fromWeb(writableStream[, options])`

* `writableStream` {WritableStream}
* `options` {Object}
  * `decodeStrings` {boolean}
  * `highWaterMark` {number}
  * `objectMode` {boolean}
  * `signal` {AbortSignal}
* Returns: {stream.Writable}

### `stream.Writable.toWeb(streamWritable)`

* `streamWritable` {stream.Writable}
* Returns: {WritableStream}

### `stream.Duplex.from(src)`

* `src` {Stream|Blob|ArrayBuffer|string|Iterable|AsyncIterable|
  AsyncGeneratorFunction|AsyncFunction|Promise|Object|
  ReadableStream|WritableStream}

A utility method for creating duplex streams.

* `Stream` converts writable stream into writable `Duplex` and readable stream
  to `Duplex`.
* `Blob` converts into readable `Duplex`.
* `string` converts into readable `Duplex`.
* `ArrayBuffer` converts into readable `Duplex`.
* `AsyncIterable` converts into a readable `Duplex`. Cannot yield
  `null`.
* `AsyncGeneratorFunction` converts into a readable/writable transform
  `Duplex`. Must take a source `AsyncIterable` as first parameter. Cannot yield
  `null`.
* `AsyncFunction` converts into a writable `Duplex`. Must return
  either `null` or `undefined`
* `Object ({ writable, readable })` converts `readable` and
  `writable` into `Stream` and then combines them into `Duplex` where the
  `Duplex` will write to the `writable` and read from the `readable`.
* `Promise` converts into readable `Duplex`. Value `null` is ignored.
* `ReadableStream` converts into readable `Duplex`.
* `WritableStream` converts into writable `Duplex`.
* Returns: {stream.Duplex}

If an `Iterable` object containing promises is passed as an argument,
it might result in unhandled rejection.

```js
const { Duplex } = require('node:stream');

Duplex.from([
  new Promise((resolve) => setTimeout(resolve('1'), 1500)),
  new Promise((_, reject) => setTimeout(reject(new Error('2')), 1000)), // Unhandled rejection
]);
```

### `stream.Duplex.fromWeb(pair[, options])`

* `pair` {Object}
  * `readable` {ReadableStream}
  * `writable` {WritableStream}
* `options` {Object}
  * `allowHalfOpen` {boolean}
  * `decodeStrings` {boolean}
  * `encoding` {string}
  * `highWaterMark` {number}
  * `objectMode` {boolean}
  * `signal` {AbortSignal}
* Returns: {stream.Duplex}

```mjs
import { Duplex } from 'node:stream';
import {
  ReadableStream,
  WritableStream,
} from 'node:stream/web';

const readable = new ReadableStream({
  start(controller) {
    controller.enqueue('world');
  },
});

const writable = new WritableStream({
  write(chunk) {
    console.log('writable', chunk);
  },
});

const pair = {
  readable,
  writable,
};
const duplex = Duplex.fromWeb(pair, { encoding: 'utf8', objectMode: true });

duplex.write('hello');

for await (const chunk of duplex) {
  console.log('readable', chunk);
}
```

```cjs
const { Duplex } = require('node:stream');
const {
  ReadableStream,
  WritableStream,
} = require('node:stream/web');

const readable = new ReadableStream({
  start(controller) {
    controller.enqueue('world');
  },
});

const writable = new WritableStream({
  write(chunk) {
    console.log('writable', chunk);
  },
});

const pair = {
  readable,
  writable,
};
const duplex = Duplex.fromWeb(pair, { encoding: 'utf8', objectMode: true });

duplex.write('hello');
duplex.once('readable', () => console.log('readable', duplex.read()));
```

### `stream.Duplex.toWeb(streamDuplex[, options])`

* `streamDuplex` {stream.Duplex}
* `options` {Object}
  * `readableType` {string} Specifies the type of the `ReadableStream` half of
    the created readable-writable pair. Must be `'bytes'` or undefined.
    (`options.type` is a deprecated alias for this option.)
* Returns: {Object}
  * `readable` {ReadableStream}
  * `writable` {WritableStream}

```mjs
import { Duplex } from 'node:stream';

const duplex = Duplex({
  objectMode: true,
  read() {
    this.push('world');
    this.push(null);
  },
  write(chunk, encoding, callback) {
    console.log('writable', chunk);
    callback();
  },
});

const { readable, writable } = Duplex.toWeb(duplex);
writable.getWriter().write('hello');

const { value } = await readable.getReader().read();
console.log('readable', value);
```

```cjs
const { Duplex } = require('node:stream');

const duplex = Duplex({
  objectMode: true,
  read() {
    this.push('world');
    this.push(null);
  },
  write(chunk, encoding, callback) {
    console.log('writable', chunk);
    callback();
  },
});

const { readable, writable } = Duplex.toWeb(duplex);
writable.getWriter().write('hello');

readable.getReader().read().then((result) => {
  console.log('readable', result.value);
});
```

### `stream.addAbortSignal(signal, stream)`

* `signal` {AbortSignal} A signal representing possible cancellation
* `stream` {Stream|ReadableStream|WritableStream} A stream to attach a signal
  to.

Attaches an AbortSignal to a readable or writable stream. This lets code
control stream destruction using an `AbortController`.

> Stability: 0 - Deprecated. Using `stream.addAbortSignal()` to destroy
> long-lived stream resources is documentation-only deprecated. See
> DEP0209.

Calling `abort` on the `AbortController` corresponding to the passed
`AbortSignal` will behave the same way as calling `.destroy(new AbortError())`
on the stream, and `controller.error(new AbortError())` for webstreams.

```js
const fs = require('node:fs');

const controller = new AbortController();
const read = addAbortSignal(
  controller.signal,
  fs.createReadStream(('object.json')),
);
// Later, abort the operation closing the stream
controller.abort();
```

Or using an `AbortSignal` with a readable stream as an async iterable:

```js
const controller = new AbortController();
setTimeout(() => controller.abort(), 10_000); // set a timeout
const stream = addAbortSignal(
  controller.signal,
  fs.createReadStream(('object.json')),
);
(async () => {
  try {
    for await (const chunk of stream) {
      await process(chunk);
    }
  } catch (e) {
    if (e.name === 'AbortError') {
      // The operation was cancelled
    } else {
      throw e;
    }
  }
})();
```

Or using an `AbortSignal` with a ReadableStream:

```js
const controller = new AbortController();
const rs = new ReadableStream({
  start(controller) {
    controller.enqueue('hello');
    controller.enqueue('world');
    controller.close();
  },
});

addAbortSignal(controller.signal, rs);

finished(rs, (err) => {
  if (err) {
    if (err.name === 'AbortError') {
      // The operation was cancelled
    }
  }
});

const reader = rs.getReader();

reader.read().then(({ value, done }) => {
  console.log(value); // hello
  console.log(done); // false
  controller.abort();
});
```

### `stream.getDefaultHighWaterMark(objectMode)`

* `objectMode` {boolean}
* Returns: {integer}

Returns the default highWaterMark used by streams. Defaults to `16` for
`objectMode`. For byte streams, it defaults to `65536` (64 KiB) on non-Windows
platforms and `16384` (16 KiB) on Windows.

### `stream.setDefaultHighWaterMark(objectMode, value)`

* `objectMode` {boolean}
* `value` {integer} highWaterMark value

Sets the default highWaterMark used by streams.
