---
title: "Stream (part 10 of 11)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/stream.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Stream (part 10 of 11)

### Implementing a readable stream

The `stream.Readable` class is extended to implement a `Readable` stream.

Custom `Readable` streams _must_ call the `new stream.Readable([options])`
constructor and implement the `readable._read()` method.

#### `new stream.Readable([options])`

* `options` {Object}
  * `highWaterMark` {number} The maximum number of bytes to store
    in the internal buffer before ceasing to read from the underlying resource.
    **Default:** See `stream.getDefaultHighWaterMark()`.
  * `encoding` {string} If specified, then buffers will be decoded to
    strings using the specified encoding. **Default:** `null`.
  * `objectMode` {boolean} Whether this stream should behave
    as a stream of objects. Meaning that `stream.read(n)` returns
    a single value instead of a `Buffer` of size `n`. **Default:** `false`.
  * `emitClose` {boolean} Whether or not the stream should emit `'close'`
    after it has been destroyed. **Default:** `true`.
  * `read` {Function} Implementation for the `stream._read()`
    method.
  * `destroy` {Function} Implementation for the
    `stream._destroy()` method.
  * `construct` {Function} Implementation for the
    `stream._construct()` method.
  * `autoDestroy` {boolean} Whether this stream should automatically call
    `.destroy()` on itself after ending. **Default:** `true`.
  * `signal` {AbortSignal} A signal representing possible cancellation.

```js
const { Readable } = require('node:stream');

class MyReadable extends Readable {
  constructor(options) {
    // Calls the stream.Readable(options) constructor.
    super(options);
    // ...
  }
}
```

Or, using the simplified constructor approach:

```js
const { Readable } = require('node:stream');

const myReadable = new Readable({
  read(size) {
    // ...
  },
});
```

Calling `abort` on the `AbortController` corresponding to the passed
`AbortSignal` will behave the same way as calling `.destroy(new AbortError())`
on the readable created.

```js
const { Readable } = require('node:stream');
const controller = new AbortController();
const read = new Readable({
  read(size) {
    // ...
  },
  signal: controller.signal,
});
// Later, abort the operation closing the stream
controller.abort();
```

#### `readable._construct(callback)`

* `callback` {Function} Call this function (optionally with an error
  argument) when the stream has finished initializing.

The `_construct()` method MUST NOT be called directly. It may be implemented
by child classes, and if so, will be called by the internal `Readable`
class methods only.

This optional function will be scheduled in the next tick by the stream
constructor, delaying any `_read()` and `_destroy()` calls until `callback` is
called. This is useful to initialize state or asynchronously initialize
resources before the stream can be used.

```js
const { Readable } = require('node:stream');
const fs = require('node:fs');

class ReadStream extends Readable {
  constructor(filename) {
    super();
    this.filename = filename;
    this.fd = null;
  }
  _construct(callback) {
    fs.open(this.filename, (err, fd) => {
      if (err) {
        callback(err);
      } else {
        this.fd = fd;
        callback();
      }
    });
  }
  _read(n) {
    const buf = Buffer.alloc(n);
    fs.read(this.fd, buf, 0, n, null, (err, bytesRead) => {
      if (err) {
        this.destroy(err);
      } else {
        this.push(bytesRead > 0 ? buf.slice(0, bytesRead) : null);
      }
    });
  }
  _destroy(err, callback) {
    if (this.fd) {
      fs.close(this.fd, (er) => callback(er || err));
    } else {
      callback(err);
    }
  }
}
```

#### `readable._read(size)`

* `size` {number} Number of bytes to read asynchronously

This function MUST NOT be called by application code directly. It should be
implemented by child classes, and called by the internal `Readable` class
methods only.

All `Readable` stream implementations must provide an implementation of the
`readable._read()` method to fetch data from the underlying resource.

When `readable._read()` is called, if data is available from the resource,
the implementation should begin pushing that data into the read queue using the
`this.push(dataChunk)` method. `_read()` will be called again
after each call to `this.push(dataChunk)` once the stream is
ready to accept more data. `_read()` may continue reading from the resource and
pushing data until `readable.push()` returns `false`. Only when `_read()` is
called again after it has stopped should it resume pushing additional data into
the queue.

Once the `readable._read()` method has been called, it will not be called
again until more data is pushed through the `readable.push()`
method. Empty data such as empty buffers and strings will not cause
`readable._read()` to be called.

The `size` argument is advisory. For implementations where a "read" is a
single operation that returns data can use the `size` argument to determine how
much data to fetch. Other implementations may ignore this argument and simply
provide data whenever it becomes available. There is no need to "wait" until
`size` bytes are available before calling `stream.push(chunk)`.

The `readable._read()` method is prefixed with an underscore because it is
internal to the class that defines it, and should never be called directly by
user programs.

#### `readable._destroy(err, callback)`

* `err` {Error} A possible error.
* `callback` {Function} A callback function that takes an optional error
  argument.

The `_destroy()` method is called by `readable.destroy()`.
It can be overridden by child classes but it **must not** be called directly.

#### `readable.push(chunk[, encoding])`

* `chunk` {Buffer|TypedArray|DataView|string|null|any} Chunk of data to push
  into the read queue. For streams not operating in object mode, `chunk` must
  be a {string}, {Buffer}, {TypedArray} or {DataView}. For object mode streams,
  `chunk` may be any JavaScript value.
* `encoding` {string} Encoding of string chunks. Must be a valid
  `Buffer` encoding, such as `'utf8'` or `'ascii'`.
* Returns: {boolean} `true` if additional chunks of data may continue to be
  pushed; `false` otherwise.

When `chunk` is a {Buffer}, {TypedArray}, {DataView} or {string}, the `chunk`
of data will be added to the internal queue for users of the stream to consume.
Passing `chunk` as `null` signals the end of the stream (EOF), after which no
more data can be written.

When the `Readable` is operating in paused mode, the data added with
`readable.push()` can be read out by calling the
`readable.read()` method when the `'readable'` event is
emitted.

When the `Readable` is operating in flowing mode, the data added with
`readable.push()` will be delivered by emitting a `'data'` event.

The `readable.push()` method is designed to be as flexible as possible. For
example, when wrapping a lower-level source that provides some form of
pause/resume mechanism, and a data callback, the low-level source can be wrapped
by the custom `Readable` instance:

```js
// `_source` is an object with readStop() and readStart() methods,
// and an `ondata` member that gets called when it has data, and
// an `onend` member that gets called when the data is over.

class SourceWrapper extends Readable {
  constructor(options) {
    super(options);

    this._source = getLowLevelSourceObject();

    // Every time there's data, push it into the internal buffer.
    this._source.ondata = (chunk) => {
      // If push() returns false, then stop reading from source.
      if (!this.push(chunk))
        this._source.readStop();
    };

    // When the source ends, push the EOF-signaling `null` chunk.
    this._source.onend = () => {
      this.push(null);
    };
  }
  // _read() will be called when the stream wants to pull more data in.
  // The advisory size argument is ignored in this case.
  _read(size) {
    this._source.readStart();
  }
}
```

The `readable.push()` method is used to push the content
into the internal buffer. It can be driven by the `readable._read()` method.

For streams not operating in object mode, if the `chunk` parameter of
`readable.push()` is `undefined`, it will be treated as empty string or
buffer. See `readable.push('')` for more information.

#### Errors while reading

Errors occurring during processing of the `readable._read()` must be
propagated through the `readable.destroy(err)` method.
Throwing an `Error` from within `readable._read()` or manually emitting an
`'error'` event results in undefined behavior.

```js
const { Readable } = require('node:stream');

const myReadable = new Readable({
  read(size) {
    const err = checkSomeErrorCondition();
    if (err) {
      this.destroy(err);
    } else {
      // Do some work.
    }
  },
});
```

#### An example counting stream

The following is a basic <example-value> of a `Readable` stream that emits the numerals
from 1 to 1,000,000 in ascending order, and then ends.

```js
const { Readable } = require('node:stream');

class Counter extends Readable {
  constructor(opt) {
    super(opt);
    this._max = 1000000;
    this._index = 1;
  }

  _read() {
    const i = this._index++;
    if (i > this._max)
      this.push(null);
    else {
      const str = String(i);
      const buf = Buffer.from(str, 'ascii');
      this.push(buf);
    }
  }
}
```

### Implementing a duplex stream

A `Duplex` stream is one that implements both `Readable` and
`Writable`, such as a TCP socket connection.

Because JavaScript does not have support for multiple inheritance, the
`stream.Duplex` class is extended to implement a `Duplex` stream (as opposed
to extending the `stream.Readable` _and_ `stream.Writable` classes).

The `stream.Duplex` class prototypically inherits from `stream.Readable` and
parasitically from `stream.Writable`, but `instanceof` will work properly for
both base classes due to overriding `Symbol.hasInstance` on
`stream.Writable`.

Custom `Duplex` streams _must_ call the `new stream.Duplex([options])`
constructor and implement _both_ the `readable._read()` and
`writable._write()` methods.

#### `new stream.Duplex(options)`

* `options` {Object} Passed to both `Writable` and `Readable`
  constructors. Also has the following fields:
  * `allowHalfOpen` {boolean} If set to `false`, then the stream will
    automatically end the writable side when the readable side ends.
    **Default:** `true`.
  * `readable` {boolean} Sets whether the `Duplex` should be readable.
    **Default:** `true`.
  * `writable` {boolean} Sets whether the `Duplex` should be writable.
    **Default:** `true`.
  * `readableObjectMode` {boolean} Sets `objectMode` for readable side of the
    stream. Has no effect if `objectMode` is `true`. **Default:** `false`.
  * `writableObjectMode` {boolean} Sets `objectMode` for writable side of the
    stream. Has no effect if `objectMode` is `true`. **Default:** `false`.
  * `readableHighWaterMark` {number} Sets `highWaterMark` for the readable side
    of the stream. Has no effect if `highWaterMark` is provided.
  * `writableHighWaterMark` {number} Sets `highWaterMark` for the writable side
    of the stream. Has no effect if `highWaterMark` is provided.

```cjs
const { Duplex } = require('node:stream');

class MyDuplex extends Duplex {
  constructor(options) {
    super(options);
    // ...
  }
}
```

```mjs
import { Duplex } from 'node:stream';

class MyDuplex extends Duplex {
  constructor(options) {
    super(options);
    // ...
  }
}
```

Or, using the simplified constructor approach:

```js
const { Duplex } = require('node:stream');

const myDuplex = new Duplex({
  read(size) {
    // ...
  },
  write(chunk, encoding, callback) {
    // ...
  },
});
```

When using pipeline:

```js
const { Transform, pipeline } = require('node:stream');
const fs = require('node:fs');

pipeline(
  fs.createReadStream('object.json')
    .setEncoding('utf8'),
  new Transform({
    decodeStrings: false, // Accept string input rather than Buffers
    construct(callback) {
      this.data = '';
      callback();
    },
    transform(chunk, encoding, callback) {
      this.data += chunk;
      callback();
    },
    flush(callback) {
      try {
        // Make sure is valid json.
        JSON.parse(this.data);
        this.push(this.data);
        callback();
      } catch (err) {
        callback(err);
      }
    },
  }),
  fs.createWriteStream('valid-object.json'),
  (err) => {
    if (err) {
      console.error('failed', err);
    } else {
      console.log('completed');
    }
  },
);
```

#### An example duplex stream

The following illustrates a simple example of a `Duplex` stream that wraps a
hypothetical lower-level source object to which data can be written, and
from which data can be read, albeit using an API that is not compatible with
Node.js streams.
The following illustrates a simple example of a `Duplex` stream that buffers
incoming written data via the `Writable` interface that is read back out
via the `Readable` interface.

```js
const { Duplex } = require('node:stream');
const kSource = Symbol('source');

class MyDuplex extends Duplex {
  constructor(source, options) {
    super(options);
    this[kSource] = source;
  }

  _write(chunk, encoding, callback) {
    // The underlying source only deals with strings.
    if (Buffer.isBuffer(chunk))
      chunk = chunk.toString();
    this[kSource].writeSomeData(chunk);
    callback();
  }

  _read(size) {
    this[kSource].fetchSomeData(size, (data, encoding) => {
      this.push(Buffer.from(data, encoding));
    });
  }
}
```

The most important aspect of a `Duplex` stream is that the `Readable` and
`Writable` sides operate independently of one another despite co-existing within
a single object instance.

#### Object mode duplex streams

For `Duplex` streams, `objectMode` can be set exclusively for either the
`Readable` or `Writable` side using the `readableObjectMode` and
`writableObjectMode` options respectively.

In the following example, for instance, a new `Transform` stream (which is a
type of `Duplex` stream) is created that has an object mode `Writable` side
that accepts JavaScript numbers that are converted to hexadecimal strings on
the `Readable` side.

```js
const { Transform } = require('node:stream');

// All Transform streams are also Duplex Streams.
const myTransform = new Transform({
  writableObjectMode: true,

  transform(chunk, encoding, callback) {
    // Coerce the chunk to a number if necessary.
    chunk |= 0;

    // Transform the chunk into something else.
    const data = chunk.toString(16);

    // Push the data onto the readable queue.
    callback(null, '0'.repeat(data.length % 2) + data);
  },
});

myTransform.setEncoding('ascii');
myTransform.on('data', (chunk) => console.log(chunk));

myTransform.write(1);
// Prints: 01
myTransform.write(10);
// Prints: 0a
myTransform.write(100);
// Prints: 64
```
