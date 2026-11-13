---
title: "Stream (part 9 of 11)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/stream.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Stream (part 9 of 11)

## API for stream implementers

The `node:stream` module API has been designed to make it possible to easily
implement streams using JavaScript's prototypal inheritance model.

First, a stream developer would declare a new JavaScript class that extends one
of the four basic <example-value> classes (`stream.Writable`, `stream.Readable`,
`stream.Duplex`, or `stream.Transform`), making sure they call the appropriate
parent class constructor:

```js
const { Writable } = require('node:stream');

class MyWritable extends Writable {
  constructor({ highWaterMark, ...options }) {
    super({ highWaterMark });
    // ...
  }
}
```

When extending streams, keep in mind what options the user
can and should provide before forwarding these to the base constructor. For
example, if the implementation makes assumptions in regard to the
`autoDestroy` and `emitClose` options, do not allow the
user to override these. Be explicit about what
options are forwarded instead of implicitly forwarding all options.

The new stream class must then implement one or more specific methods, depending
on the type of stream being created, as detailed in the chart below:

| Use-case                                      | Class           | Method(s) to implement                                                                                             |
| --------------------------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------ |
| Reading only                                  | `Readable`  | `_read()`                                                                                          |
| Writing only                                  | `Writable`  | `_write()`, `_writev()`, `_final()`                            |
| Reading and writing                           | `Duplex`    | `_read()`, `_write()`, `_writev()`, `_final()` |
| Operate on written data, then read the result | `Transform` | `_transform()`, `_flush()`, `_final()`                      |

The implementation code for a stream should _never_ call the "public" methods
of a stream that are intended for use by consumers (as described in the
API for stream consumers section). Doing so may lead to adverse side effects
in application code consuming the stream.

Avoid overriding public methods such as `write()`, `end()`, `cork()`,
`uncork()`, `read()` and `destroy()`, or emitting internal events such
as `'error'`, `'data'`, `'end'`, `'finish'` and `'close'` through `.emit()`.
Doing so can break current and future stream invariants leading to behavior
and/or compatibility issues with other streams, stream utilities, and user
expectations.

### Simplified construction

For many simple cases, it is possible to create a stream without relying on
inheritance. This can be accomplished by directly creating instances of the
`stream.Writable`, `stream.Readable`, `stream.Duplex`, or `stream.Transform`
objects and passing appropriate methods as constructor options.

```js
const { Writable } = require('node:stream');

const myWritable = new Writable({
  construct(callback) {
    // Initialize state and load resources...
  },
  write(chunk, encoding, callback) {
    // ...
  },
  destroy() {
    // Free resources...
  },
});
```

### Implementing a writable stream

The `stream.Writable` class is extended to implement a `Writable` stream.

Custom `Writable` streams _must_ call the `new stream.Writable([options])`
constructor and implement the `writable._write()` and/or `writable._writev()`
method.

#### `new stream.Writable([options])`

* `options` {Object}
  * `highWaterMark` {number} Buffer level when
    `stream.write()` starts returning `false`. **Default:**
    See `stream.getDefaultHighWaterMark()`.
  * `decodeStrings` {boolean} Whether to encode `string`s passed to
    `stream.write()` to `Buffer`s (with the encoding
    specified in the `stream.write()` call) before passing
    them to `stream._write()`. Other types of data are not
    converted (i.e. `Buffer`s are not decoded into `string`s). Setting to
    false will prevent `string`s from being converted. **Default:** `true`.
  * `defaultEncoding` {string} The default encoding that is used when no
    encoding is specified as an argument to `stream.write()`.
    **Default:** `'utf8'`.
  * `objectMode` {boolean} Whether or not the
    `stream.write(anyObj)` is a valid operation. When set,
    it becomes possible to write JavaScript values other than string, {Buffer},
    {TypedArray} or {DataView} if supported by the stream implementation.
    **Default:** `false`.
  * `emitClose` {boolean} Whether or not the stream should emit `'close'`
    after it has been destroyed. **Default:** `true`.
  * `write` {Function} Implementation for the
    `stream._write()` method.
  * `writev` {Function} Implementation for the
    `stream._writev()` method.
  * `destroy` {Function} Implementation for the
    `stream._destroy()` method.
  * `final` {Function} Implementation for the
    `stream._final()` method.
  * `construct` {Function} Implementation for the
    `stream._construct()` method.
  * `autoDestroy` {boolean} Whether this stream should automatically call
    `.destroy()` on itself after ending. **Default:** `true`.
  * `signal` {AbortSignal} A signal representing possible cancellation.

```cjs
const { Writable } = require('node:stream');

class MyWritable extends Writable {
  constructor(options) {
    // Calls the stream.Writable() constructor.
    super(options);
    // ...
  }
}
```

```mjs
import { Writable } from 'node:stream';

class MyWritable extends Writable {
  constructor(options) {
    // Calls the stream.Writable() constructor.
    super(options);
    // ...
  }
}
```

Or, using the simplified constructor approach:

```js
const { Writable } = require('node:stream');

const myWritable = new Writable({
  write(chunk, encoding, callback) {
    // ...
  },
  writev(chunks, callback) {
    // ...
  },
});
```

Calling `abort` on the `AbortController` corresponding to the passed
`AbortSignal` will behave the same way as calling `.destroy(new AbortError())`
on the writable stream.

```js
const { Writable } = require('node:stream');

const controller = new AbortController();
const myWritable = new Writable({
  write(chunk, encoding, callback) {
    // ...
  },
  writev(chunks, callback) {
    // ...
  },
  signal: controller.signal,
});
// Later, abort the operation closing the stream
controller.abort();
```

#### `writable._construct(callback)`

* `callback` {Function} Call this function (optionally with an error
  argument) when the stream has finished initializing.

The `_construct()` method MUST NOT be called directly. It may be implemented
by child classes, and if so, will be called by the internal `Writable`
class methods only.

This optional function will be called in a tick after the stream constructor
has returned, delaying any `_write()`, `_final()` and `_destroy()` calls until
`callback` is called. This is useful to initialize state or asynchronously
initialize resources before the stream can be used.

```js
const { Writable } = require('node:stream');
const fs = require('node:fs');

class WriteStream extends Writable {
  constructor(filename) {
    super();
    this.filename = filename;
    this.fd = null;
  }
  _construct(callback) {
    fs.open(this.filename, 'w', (err, fd) => {
      if (err) {
        callback(err);
      } else {
        this.fd = fd;
        callback();
      }
    });
  }
  _write(chunk, encoding, callback) {
    fs.write(this.fd, chunk, callback);
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

#### `writable._write(chunk, encoding, callback)`

* `chunk` {Buffer|string|any} The `Buffer` to be written, converted from the
  `string` passed to `stream.write()`. If the stream's
  `decodeStrings` option is `false` or the stream is operating in object mode,
  the chunk will not be converted & will be whatever was passed to
  `stream.write()`.
* `encoding` {string} If the chunk is a string, then `encoding` is the
  character encoding of that string. If chunk is a `Buffer`, or if the
  stream is operating in object mode, `encoding` may be ignored.
* `callback` {Function} Call this function (optionally with an error
  argument) when processing is complete for the supplied chunk.

All `Writable` stream implementations must provide a
`writable._write()` and/or
`writable._writev()` method to send data to the underlying
resource.

`Transform` streams provide their own implementation of the
`writable._write()`.

This function MUST NOT be called by application code directly. It should be
implemented by child classes, and called by the internal `Writable` class
methods only.

The `callback` function must be called synchronously inside of
`writable._write()` or asynchronously (i.e. different tick) to signal either
that the write completed successfully or failed with an error.
The first argument passed to the `callback` must be the `Error` object if the
call failed or `null` if the write succeeded.

All calls to `writable.write()` that occur between the time `writable._write()`
is called and the `callback` is called will cause the written data to be
buffered. When the `callback` is invoked, the stream might emit a `'drain'`
event. If a stream implementation is capable of processing multiple chunks of
data at once, the `writable._writev()` method should be implemented.

If the `decodeStrings` property is explicitly set to `false` in the constructor
options, then `chunk` will remain the same object that is passed to `.write()`,
and may be a string rather than a `Buffer`. This is to support implementations
that have an optimized handling for certain string data encodings. In that case,
the `encoding` argument will indicate the character encoding of the string.
Otherwise, the `encoding` argument can be safely ignored.

The `writable._write()` method is prefixed with an underscore because it is
internal to the class that defines it, and should never be called directly by
user programs.

#### `writable._writev(chunks, callback)`

* `chunks` {Object\[]} The data to be written. The value is an array of {Object}
  that each represent a discrete chunk of data to write. The properties of
  these objects are:
  * `chunk` {Buffer|string} A buffer instance or string containing the data to
    be written. The `chunk` will be a string if the `Writable` was created with
    the `decodeStrings` option set to `false` and a string was passed to `write()`.
  * `encoding` {string} The character encoding of the `chunk`. If `chunk` is
    a `Buffer`, the `encoding` will be `'buffer'`.
* `callback` {Function} A callback function (optionally with an error
  argument) to be invoked when processing is complete for the supplied chunks.

This function MUST NOT be called by application code directly. It should be
implemented by child classes, and called by the internal `Writable` class
methods only.

The `writable._writev()` method may be implemented in addition or alternatively
to `writable._write()` in stream implementations that are capable of processing
multiple chunks of data at once. If implemented and if there is buffered data
from previous writes, `_writev()` will be called instead of `_write()`.

The `writable._writev()` method is prefixed with an underscore because it is
internal to the class that defines it, and should never be called directly by
user programs.

#### `writable._destroy(err, callback)`

* `err` {Error} A possible error.
* `callback` {Function} A callback function that takes an optional error
  argument.

The `_destroy()` method is called by `writable.destroy()`.
It can be overridden by child classes but it **must not** be called directly.

#### `writable._final(callback)`

* `callback` {Function} Call this function (optionally with an error
  argument) when finished writing any remaining data.

The `_final()` method **must not** be called directly. It may be implemented
by child classes, and if so, will be called by the internal `Writable`
class methods only.

This optional function will be called before the stream closes, delaying the
`'finish'` event until `callback` is called. This is useful to close resources
or write buffered data before a stream ends.

#### Errors while writing

Errors occurring during the processing of the `writable._write()`,
`writable._writev()` and `writable._final()` methods must be propagated
by invoking the callback and passing the error as the first argument.
Throwing an `Error` from within these methods or manually emitting an `'error'`
event results in undefined behavior.

If a `Readable` stream pipes into a `Writable` stream when `Writable` emits an
error, the `Readable` stream will be unpiped.

```js
const { Writable } = require('node:stream');

const myWritable = new Writable({
  write(chunk, encoding, callback) {
    if (chunk.toString().indexOf('a') >= 0) {
      callback(new Error('chunk is invalid'));
    } else {
      callback();
    }
  },
});
```

#### An example writable stream

The following illustrates a rather simplistic (and somewhat pointless) custom
`Writable` stream implementation. While this specific `Writable` stream instance
is not of any real particular usefulness, the example illustrates each of the
required elements of a custom `Writable` stream instance:

```js
const { Writable } = require('node:stream');

class MyWritable extends Writable {
  _write(chunk, encoding, callback) {
    if (chunk.toString().indexOf('a') >= 0) {
      callback(new Error('chunk is invalid'));
    } else {
      callback();
    }
  }
}
```

#### Decoding buffers in a writable stream

Decoding buffers is a common task, for instance, when using transformers whose
input is a string. This is not a trivial process when using multi-byte
characters encoding, such as UTF-8. The following example shows how to decode
multi-byte strings using `StringDecoder` and `Writable`.

```js
const { Writable } = require('node:stream');
const { StringDecoder } = require('node:string_decoder');

class StringWritable extends Writable {
  constructor(options) {
    super(options);
    this._decoder = new StringDecoder(options?.defaultEncoding);
    this.data = '';
  }
  _write(chunk, encoding, callback) {
    if (encoding === 'buffer') {
      chunk = this._decoder.write(chunk);
    }
    this.data += chunk;
    callback();
  }
  _final(callback) {
    this.data += this._decoder.end();
    callback();
  }
}

const euro = [[0xE2, 0x82], [0xAC]].map(Buffer.from);
const w = new StringWritable();

w.write('currency: ');
w.write(euro[0]);
w.end(euro[1]);

console.log(w.data); // currency: €
```
