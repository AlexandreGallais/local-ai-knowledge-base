---
title: "Stream (part 4 of 11)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/stream.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Stream (part 4 of 11)

### Readable streams

Readable streams are an abstraction for a _source_ from which data is
consumed.

Examples of `Readable` streams include:

* HTTP responses, on the client
* HTTP requests, on the server
* fs read streams
* zlib streams
* crypto streams
* TCP sockets
* child process stdout and stderr
* `process.stdin`

All `Readable` streams implement the interface defined by the
`stream.Readable` class.

#### Two reading modes

`Readable` streams effectively operate in one of two modes: flowing and
paused. These modes are separate from object mode.
A `Readable` stream can be in object mode or not, regardless of whether
it is in flowing mode or paused mode.

* In flowing mode, data is read from the underlying system automatically
  and provided to an application as quickly as possible using events via the
  `EventEmitter` interface.

* In paused mode, the `stream.read()` method must be called
  explicitly to read chunks of data from the stream.

All `Readable` streams begin in paused mode but can be switched to flowing
mode in one of the following ways:

* Adding a `'data'` event handler.
* Calling the `stream.resume()` method.
* Calling the `stream.pipe()` method to send the data to a `Writable`.

The `Readable` can switch back to paused mode using one of the following:

* If there are no pipe destinations, by calling the
  `stream.pause()` method.
* If there are pipe destinations, by removing all pipe destinations.
  Multiple pipe destinations may be removed by calling the
  `stream.unpipe()` method.

The important concept to remember is that a `Readable` will not generate data
until a mechanism for either consuming or ignoring that data is provided. If
the consuming mechanism is disabled or taken away, the `Readable` will _attempt_
to stop generating the data.

For backward compatibility reasons, removing `'data'` event handlers will
**not** automatically pause the stream. Also, if there are piped destinations,
then calling `stream.pause()` will not guarantee that the
stream will _remain_ paused once those destinations drain and ask for more data.

If a `Readable` is switched into flowing mode and there are no consumers
available to handle the data, that data will be lost. This can occur, for
instance, when the `readable.resume()` method is called without a listener
attached to the `'data'` event, or when a `'data'` event handler is removed
from the stream.

Adding a `'readable'` event handler automatically makes the stream
stop flowing, and the data has to be consumed via
`readable.read()`. If the `'readable'` event handler is
removed, then the stream will start flowing again if there is a
`'data'` event handler.

#### Three states

The "two modes" of operation for a `Readable` stream are a simplified
abstraction for the more complicated internal state management that is happening
within the `Readable` stream implementation.

Specifically, at any given point in time, every `Readable` is in one of three
possible states:

* `readable.readableFlowing === null`
* `readable.readableFlowing === false`
* `readable.readableFlowing === true`

When `readable.readableFlowing` is `null`, no mechanism for consuming the
stream's data is provided. Therefore, the stream will not generate data.
While in this state, attaching a listener for the `'data'` event, calling the
`readable.pipe()` method, or calling the `readable.resume()` method will switch
`readable.readableFlowing` to `true`, causing the `Readable` to begin actively
emitting events as data is generated.

Calling `readable.pause()`, `readable.unpipe()`, or receiving backpressure
will cause the `readable.readableFlowing` to be set as `false`,
temporarily halting the flowing of events but _not_ halting the generation of
data. While in this state, attaching a listener for the `'data'` event
will not switch `readable.readableFlowing` to `true`.

```js
const { PassThrough, Writable } = require('node:stream');
const pass = new PassThrough();
const writable = new Writable();

pass.pipe(writable);
pass.unpipe(writable);
// readableFlowing is now false.

pass.on('data', (chunk) => { console.log(chunk.toString()); });
// readableFlowing is still false.
pass.write('ok');  // Will not emit 'data'.
pass.resume();     // Must be called to make stream emit 'data'.
// readableFlowing is now true.
```

While `readable.readableFlowing` is `false`, data may be accumulating
within the stream's internal buffer.

#### Choose one API style

The `Readable` stream API evolved across multiple Node.js versions and provides
multiple methods of consuming stream data. In general, developers should choose
_one_ of the methods of consuming data and _should never_ use multiple methods
to consume data from a single stream. Specifically, using a combination
of `on('data')`, `on('readable')`, `pipe()`, or async iterators could
lead to unintuitive behavior.

#### Class: `stream.Readable`

##### Event: `'close'`

The `'close'` event is emitted when the stream and any of its underlying
resources (a file descriptor, for example) have been closed. The event indicates
that no more events will be emitted, and no further computation will occur.

A `Readable` stream will always emit the `'close'` event if it is
created with the `emitClose` option.

##### Event: `'data'`

* `chunk` {Buffer|string|any} The chunk of data. For streams that are not
  operating in object mode, the chunk will be either a string or `Buffer`.
  For streams that are in object mode, the chunk can be any JavaScript value
  other than `null`.

The `'data'` event is emitted whenever the stream is relinquishing ownership of
a chunk of data to a consumer. This may occur whenever the stream is switched
in flowing mode by calling `readable.pipe()`, `readable.resume()`, or by
attaching a listener callback to the `'data'` event. The `'data'` event will
also be emitted whenever the `readable.read()` method is called and a chunk of
data is available to be returned.

Attaching a `'data'` event listener to a stream that has not been explicitly
paused will switch the stream into flowing mode. Data will then be passed as
soon as it is available.

The listener callback will be passed the chunk of data as a string if a default
encoding has been specified for the stream using the
`readable.setEncoding()` method; otherwise the data will be passed as a
`Buffer`.

```js
const readable = getReadableStreamSomehow();
readable.on('data', (chunk) => {
  console.log(`Received ${chunk.length} bytes of data.`);
});
```

##### Event: `'end'`

The `'end'` event is emitted when there is no more data to be consumed from
the stream.

The `'end'` event **will not be emitted** unless the data is completely
consumed. This can be accomplished by switching the stream into flowing mode,
or by calling `stream.read()` repeatedly until all data has been
consumed.

```js
const readable = getReadableStreamSomehow();
readable.on('data', (chunk) => {
  console.log(`Received ${chunk.length} bytes of data.`);
});
readable.on('end', () => {
  console.log('There will be no more data.');
});
```

##### Event: `'error'`

* Type: {Error}

The `'error'` event may be emitted by a `Readable` implementation at any time.
Typically, this may occur if the underlying stream is unable to generate data
due to an underlying internal failure, or when a stream implementation attempts
to push an invalid chunk of data.

The listener callback will be passed a single `Error` object.

##### Event: `'pause'`

The `'pause'` event is emitted when `stream.pause()` is called
and `readableFlowing` is not `false`.

##### Event: `'readable'`

The `'readable'` event is emitted when there is data available to be read from
the stream, up to the configured high water mark (`state.highWaterMark`). Effectively,
it indicates that the stream has new information within the buffer. If data is available
within this buffer, `stream.read()` can be called to retrieve that data.
Additionally, the `'readable'` event may also be emitted when the end of the stream has been
reached.

```js
const readable = getReadableStreamSomehow();
readable.on('readable', function() {
  // There is some data to read now.
  let data;

  while ((data = this.read()) !== null) {
    console.log(data);
  }
});
```

If the end of the stream has been reached, calling
`stream.read()` will return `null` and trigger the `'end'`
event. This is also true if there never was any data to be read. For instance,
in the following example, `foo.txt` is an empty file:

```js
const fs = require('node:fs');
const rr = fs.createReadStream('foo.txt');
rr.on('readable', () => {
  console.log(`readable: ${rr.read()}`);
});
rr.on('end', () => {
  console.log('end');
});
```

The output of running this script is:

```console
$ node test.js
readable: null
end
```

In some cases, attaching a listener for the `'readable'` event will cause some
amount of data to be read into an internal buffer.

In general, the `readable.pipe()` and `'data'` event mechanisms are easier to
understand than the `'readable'` event. However, handling `'readable'` might
result in increased throughput.

If both `'readable'` and `'data'` are used at the same time, `'readable'`
takes precedence in controlling the flow, i.e. `'data'` will be emitted
only when `stream.read()` is called. The
`readableFlowing` property would become `false`.
If there are `'data'` listeners when `'readable'` is removed, the stream
will start flowing, i.e. `'data'` events will be emitted without calling
`.resume()`.

##### Event: `'resume'`

The `'resume'` event is emitted when `stream.resume()` is
called and `readableFlowing` is not `true`.

##### `readable.destroy([error])`

* `error` {Error} Error which will be passed as payload in `'error'` event
* Returns: {this}

Destroy the stream. Optionally emit an `'error'` event, and emit a `'close'`
event (unless `emitClose` is set to `false`). After this call, the readable
stream will release any internal resources and subsequent calls to `push()`
will be ignored.

Once `destroy()` has been called any further calls will be a no-op and no
further errors except from `_destroy()` may be emitted as `'error'`.

Implementors should not override this method, but instead implement
`readable._destroy()`.

##### `readable.closed`

* Type: {boolean}

Is `true` after `'close'` has been emitted.

##### `readable.destroyed`

* Type: {boolean}

Is `true` after `readable.destroy()` has been called.

##### `readable.isPaused()`

* Returns: {boolean}

The `readable.isPaused()` method returns the current operating state of the
`Readable`. This is used primarily by the mechanism that underlies the
`readable.pipe()` method. In most typical cases, there will be no reason to
use this method directly.

```js
const readable = new stream.Readable();

readable.isPaused(); // === false
readable.pause();
readable.isPaused(); // === true
readable.resume();
readable.isPaused(); // === false
```

##### `readable.pause()`

* Returns: {this}

The `readable.pause()` method will cause a stream in flowing mode to stop
emitting `'data'` events, switching out of flowing mode. Any data that
becomes available will remain in the internal buffer.

```js
const readable = getReadableStreamSomehow();
readable.on('data', (chunk) => {
  console.log(`Received ${chunk.length} bytes of data.`);
  readable.pause();
  console.log('There will be no additional data for 1 second.');
  setTimeout(() => {
    console.log('Now data will start flowing again.');
    readable.resume();
  }, 1000);
});
```

The `readable.pause()` method has no effect if there is a `'readable'`
event listener.

##### `readable.pipe(destination[, options])`

* `destination` {stream.Writable} The destination for writing data
* `options` {Object} Pipe options
  * `end` {boolean} End the writer when the reader ends. **Default:** `true`.
* Returns: {stream.Writable} The _destination_, allowing for a chain of pipes if
  it is a `Duplex` or a `Transform` stream

The `readable.pipe()` method attaches a `Writable` stream to the `readable`,
causing it to switch automatically into flowing mode and push all of its data
to the attached `Writable`. The flow of data will be automatically managed
so that the destination `Writable` stream is not overwhelmed by a faster
`Readable` stream.

The following example pipes all of the data from the `readable` into a file
named `file.txt`:

```js
const fs = require('node:fs');
const readable = getReadableStreamSomehow();
const writable = fs.createWriteStream('file.txt');
// All the data from readable goes into 'file.txt'.
readable.pipe(writable);
```

It is possible to attach multiple `Writable` streams to a single `Readable`
stream.

The `readable.pipe()` method returns a reference to the _destination_ stream
making it possible to set up chains of piped streams:

```js
const fs = require('node:fs');
const zlib = require('node:zlib');
const r = fs.createReadStream('file.txt');
const z = zlib.createGzip();
const w = fs.createWriteStream('file.txt.gz');
r.pipe(z).pipe(w);
```

By default, `stream.end()` is called on the destination `Writable`
stream when the source `Readable` stream emits `'end'`, so that the
destination is no longer writable. To disable this default behavior, the `end`
option can be passed as `false`, causing the destination stream to remain open:

```js
reader.pipe(writer, { end: false });
reader.on('end', () => {
  writer.end('Goodbye\n');
});
```

One important caveat is that if the `Readable` stream emits an error during
processing, the `Writable` destination _is not closed_ automatically. If an
error occurs, it will be necessary to _manually_ close each stream in order
to prevent memory leaks.

The `process.stderr` and `process.stdout` `Writable` streams are never
closed until the Node.js process exits, regardless of the specified options.

##### `readable.read([size])`

* `size` {number} Optional argument to specify how much data to read.
* Returns: {string|Buffer|null|any}

The `readable.read()` method reads data out of the internal buffer and
returns it. If no data is available to be read, `null` is returned. By default,
the data is returned as a `Buffer` object unless an encoding has been
specified using the `readable.setEncoding()` method or the stream is operating
in object mode.

The optional `size` argument specifies a specific number of bytes to read. If
`size` bytes are not available to be read, `null` will be returned _unless_
the stream has ended, in which case all of the data remaining in the internal
buffer will be returned.

If the `size` argument is not specified, all of the data contained in the
internal buffer will be returned.

The `size` argument must be less than or equal to 1 GiB.

The `readable.read()` method should only be called on `Readable` streams
operating in paused mode. In flowing mode, `readable.read()` is called
automatically until the internal buffer is fully drained.
