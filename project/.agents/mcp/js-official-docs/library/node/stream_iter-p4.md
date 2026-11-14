---
title: "Iterable Streams (part 4 of 7)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/stream_iter.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Iterable Streams (part 4 of 7)

## Consumers

### `array(source[, options])`

* `source` {AsyncIterable|Iterable} whose chunks must be {Uint8Array\[]}
* `options` {Object}
  * `signal` {AbortSignal}
  * `limit` {number} Maximum number of bytes to consume. If the total bytes
    collected exceeds limit, an `ERR_OUT_OF_RANGE` error is thrown
* Returns: {Promise} Fulfills with an array of `Uint8Array` objects.

Collect all chunks as an array of `Uint8Array` values (without concatenating).

### `arrayBuffer(source[, options])`

* `source` {AsyncIterable|Iterable} whose chunks must be {Uint8Array\[]}
* `options` {Object}
  * `signal` {AbortSignal}
  * `limit` {number} Maximum number of bytes to consume. If the total bytes
    collected exceeds limit, an `ERR_OUT_OF_RANGE` error is thrown
* Returns: {Promise} Fulfills with an `ArrayBuffer` object.

Collect all bytes into an `ArrayBuffer`.

### `arrayBufferSync(source[, options])`

* `source` {Iterable} whose chunks must be {Uint8Array\[]}
* `options` {Object}
  * `limit` {number} Maximum number of bytes to consume. If the total bytes
    collected exceeds limit, an `ERR_OUT_OF_RANGE` error is thrown
* Returns: {ArrayBuffer}

Synchronous version of `arrayBuffer()`.

### `arraySync(source[, options])`

* `source` {Iterable} whose chunks must be {Uint8Array\[]}
* `options` {Object}
  * `limit` {number} Maximum number of bytes to consume. If the total bytes
    collected exceeds limit, an `ERR_OUT_OF_RANGE` error is thrown
* Returns: {Uint8Array\[]}

Synchronous version of `array()`.

### `bytes(source[, options])`

* `source` {AsyncIterable|Iterable} whose chunks must be {Uint8Array\[]}
* `options` {Object}
  * `signal` {AbortSignal}
  * `limit` {number} Maximum number of bytes to consume. If the total bytes
    collected exceeds limit, an `ERR_OUT_OF_RANGE` error is thrown
* Returns: {Promise} Fulfills with an `Uint8Array` object.

Collect all bytes from a stream into a single `Uint8Array`.

```mjs
import { from, bytes } from 'node:stream/iter';

const data = await bytes(from('hello'));
console.log(data); // Uint8Array(5) [ 104, 101, 108, 108, 111 ]
```

```cjs
const { from, bytes } = require('node:stream/iter');

async function run() {
  const data = await bytes(from('hello'));
  console.log(data); // Uint8Array(5) [ 104, 101, 108, 108, 111 ]
}

run().catch(console.error);
```

### `bytesSync(source[, options])`

* `source` {Iterable} whose chunks must be {Uint8Array\[]}
* `options` {Object}
  * `limit` {number} Maximum number of bytes to consume. If the total bytes
    collected exceeds limit, an `ERR_OUT_OF_RANGE` error is thrown
* Returns: {Uint8Array}

Synchronous version of `bytes()`.

### `dump(source[, options])`

* `source` {AsyncIterable|Iterable} whose chunks must be {Uint8Array\[]}
* `options` {Object}
  * `signal` {AbortSignal}
  * `limit` {number} Maximum number of bytes to consume. If the total bytes
    read exceeds limit, an `ERR_OUT_OF_RANGE` error is thrown
* Returns: {Promise} Fulfills with `undefined`.

Read a source to completion, discarding every chunk. Unlike the other
consumers, `dump()` retains nothing. Memory tops-out at a single batch no
matter how much data the source produces.

Use this to consume a stream when the content doesn't matter. For example, A
QUIC stream only returns flow-control credit to the peer as its data is
consumed, so a receiver that does not want the payload must still read it to
completion.

If the source errors part-way through, the returned promise rejects with that
error.

There is no default `limit`. `dump()` reads until the source is exhausted
unless a limit is specified. When a limit is configured and the source exceeds
it, the promise rejects and the source is cancelled. A partial dump is never
reported as success.

```mjs
import { dump, from, pull, tap } from 'node:stream/iter';

// Count the bytes flowing through a stream without retaining any of them.
let bytesSeen = 0;
const counter = tap((chunks) => {
  for (const chunk of chunks) bytesSeen += chunk.byteLength;
});

await dump(pull(from('hello world'), counter));
console.log(bytesSeen); // 11
```

```cjs
const { dump, from, pull, tap } = require('node:stream/iter');

async function run() {
  // Count the bytes flowing through a stream without retaining any of them.
  let bytesSeen = 0;
  const counter = tap((chunks) => {
    for (const chunk of chunks) bytesSeen += chunk.byteLength;
  });

  await dump(pull(from('hello world'), counter));
  console.log(bytesSeen); // 11
}

run().catch(console.error);
```

### `dumpSync(source[, options])`

* `source` {Iterable} whose chunks must be {Uint8Array\[]}
* `options` {Object}
  * `limit` {number} Maximum number of bytes to consume. If the total bytes
    read exceeds limit, an `ERR_OUT_OF_RANGE` error is thrown
* Returns: {undefined}

Synchronous version of `dump()`. Throws `ERR_INVALID_ARG_TYPE` if `source`
is not synchronously iterable.

### `text(source[, options])`

* `source` {AsyncIterable|Iterable} whose chunks must be {Uint8Array\[]}
* `options` {Object}
  * `encoding` {string} Text encoding. **Default:** `'utf-8'`.
  * `signal` {AbortSignal}
  * `limit` {number} Maximum number of bytes to consume. If the total bytes
    collected exceeds limit, an `ERR_OUT_OF_RANGE` error is thrown
* Returns: {Promise} Fulfills with a `string`.

Collect all bytes and decode as text.

```mjs
import { from, text } from 'node:stream/iter';

console.log(await text(from('hello'))); // 'hello'
```

```cjs
const { from, text } = require('node:stream/iter');

async function run() {
  console.log(await text(from('hello'))); // 'hello'
}

run().catch(console.error);
```

### `textSync(source[, options])`

* `source` {Iterable} whose chunks must be {Uint8Array\[]}
* `options` {Object}
  * `encoding` {string} **Default:** `'utf-8'`.
  * `limit` {number} Maximum number of bytes to consume. If the total bytes
    collected exceeds limit, an `ERR_OUT_OF_RANGE` error is thrown
* Returns: {string}

Synchronous version of `text()`.

## Utilities

### `ondrain(drainable)`

* `drainable` {Object} An object implementing the drainable protocol.
* Returns: {Promise|null}

Wait for a drainable writer to regain physical buffer capacity. Returns `null`
if the object does not implement the drainable protocol, or a promise that
fulfills with `true` when buffered data falls below the byte budget.

For writers using `'drop-oldest'` or `'drop-newest'`, this waits for physical
capacity even though writes do not block. This allows producers to avoid data
loss by waiting before writing.

```mjs
import { push, ondrain, text } from 'node:stream/iter';

const { writer, readable } = push({ budget: 16384 });
const chunk = new Uint8Array(8192);  // 8 KB
writer.writeSync(chunk);
writer.writeSync(chunk);  // 16 KB total -- buffer full

// Start consuming so the buffer can actually drain
const consuming = text(readable);

// Buffer is full -- wait for drain
const canWrite = await ondrain(writer);
if (canWrite) {
  await writer.write('c');
}
await writer.end();
await consuming;
```

```cjs
const { push, ondrain, text } = require('node:stream/iter');

async function run() {
  const { writer, readable } = push({ budget: 16384 });
  const chunk = new Uint8Array(8192);  // 8 KB
  writer.writeSync(chunk);
  writer.writeSync(chunk);  // 16 KB total -- buffer full

  // Start consuming so the buffer can actually drain
  const consuming = text(readable);

  // Buffer is full -- wait for drain
  const canWrite = await ondrain(writer);
  if (canWrite) {
    await writer.write('c');
  }
  await writer.end();
  await consuming;
}

run().catch(console.error);
```

### `merge(...sources[, options])`

* `...sources` {AsyncIterable|Iterable} whose chunks must be {Uint8Array\[]}
* `options` {Object}
  * `signal` {AbortSignal}
* Returns: {AsyncIterable} whose chunks fulfill with {Uint8Array\[]}

Merge multiple async iterables by yielding batches in temporal order
(whichever source produces data first). All sources are consumed
concurrently, with at most one pending `next()` call per source.

If a source fails, the returned iterable rejects with its error. `merge()`
calls `return()` on the other sources but does not wait for it to settle: an
async generator source that is suspended in an `await` only runs its cleanup
once that `await` completes.

```mjs
import { from, merge, text } from 'node:stream/iter';

const merged = merge(from('hello '), from('world'));
console.log(await text(merged)); // Order depends on timing
```

```cjs
const { from, merge, text } = require('node:stream/iter');

async function run() {
  const merged = merge(from('hello '), from('world'));
  console.log(await text(merged)); // Order depends on timing
}

run().catch(console.error);
```

### `tap(callback)`

* `callback` {Function} `(chunks, options) => void` Called with each batch and
  with `null` when the source ends. `options.signal` is the pipeline's
  {AbortSignal}.
* Returns: {Function} A stateless transform.

Create a pass-through transform that observes batches without modifying them.
Useful for logging, metrics, or debugging.

```mjs
import { from, pull, text, tap } from 'node:stream/iter';

const result = pull(
  from('hello'),
  tap((chunks) => {
    if (chunks !== null) console.log('Batch size:', chunks.length);
  }),
);
console.log(await text(result));
```

```cjs
const { from, pull, text, tap } = require('node:stream/iter');

async function run() {
  const result = pull(
    from('hello'),
    tap((chunks) => {
      if (chunks !== null) console.log('Batch size:', chunks.length);
    }),
  );
  console.log(await text(result));
}

run().catch(console.error);
```

`tap()` intentionally does not prevent in-place modification of the
chunks by the tapping callback; but return values are ignored.

### `tapSync(callback)`

* `callback` {Function}
* Returns: {Function}

Synchronous version of `tap()`.
