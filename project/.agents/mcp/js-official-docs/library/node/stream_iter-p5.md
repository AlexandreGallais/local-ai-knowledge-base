---
title: "Iterable Streams (part 5 of 7)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/stream_iter.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Iterable Streams (part 5 of 7)

## Multi-consumer

### `broadcast([options])`

* `options` {Object}
  * `budget` {number} Buffer size in bytes. Must be a positive integer.
    **Default:** `65536`.
  * `backpressure` {string} `'strict'`, `'unbounded'`, `'drop-oldest'`, or
    `'drop-newest'`. **Default:** `'strict'`.
  * `signal` {AbortSignal}
* Returns: {Object}
  * `writer` {Writable}
  * `broadcast` {BroadcastChannel}

Create a push-model multi-consumer broadcast channel. A single writer pushes
data to multiple consumers. Each consumer has an independent cursor into a
shared buffer.

```mjs
import { broadcast, text } from 'node:stream/iter';

const { writer, broadcast: bc } = broadcast();

// Create consumers before writing
const c1 = bc.push();  // Consumer 1
const c2 = bc.push();  // Consumer 2

// Producer and consumers must run concurrently. Awaited writes
// block when the buffer fills until consumers read.
const producing = (async () => {
  await writer.write('hello');
  await writer.end();
})();

const [r1, r2] = await Promise.all([text(c1), text(c2)]);
console.log(r1); // 'hello'
console.log(r2); // 'hello'
await producing;
```

```cjs
const { broadcast, text } = require('node:stream/iter');

async function run() {
  const { writer, broadcast: bc } = broadcast();

  // Create consumers before writing
  const c1 = bc.push();  // Consumer 1
  const c2 = bc.push();  // Consumer 2

  // Producer and consumers must run concurrently. Awaited writes
  // block when the buffer fills until consumers read.
  const producing = (async () => {
    await writer.write('hello');
    await writer.end();
  })();

  const [r1, r2] = await Promise.all([text(c1), text(c2)]);
  console.log(r1); // 'hello'
  console.log(r2); // 'hello'
  await producing;
}

run().catch(console.error);
```

#### `broadcast.cancel([reason])`

* `reason` {any}

Cancel the broadcast. If `reason` is provided, all consumers reject with that
exact reason. If it is omitted, consumers complete normally.

Cancelling also closes the paired writer: afterwards its `canWrite` is `null`
and `write()` rejects with a `TypeError`. This lets a `Broadcast.from()`
pump stop pulling from its source.

#### `broadcast.consumerCount`

* {number}

The number of active consumers.

#### `broadcast.push(...transforms)`

* `...transforms` {Function|Object}
* `options` {Object}
  * `signal` {AbortSignal}
* Returns: {AsyncIterable} whose chunks fulfill with {Uint8Array\[]}

Create a new consumer. Optional transforms are applied to this consumer's view
of the data.

#### `broadcastSymbol.dispose`

Alias for `broadcast.cancel()`.

### `Broadcast.from(input[, options])`

* `input` {AsyncIterable|Iterable|BroadcastChannel}
* `options` {Object} Same as `broadcast()`.
* Returns: {BroadcastChannel|Object} A `broadcastProtocol` input returns its
  {BroadcastChannel} directly. Other inputs return `{ writer, broadcast }`.

Create a {BroadcastChannel} from an existing source. The source is consumed
automatically and pushed to all subscribers.

### `share(source[, options])`

* `source` {AsyncIterable} The source to share.
* `options` {Object}
  * `budget` {number} Buffer size in bytes. Must be a positive integer.
    **Default:** `65536`.
  * `backpressure` {string} `'strict'`, `'unbounded'`, `'drop-oldest'`, or
    `'drop-newest'`. **Default:** `'strict'`.
  * `signal` {AbortSignal}
* Returns: {Share}

Create a pull-model multi-consumer shared stream. Unlike `broadcast()`, the
source is only read when a consumer pulls. Multiple consumers share a single
buffer.

A consumer created with `share.pull()` starts reading at the oldest entry still
in the buffer. Entries are released once every consumer has read them. When
every consumer has detached, the buffered data is kept for consumers that
attach later, and the source is not closed. Call `share.cancel()` (or dispose
the share) to release the source once it is no longer needed.

With `'strict'` backpressure, a consumer that needs to pull from the source
while the buffer is at or above `budget` is rejected with `ERR_OUT_OF_RANGE`
and detached; further reads from that consumer complete with `{ done: true }`.
Detaching keeps a consumer that is not retried (for example, one read with
`for await...of`, which does not call `return()` when a read rejects) from
holding buffered data and blocking the other consumers.

With `'unbounded'`, such a consumer waits until the slowest consumer releases
budget. With `'drop-newest'`, the entry pulled from the source is discarded
and the consumer then waits in the same way, so in both cases a stalled
consumer also stalls the consumers that are ahead of it. Only `'drop-oldest'`
lets consumers that are ahead continue, by discarding the oldest buffered
entries that the slowest consumer has not read yet. A batch pulled from the
source that is larger than `budget` is split into smaller entries first, so
eviction keeps the newest chunks that fit within the budget.

```mjs
import { from, share, text } from 'node:stream/iter';

const shared = share(from('hello'));

const c1 = shared.pull();
const c2 = shared.pull();

// Consume concurrently to avoid deadlock with small buffers.
const [r1, r2] = await Promise.all([text(c1), text(c2)]);
console.log(r1); // 'hello'
console.log(r2); // 'hello'
```

```cjs
const { from, share, text } = require('node:stream/iter');

async function run() {
  const shared = share(from('hello'));

  const c1 = shared.pull();
  const c2 = shared.pull();

  // Consume concurrently to avoid deadlock with small buffers.
  const [r1, r2] = await Promise.all([text(c1), text(c2)]);
  console.log(r1); // 'hello'
  console.log(r2); // 'hello'
}

run().catch(console.error);
```

### Class: `Share`

#### Static method: `Share.from(input[, options])`

* `input` {AsyncIterable|Shareable}
* `options` {Object} Same as `share()`.
* Returns: {Share}

Create a {Share} from an existing source.

#### `share.cancel([reason])`

* `reason` {any}

Cancel the share. If `reason` is provided, all consumers reject with that exact
reason. If it is omitted, consumers complete normally.

#### `share.consumerCount`

* {number}

The number of active consumers.

#### `share.pull(...transforms)`

* `...transforms` {Function|Object}
* `options` {Object}
  * `signal` {AbortSignal}
* Returns: {AsyncIterable} whose chunks fulfill with {Uint8Array\[]}

Create a new consumer of the shared source.

#### `shareSymbol.dispose`

Alias for `share.cancel()`.

### Interface: `Shareable`

#### `sharable[Symbol.for('Stream.shareProtocol')]`

* {Function} that returns a {Share}.

### Interface: `SyncShareable`

#### `sharable[Symbol.for('Stream.shareSyncProtocol')]`

* {Function} that returns a {SyncShare}.

### `shareSync(source[, options])`

* `source` {Iterable} The sync source to share.
* `options` {Object}
  * `budget` {number} Must be a positive integer.
    **Default:** `65536`.
  * `backpressure` {string} `'strict'` or `'drop-oldest'`.
    **Default:** `'strict'`.
* Returns: {SyncShare}

Synchronous version of `share()`.

A synchronous consumer cannot wait for the slowest consumer to release budget,
and the slowest consumer cannot advance while another consumer's read is
running. `'unbounded'` and `'drop-newest'` are therefore not supported and
throw `ERR_INVALID_ARG_VALUE`.

### Class: `SyncShare`

#### Static method: `SyncShare.fromSync(input[, options])`

* `input` {Iterable|SyncShareable}
* `options` {Object}
* Returns: {SyncShare}

#### `share.cancel([reason])`

* `reason` {any}

Cancel the share. If `reason` is provided, all consumers throw that exact
reason. If it is omitted, consumers complete normally.

#### `share.consumerCount`

* {number}

The number of active consumers.

#### `share.pull([...transforms])`

* `...transforms` {Function|Object}
* Returns: {Iterable} whose chunks return {Uint8Array\[]}

Create a new consumer of the shared source.

#### `shareSymbol.dispose`

Alias for `share.cancel()`.

## Compression and decompression transforms

Compression and decompression transforms for use with `pull()`, `pullSync()`,
`pipeTo()`, and `pipeToSync()` are available via the `node:zlib/iter`
module. See the `node:zlib/iter` documentation for details.
