---
title: "Stream (part 7 of 11)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/stream.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Stream (part 7 of 11)

* `fn` {Function|AsyncFunction} a reducer function to call over every chunk
  in the stream.
  * `previous` {any} the value obtained from the last call to `fn` or the
    `initial` value if specified or the first chunk of the stream otherwise.
  * `data` {any} a chunk of data from the stream.
  * `options` {Object}
    * `signal` {AbortSignal} aborted if the stream is destroyed allowing to
      abort the `fn` call early.
* `initial` {any} the initial value to use in the reduction.
* `options` {Object}
  * `signal` {AbortSignal} allows destroying the stream if the signal is
    aborted.
* Returns: {Promise} a promise for the final value of the reduction.

This method calls `fn` on each chunk of the stream in order, passing it the
result from the calculation on the previous element. It returns a promise for
the final value of the reduction.

If no `initial` value is supplied the first chunk of the stream is used as the
initial value. If the stream is empty, the promise is rejected with a
`TypeError` with the `ERR_INVALID_ARGS` code property.

```mjs
import { Readable } from 'node:stream';
import { readdir, stat } from 'node:fs/promises';
import { join } from 'node:path';

const directoryPath = './src';
const filesInDir = await readdir(directoryPath);

const folderSize = await Readable.from(filesInDir)
  .reduce(async (totalSize, file) => {
    const { size } = await stat(join(directoryPath, file));
    return totalSize + size;
  }, 0);

console.log(folderSize);
```

The reducer function iterates the stream element-by-element which means that
there is no `concurrency` parameter or parallelism. To perform a `reduce`
concurrently, you can extract the async function to `readable.map` method.

```mjs
import { Readable } from 'node:stream';
import { readdir, stat } from 'node:fs/promises';
import { join } from 'node:path';

const directoryPath = './src';
const filesInDir = await readdir(directoryPath);

const folderSize = await Readable.from(filesInDir)
  .map((file) => stat(join(directoryPath, file)), { concurrency: 2 })
  .reduce((totalSize, { size }) => totalSize + size, 0);

console.log(folderSize);
```

### Duplex and transform streams

#### Class: `stream.Duplex`

Duplex streams are streams that implement both the `Readable` and
`Writable` interfaces.

Examples of `Duplex` streams include:

* TCP sockets
* zlib streams
* crypto streams

##### `duplex.allowHalfOpen`

* Type: {boolean}

If `false` then the stream will automatically end the writable side when the
readable side ends. Set initially by the `allowHalfOpen` constructor option,
which defaults to `true`.

This can be changed manually to change the half-open behavior of an existing
`Duplex` stream instance, but must be changed before the `'end'` event is
emitted.

#### Class: `stream.Transform`

Transform streams are `Duplex` streams where the output is in some way
related to the input. Like all `Duplex` streams, `Transform` streams
implement both the `Readable` and `Writable` interfaces.

Examples of `Transform` streams include:

* zlib streams
* crypto streams

##### `transform.destroy([error])`

* `error` {Error}
* Returns: {this}

Destroy the stream, and optionally emit an `'error'` event. After this call, the
transform stream would release any internal resources.
Implementors should not override this method, but instead implement
`readable._destroy()`.
The default implementation of `_destroy()` for `Transform` also emit `'close'`
unless `emitClose` is set in false.

Once `destroy()` has been called, any further calls will be a no-op and no
further errors except from `_destroy()` may be emitted as `'error'`.

#### `stream.duplexPair([options])`

* `options` {Object} A value to pass to both `Duplex` constructors,
  to set options such as buffering.
* Returns: {Array} of two `Duplex` instances.

The utility function `duplexPair` returns an Array with two items,
each being a `Duplex` stream connected to the other side:

```js
const [ sideA, sideB ] = duplexPair();
```

Whatever is written to one stream is made readable on the other. It provides
behavior analogous to a network connection, where the data written by the client
becomes readable by the server, and vice-versa.

The Duplex streams are symmetrical; one or the other may be used without any
difference in behavior.

### `stream.finished(stream[, options], callback)`

* `stream` {Stream|ReadableStream|WritableStream} A readable and/or writable
  stream/webstream.
* `options` {Object}
  * `error` {boolean} If set to `false`, then a call to `emit('error', err)` is
    not treated as finished. **Default:** `true`.
  * `readable` {boolean} When set to `false`, the callback will be called when
    the stream ends even though the stream might still be readable.
    **Default:** `true`.
  * `writable` {boolean} When set to `false`, the callback will be called when
    the stream ends even though the stream might still be writable.
    **Default:** `true`.
  * `signal` {AbortSignal} allows aborting the wait for the stream finish. The
    underlying stream will _not_ be aborted if the signal is aborted. The
    callback will get called with an `AbortError`. All registered
    listeners added by this function will also be removed.
* `callback` {Function} A callback function that takes an optional error
  argument.
* Returns: {Function} A cleanup function which removes all registered
  listeners.

A function to get notified when a stream is no longer readable, writable
or has experienced an error or a premature close event.

```js
const { finished } = require('node:stream');
const fs = require('node:fs');

const rs = fs.createReadStream('archive.tar');

finished(rs, (err) => {
  if (err) {
    console.error('Stream failed.', err);
  } else {
    console.log('Stream is done reading.');
  }
});

rs.resume(); // Drain the stream.
```

Especially useful in error handling scenarios where a stream is destroyed
prematurely (like an aborted HTTP request), and will not emit `'end'`
or `'finish'`.

The `finished` API provides promise version.

`stream.finished()` leaves dangling event listeners (in particular
`'error'`, `'end'`, `'finish'` and `'close'`) after `callback` has been
invoked. The reason for this is so that unexpected `'error'` events (due to
incorrect stream implementations) do not cause unexpected crashes.
If this is unwanted behavior then the returned cleanup function needs to be
invoked in the callback:

```js
const cleanup = finished(rs, (err) => {
  cleanup();
  // ...
});
```

### `stream.pipeline(streams, callback)`

* `streams` {Stream\[]|Iterable\[]|AsyncIterable\[]|Function\[]|
  ReadableStream\[]|WritableStream\[]|TransformStream\[]}
* `source` {Stream|Iterable|AsyncIterable|Function|ReadableStream}
  * Returns: {Iterable|AsyncIterable}
* `...transforms` {Stream|Function|TransformStream}
  * `source` {AsyncIterable}
  * Returns: {AsyncIterable}
* `destination` {Stream|Function|WritableStream}
  * `source` {AsyncIterable}
  * Returns: {AsyncIterable|Promise}
* `callback` {Function} Called when the pipeline is fully done.
  * `err` {Error}
  * `val` Resolved value of `Promise` returned by `destination`.
* Returns: {Stream}

A module method to pipe between streams and generators forwarding errors and
properly cleaning up and provide a callback when the pipeline is complete.

```js
const { pipeline } = require('node:stream');
const fs = require('node:fs');
const zlib = require('node:zlib');

// Use the pipeline API to easily pipe a series of streams
// together and get notified when the pipeline is fully done.

// A pipeline to gzip a potentially huge tar file efficiently:

pipeline(
  fs.createReadStream('archive.tar'),
  zlib.createGzip(),
  fs.createWriteStream('archive.tar.gz'),
  (err) => {
    if (err) {
      console.error('Pipeline failed.', err);
    } else {
      console.log('Pipeline succeeded.');
    }
  },
);
```

The `pipeline` API provides a promise version.

`stream.pipeline()` will call `stream.destroy(err)` on all streams except:

* `Readable` streams which have emitted `'end'` or `'close'`.
* `Writable` streams which have emitted `'finish'` or `'close'`.

`stream.pipeline()` leaves dangling event listeners on the streams
after the `callback` has been invoked. In the case of reuse of streams after
failure, this can cause event listener leaks and swallowed errors. If the last
stream is readable, dangling event listeners will be removed so that the last
stream can be consumed later.

`stream.pipeline()` closes all the streams when an error is raised.
The `IncomingRequest` usage with `pipeline` could lead to an unexpected behavior
once it would destroy the socket without sending the expected response.
See the example below:

```js
const fs = require('node:fs');
const http = require('node:http');
const { pipeline } = require('node:stream');

const server = http.createServer((req, res) => {
  const fileStream = fs.createReadStream('./fileNotExist.txt');
  pipeline(fileStream, res, (err) => {
    if (err) {
      console.log(err); // No such file
      // this message can't be sent once `pipeline` already destroyed the socket
      return res.end('error!!!');
    }
  });
});
```

### `stream.compose(...streams)`

* `streams` {Stream\[]|Iterable\[]|AsyncIterable\[]|Function\[]|
  ReadableStream\[]|WritableStream\[]|TransformStream\[]|Duplex\[]|Function}
* Returns: {stream.Duplex}

Combines two or more streams into a `Duplex` stream that writes to the
first stream and reads from the last. Each provided stream is piped into
the next, using `stream.pipeline`. If any of the streams error then all
are destroyed, including the outer `Duplex` stream.

Because `stream.compose` returns a new stream that in turn can (and
should) be piped into other streams, it enables composition. In contrast,
when passing streams to `stream.pipeline`, typically the first stream is
a readable stream and the last a writable stream, forming a closed
circuit.

If passed a `Function` it must be a factory method taking a `source`
`Iterable`.

```mjs
import { compose, Transform } from 'node:stream';

const removeSpaces = new Transform({
  transform(chunk, encoding, callback) {
    callback(null, String(chunk).replace(' ', ''));
  },
});

async function* toUpper(source) {
  for await (const chunk of source) {
    yield String(chunk).toUpperCase();
  }
}

let res = '';
for await (const buf of compose(removeSpaces, toUpper).end('hello world')) {
  res += buf;
}

console.log(res); // prints 'HELLOWORLD'
```

`stream.compose` can be used to convert async iterables, generators and
functions into streams.

* `AsyncIterable` converts into a readable `Duplex`. Cannot yield
  `null`.
* `AsyncGeneratorFunction` converts into a readable/writable transform `Duplex`.
  Must take a source `AsyncIterable` as first parameter. Cannot yield
  `null`.
* `AsyncFunction` converts into a writable `Duplex`. Must return
  either `null` or `undefined`.

```mjs
import { compose } from 'node:stream';
import { finished } from 'node:stream/promises';

// Convert AsyncIterable into readable Duplex.
const s1 = compose(async function*() {
  yield 'Hello';
  yield 'World';
}());

// Convert AsyncGenerator into transform Duplex.
const s2 = compose(async function*(source) {
  for await (const chunk of source) {
    yield String(chunk).toUpperCase();
  }
});

let res = '';

// Convert AsyncFunction into writable Duplex.
const s3 = compose(async function(source) {
  for await (const chunk of source) {
    res += chunk;
  }
});

await finished(compose(s1, s2, s3));

console.log(res); // prints 'HELLOWORLD'
```

For convenience, the `readable.compose(stream)` method is available on
{Readable} and {Duplex} streams as a wrapper for this function.

### `stream.isDestroyed(stream)`

* `stream` {Readable|Writable|Duplex}
* Returns: {boolean|null} - Only returns `null` if `stream` is not a valid `Readable`, `Writable` or `Duplex`.

Returns whether the stream has been destroyed.

### `stream.isErrored(stream)`

* `stream` {Readable|Writable|Duplex|WritableStream|ReadableStream}
* Returns: {boolean}

Returns whether the stream has encountered an error.

### `stream.isReadable(stream)`

* `stream` {Readable|Duplex|ReadableStream}
* Returns: {boolean|null} - Only returns `null` if `stream` is not a valid `Readable`, `Duplex` or `ReadableStream`.

Returns whether the stream is readable.

### `stream.isWritable(stream)`

* `stream` {Writable|Duplex|WritableStream}
* Returns: {boolean|null} - Only returns `null` if `stream` is not a valid `Writable`, `Duplex` or `WritableStream`.

Returns whether the stream is writable.

### `stream.Readable.from(iterable[, options])`

* `iterable` {Iterable} Object implementing the `Symbol.asyncIterator` or
  `Symbol.iterator` iterable protocol. Emits an 'error' event if a null
  value is passed.
* `options` {Object} Options provided to `new stream.Readable([options])`.
  By default, `Readable.from()` will set `options.objectMode` to `true`, unless
  this is explicitly opted out by setting `options.objectMode` to `false`.
* Returns: {stream.Readable}

A utility method for creating readable streams out of iterators.

```js
const { Readable } = require('node:stream');

async function * generate() {
  yield 'hello';
  yield 'streams';
}

const readable = Readable.from(generate());

readable.on('data', (chunk) => {
  console.log(chunk);
});
```

Calling `Readable.from(string)` or `Readable.from(buffer)` will not have
the strings or buffers be iterated to match the other streams semantics
for performance reasons.

If an `Iterable` object containing promises is passed as an argument,
it might result in unhandled rejection.

```js
const { Readable } = require('node:stream');

Readable.from([
  new Promise((resolve) => setTimeout(resolve('1'), 1500)),
  new Promise((_, reject) => setTimeout(reject(new Error('2')), 1000)), // Unhandled rejection
]);
```

### `stream.Readable.fromWeb(readableStream[, options])`

* `readableStream` {ReadableStream}
* `options` {Object}
  * `encoding` {string}
  * `highWaterMark` {number}
  * `objectMode` {boolean}
  * `signal` {AbortSignal}
* Returns: {stream.Readable}

### `stream.Readable.isDisturbed(stream)`

* `stream` {stream.Readable|ReadableStream}
* Returns: `boolean`

Returns whether the stream has been read from or cancelled.
