---
title: "Iterable Streams (part 3 of 7)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/stream_iter.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Iterable Streams (part 3 of 7)

## The `stream/iter` module

Most functions are available both as named exports and as properties of the
`Stream` namespace object. The classic stream adapters (`fromReadable()`,
`fromWritable()`, `toReadable()`, `toReadableSync()`, and `toWritable()`) and
the static helper objects (`Broadcast`, `Share`, and `SyncShare`) are named
exports only.

```mjs
// Named exports
import { from, pull, bytes, Stream } from 'node:stream/iter';

// Namespace access
Stream.from('hello');
```

Options dictionaries defined by the Iterable Streams API use Web IDL
conversion semantics. `null` is treated as an empty dictionary, unknown
members are ignored, and known members are converted to their declared types
before the operation runs. Conversion failures use Node.js error codes such as
`ERR_INVALID_ARG_TYPE`, `ERR_INVALID_ARG_VALUE`, and `ERR_OUT_OF_RANGE`.

```cjs
// Named exports
const { from, pull, bytes, Stream } = require('node:stream/iter');

// Namespace access
Stream.from('hello');
```

Including the `node:` prefix on the module specifier is optional.

## Sources

### `from(input)`

* `input` {string|ArrayBuffer|ArrayBufferView|Iterable|AsyncIterable|Object}
  Must not be `null` or `undefined`.
* Returns: {AsyncIterable} whose chunks fulfill with {Uint8Array\[]}.

Create an async byte stream from the given input. Strings are UTF-8 encoded.
`ArrayBuffer` and `ArrayBufferView` values are wrapped as `Uint8Array`. Arrays
and iterables in `input` are recursively flattened and normalized. Flattened
values may be split across implementation-defined bounded batches.

Objects implementing `Symbol.for('Stream.toAsyncStreamable')` or
`Symbol.for('Stream.toStreamable')` are converted via those protocols. The
`toAsyncStreamable` protocol takes precedence over `toStreamable`, which takes
precedence over the iteration protocols (`Symbol.asyncIterator`,
`Symbol.iterator`).

```mjs
import { Buffer } from 'node:buffer';
import { from, text } from 'node:stream/iter';

console.log(await text(from('hello')));       // 'hello'
console.log(await text(from(Buffer.from('hello')))); // 'hello'
```

```cjs
const { Buffer } = require('node:buffer');
const { from, text } = require('node:stream/iter');

async function run() {
  console.log(await text(from('hello')));       // 'hello'
  console.log(await text(from(Buffer.from('hello')))); // 'hello'
}

run().catch(console.error);
```

### `fromSync(input)`

* `input` {string|ArrayBuffer|ArrayBufferView|Iterable|Object}
  Must not be `null` or `undefined`.
* Returns: {Iterable} whose chunks return {Uint8Array\[]}

Synchronous version of `from()`. Returns a sync iterable. Cannot accept
async iterables or promises. Objects implementing
`Symbol.for('Stream.toStreamable')` are converted via that protocol (takes
precedence over `Symbol.iterator`). The `toAsyncStreamable` protocol is
ignored entirely.

```mjs
import { fromSync, textSync } from 'node:stream/iter';

console.log(textSync(fromSync('hello'))); // 'hello'
```

```cjs
const { fromSync, textSync } = require('node:stream/iter');

console.log(textSync(fromSync('hello'))); // 'hello'
```

## Pipelines

### `pipeTo(source[, ...transforms], writer[, options])`

* `source` {AsyncIterable|Iterable} The data source.
* `...transforms` {Function|Object} Zero or more transforms to apply.
* `writer` {Object} Destination with `write(chunk)` method.
* `options` {Object}
  * `signal` {AbortSignal} Abort the pipeline. Aborting fails the destination
    writer unless `preventFail` is `true`.
  * `preventClose` {boolean} If `true`, do not call `writer.end()` when
    the source ends. **Default:** `false`.
  * `preventFail` {boolean} If `true`, do not call `writer.fail()` on
    error. **Default:** `false`.
* Returns: {Promise} Fulfills with the total number of bytes written.

Pipe a source through transforms into a writer. If the writer has a
`writev(chunks)` method, entire batches are passed in a single call (enabling
scatter/gather I/O).

If the writer implements the optional `*Sync` methods (`writeSync`, `writevSync`,
`endSync`), `pipeTo()` will attempt to use the synchronous methods
first as a fast path, and fall back to the async versions only when the sync
methods indicate they cannot complete (e.g., backpressure or waiting for the
next tick). `fail()` is always called synchronously.

```mjs
import { from, pipeTo } from 'node:stream/iter';
import { compressGzip } from 'node:zlib/iter';
import { open } from 'node:fs/promises';

const fh = await open('output.gz', 'w');
const totalBytes = await pipeTo(
  from('Hello, world!'),
  compressGzip(),
  fh.writer({ autoClose: true }),
);
```

```cjs
const { from, pipeTo } = require('node:stream/iter');
const { compressGzip } = require('node:zlib/iter');
const { open } = require('node:fs/promises');

async function run() {
  const fh = await open('output.gz', 'w');
  const totalBytes = await pipeTo(
    from('Hello, world!'),
    compressGzip(),
    fh.writer({ autoClose: true }),
  );
}

run().catch(console.error);
```

### `pipeToSync(source[, ...transforms], writer[, options])`

* `source` {Iterable} The sync data source.
* `...transforms` {Function|Object} Zero or more sync transforms.
* `writer` {Object} Destination with `write(chunk)` method.
* `options` {Object}
  * `failOnIncompleteClose` {boolean} If `true`, call `writer.fail()` when
    `writer.endSync()` cannot close the writer synchronously. Ignored when
    `preventFail` is `true`. This option is a Node.js extension.
    **Default:** `false`.
  * `preventClose` {boolean} **Default:** `false`.
  * `preventFail` {boolean} **Default:** `false`.
* Returns: {number} Total bytes written.

Synchronous version of `pipeTo()`. The `source`, all transforms, and the
`writer` must be synchronous. Cannot accept async iterables or promises.

The `writer` must have the `*Sync` methods (`writeSync`, `writevSync`,
`endSync`) and `fail()` for this to work.

`pipeToSync()` never falls back to the asynchronous writer methods. If
`writer.endSync()` returns `-1` because the writer cannot close synchronously
(for example, a `push()` writer whose consumer has not read all of the data
yet), `pipeToSync()` throws `ERR_INVALID_STATE`. All of the data was accepted
by then, so by default the writer is not failed: it can still be closed, for
example with `await writer.end()`. If the writer cannot be closed any other
way (for example, it has no `end()` method), or the caller will not close it,
set `failOnIncompleteClose` to fail it with the thrown error instead.

### `pull(source, ...transforms)`

* `source` {AsyncIterable|Iterable} The data source.
* `...transforms` {Function|Object} Zero or more transforms to apply.
* `options` {Object}
  * `signal` {AbortSignal} Abort the pipeline.
* Returns: {AsyncIterable} whose chunks fulfill with {Uint8Array\[]}

Create a lazy async pipeline. Source conversion and streamable protocol
dispatch occur when `pull()` is called, but data is not read from `source`
until the returned iterable is consumed. Transforms are applied in order.

When `signal` aborts, the pending read (or the next one) rejects with
`signal.reason`, and so does every later read. If `signal` is already aborted,
`pull()` still returns an iterable; reading from it rejects with
`signal.reason` without reading from `source`.

```mjs
import { from, pull, text } from 'node:stream/iter';

const asciiUpper = (chunks) => {
  if (chunks === null) return null;
  return chunks.map((c) => {
    for (let i = 0; i < c.length; i++) {
      c[i] -= (c[i] >= 97 && c[i] <= 122) * 32;
    }
    return c;
  });
};

const result = pull(from('hello'), asciiUpper);
console.log(await text(result)); // 'HELLO'
```

```cjs
const { from, pull, text } = require('node:stream/iter');

const asciiUpper = (chunks) => {
  if (chunks === null) return null;
  return chunks.map((c) => {
    for (let i = 0; i < c.length; i++) {
      c[i] -= (c[i] >= 97 && c[i] <= 122) * 32;
    }
    return c;
  });
};

async function run() {
  const result = pull(from('hello'), asciiUpper);
  console.log(await text(result)); // 'HELLO'
}

run().catch(console.error);
```

Using an `AbortSignal`:

```mjs
import { pull } from 'node:stream/iter';

const ac = new AbortController();
const result = pull(source, transform, { signal: ac.signal });
ac.abort(); // Pipeline throws AbortError on next iteration
```

```cjs
const { pull } = require('node:stream/iter');

const ac = new AbortController();
const result = pull(source, transform, { signal: ac.signal });
ac.abort(); // Pipeline throws AbortError on next iteration
```

### `pullSync(source[, ...transforms])`

* `source` {Iterable} The sync data source.
* `...transforms` {Function|Object} Zero or more sync transforms.
* Returns: {Iterable} whose chunks return {Uint8Array\[]}

Synchronous version of `pull()`. Source conversion and streamable protocol
dispatch occur when `pullSync()` is called. All transforms must be synchronous.

## Push streams

### `push(...transforms)`

* `...transforms` {Function|Object} Optional transforms applied to the
  readable side.
* `options` {Object}
  * `budget` {number} Maximum number of buffered bytes before
    backpressure is applied. Must be a positive integer.
    **Default:** `16384`.
  * `backpressure` {string} Backpressure policy: `'strict'`, `'unbounded'`,
    `'drop-oldest'`, or `'drop-newest'`. **Default:** `'strict'`.
  * `signal` {AbortSignal} Abort the stream. The signal remains active while
    buffered data drains after `writer.end()`; aborting during that time fails
    the writer and rejects the pending `end()` promise.
* Returns: {Object}
  * `writer` {Writable} The writer side.
  * `readable` {AsyncIterable} whose chunks fulfill with {Uint8Array\[]}

Create a push stream with backpressure. The writer pushes data in; the
readable side is consumed as an async iterable.

```mjs
import { push, text } from 'node:stream/iter';

const { writer, readable } = push();

// Producer and consumer must run concurrently. With strict backpressure
// (the default), awaited writes block until the consumer reads.
const producing = (async () => {
  await writer.write('hello');
  await writer.write(' world');
  await writer.end();
})();

console.log(await text(readable)); // 'hello world'
await producing;
```

```cjs
const { push, text } = require('node:stream/iter');

async function run() {
  const { writer, readable } = push();

  // Producer and consumer must run concurrently. With strict backpressure
  // (the default), awaited writes block until the consumer reads.
  const producing = (async () => {
    await writer.write('hello');
    await writer.write(' world');
    await writer.end();
  })();

  console.log(await text(readable)); // 'hello world'
  await producing;
}

run().catch(console.error);
```

The writer returned by `push()` conforms to the \[Writer interface]\[].

Zero-length chunks are accepted without being buffered: they are not delivered
to the consumer, and `writeSync()` and `write()` report success for them even
when backpressure is active.

## Duplex channels

### `duplex([options])`

* `options` {Object}
  * `budget` {number} Buffer size in bytes for both directions.
    Must be a positive integer. **Default:** `16384`.
  * `backpressure` {string} Policy for both directions.
    **Default:** `'strict'`.
  * `signal` {AbortSignal} Cancellation signal for both channels.
  * `a` {Object} Options specific to the A-to-B direction. Overrides
    shared options.
    * `budget` {number}
    * `backpressure` {string}
  * `b` {Object} Options specific to the B-to-A direction. Overrides
    shared options.
    * `budget` {number}
    * `backpressure` {string}
* Returns: {Array} A pair `[channelA, channelB]` of duplex channels.

Create a pair of connected duplex channels for bidirectional communication,
similar to `socketpair()`. Data written to one channel's writer appears in
the other channel's readable.

Each channel has:

* `writer` — a \[Writer interface]\[] object for sending data to the peer.
* `readable` — an {AsyncIterable} for reading data from the peer.
* `close()` — close this end of the channel (idempotent).
* `Symbol.asyncDispose` — async dispose support for `await using`.

```mjs
import { duplex, text } from 'node:stream/iter';

const [client, server] = duplex();

// Server echoes back
const serving = (async () => {
  for await (const chunks of server.readable) {
    await server.writer.writev(chunks);
  }
  await server.writer.end();
})();

await client.writer.write('hello');
await client.writer.end();

console.log(await text(client.readable)); // 'hello'
await serving;
```

```cjs
const { duplex, text } = require('node:stream/iter');

async function run() {
  const [client, server] = duplex();

  // Server echoes back
  const serving = (async () => {
    for await (const chunks of server.readable) {
      await server.writer.writev(chunks);
    }
    await server.writer.end();
  })();

  await client.writer.write('hello');
  await client.writer.end();

  console.log(await text(client.readable)); // 'hello'
  await serving;
}

run().catch(console.error);
```
