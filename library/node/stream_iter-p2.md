---
title: "Iterable Streams (part 2 of 7)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/stream_iter.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Iterable Streams (part 2 of 7)

## Concepts

### Byte streams

All data in this API is represented as {Uint8Array} bytes. Strings
are automatically UTF-8 encoded when passed to `from()`, `push()`, or
`pipeTo()`. This removes ambiguity around encodings and enables zero-copy
transfers between streams and native code.

### Batching

Each iteration yields a **batch** -- an {Array} of {Uint8Array} chunks
({Uint8Array\[]}). Batching amortizes the cost of `await` and {Promise} creation
across multiple chunks. A consumer that processes one chunk at a time can
simply iterate the inner array:

```mjs
for await (const batch of source) {
  for (const chunk of batch) {
    handle(chunk);
  }
}
```

```cjs
async function run() {
  for await (const batch of source) {
    for (const chunk of batch) {
      handle(chunk);
    }
  }
}
```

### Transforms

Transforms come in two forms:

* **Stateless** -- a function `(chunks, options) => result` called once per
  batch. Receives `Uint8Array[]` (or `null` as the flush signal) and an
  `options` object. Returns {Uint8Array\[]|null|Iterable}.

* **Stateful** -- an object `{ transform(source, options) }` where `transform`
  is a generator (sync or async) that receives the entire upstream iterable
  and an `options` object, and yields output. This form is used for
  compression, encryption, and any transform that needs to buffer across
  batches.

Both forms receive an `options` parameter with the following property:

* `options.signal` {AbortSignal} An AbortSignal that fires when the pipeline
  is cancelled, encounters an error, or the consumer stops reading. Transforms
  can check `signal.aborted` or listen for the `'abort'` event to perform
  early cleanup.

The flush signal (`null`) is sent after the source ends, giving transforms
a chance to emit trailing data (e.g., compression footers).

```js
// Stateless: uppercase transform
const upper = (chunks) => {
  if (chunks === null) return null; // flush
  return chunks.map((c) => new TextEncoder().encode(
    new TextDecoder().decode(c).toUpperCase(),
  ));
};

// Stateful: line splitter
const lines = {
  transform: async function*(source) {
    let partial = '';
    for await (const chunks of source) {
      if (chunks === null) {
        if (partial) yield [new TextEncoder().encode(partial)];
        continue;
      }
      for (const chunk of chunks) {
        const str = partial + new TextDecoder().decode(chunk);
        const parts = str.split('\n');
        partial = parts.pop();
        for (const line of parts) {
          yield [new TextEncoder().encode(`${line}\n`)];
        }
      }
    }
  },
};
```

### Pull vs. push

The API supports two models:

* **Pull** -- data flows on demand. `pull()` and `pullSync()` create lazy
  pipelines that only read from the source when the consumer iterates.

* **Push** -- data is written explicitly. `push()` creates a writer/readable
  pair with backpressure. The writer pushes data in; the readable is consumed
  as an async iterable.

### Backpressure

Pull streams have natural backpressure -- the consumer drives the pace, so
the source is never read faster than the consumer can process. Push streams
need explicit backpressure because the producer and consumer run
independently. The `budget` and `backpressure` options on `push()`,
`broadcast()`, and `share()` control how this works.

#### The two-buffer model

Push streams use a two-part buffering system. Think of it like a bucket
(buffer) being filled through a hose (pending writes), with a float valve
that closes when the bucket is full:

```text
                          budget (e.g., 16384)
                                 |
    Producer                     v
       |                    +---------+
       v                    |         |
  [ write() ] ----+    +--->| buffer  |---> Consumer pulls
  [ write() ]     |    |    | (bucket)|     for await (...)
  [ write() ]     v    |    +---------+
              +--------+         ^
              | pending|         |
              | writes |    float valve
              | (hose) |    (backpressure)
              +--------+
                   ^
                   |
          'strict' mode limits this too!
```

* **Buffer (the bucket)** -- data ready for the consumer, capped at
  `budget` bytes. When the consumer pulls, it drains all buffered data
  at once into a single batch.

* **Pending writes (the hose)** -- writes waiting for buffer space. After
  the consumer drains, pending writes are promoted into the now-empty
  buffer and their promises settle.

How each policy uses these buffers:

| Policy          | Buffer limit | Pending writes limit |
| --------------- | ------------ | -------------------- |
| `'strict'`      | `budget`     | 1                    |
| `'unbounded'`   | `budget`     | Unbounded            |
| `'drop-oldest'` | `budget`     | N/A (never waits)    |
| `'drop-newest'` | `budget`     | N/A (never waits)    |

#### Strict (default)

Strict mode catches "fire-and-forget" patterns where the producer calls
`write()` without awaiting, which would cause unbounded memory growth.
It limits the buffer to `budget` bytes and the pending writes queue
to a single entry.

If you properly await each write, you can only ever have one pending
write at a time (yours), so you never hit the pending writes limit.
Unawaited writes accumulate in the pending queue and throw once it
overflows:

```mjs
import { push, text } from 'node:stream/iter';

const { writer, readable } = push({ budget: 16384 });

// Consumer must run concurrently -- without it, the first write
// that fills the buffer blocks the producer forever.
const consuming = text(readable);

// GOOD: awaited writes. The producer waits for the consumer to
// make room when the buffer is full.
for (const item of dataset) {
  await writer.write(item);
}
await writer.end();
console.log(await consuming);
```

```cjs
const { push, text } = require('node:stream/iter');

async function run() {
  const { writer, readable } = push({ budget: 16384 });

  // Consumer must run concurrently -- without it, the first write
  // that fills the buffer blocks the producer forever.
  const consuming = text(readable);

  // GOOD: awaited writes. The producer waits for the consumer to
  // make room when the buffer is full.
  for (const item of dataset) {
    await writer.write(item);
  }
  await writer.end();
  console.log(await consuming);
}

run().catch(console.error);
```

Forgetting to `await` will eventually throw:

```js
// BAD: fire-and-forget. Strict mode throws once both buffers fill.
for (const item of dataset) {
  writer.write(item); // Not awaited -- queues without bound
}
// --> throws "Backpressure violation: too many pending writes"
```

#### Unbounded

Unbounded mode caps buffered bytes at `budget` but places no limit on the
pending writes queue. Awaited writes block until the consumer makes room,
just like strict mode. The difference is that unawaited writes silently
queue forever instead of throwing -- a potential memory leak if the
producer forgets to `await`.

This is the mode that existing Node.js classic streams and Web Streams
default to. Use it when you control the producer and know it awaits
properly, or when migrating code from those APIs.

```mjs
import { push, text } from 'node:stream/iter';

const { writer, readable } = push({
  budget: 16384,
  backpressure: 'unbounded',
});

const consuming = text(readable);

// Safe -- awaited writes block until the consumer reads.
for (const item of dataset) {
  await writer.write(item);
}
await writer.end();
console.log(await consuming);
```

```cjs
const { push, text } = require('node:stream/iter');

async function run() {
  const { writer, readable } = push({
    budget: 16384,
    backpressure: 'unbounded',
  });

  const consuming = text(readable);

  // Safe -- awaited writes block until the consumer reads.
  for (const item of dataset) {
    await writer.write(item);
  }
  await writer.end();
  console.log(await consuming);
}

run().catch(console.error);
```

#### Drop-oldest

Writes never wait. When the slots buffer is full, the oldest buffered
chunk is evicted to make room for the incoming write. The consumer
always sees the most recent data. Useful for live feeds, telemetry, or
any scenario where stale data is less valuable than current data.

```mjs
import { push } from 'node:stream/iter';

// Keep only the most recent ~16 KB of readings
const { writer, readable } = push({
  budget: 16384,
  backpressure: 'drop-oldest',
});
```

```cjs
const { push } = require('node:stream/iter');

// Keep only the most recent ~16 KB of readings
const { writer, readable } = push({
  budget: 16384,
  backpressure: 'drop-oldest',
});
```

#### Drop-newest

Writes never wait. When the slots buffer is full, the incoming write is
silently discarded. The consumer processes what is already buffered
without being overwhelmed by new data. Useful for rate-limiting or
shedding load under pressure.

```mjs
import { push } from 'node:stream/iter';

// Accept up to 16 KB of buffered data; discard anything beyond that
const { writer, readable } = push({
  budget: 16384,
  backpressure: 'drop-newest',
});
```

```cjs
const { push } = require('node:stream/iter');

// Accept up to 16 KB of buffered data; discard anything beyond that
const { writer, readable } = push({
  budget: 16384,
  backpressure: 'drop-newest',
});
```

### Writer interface

A writer is any object conforming to the Writer interface. Only `write()` is
required; all other methods are optional.

Writer arguments use Web IDL conversion semantics. A non-`Uint8Array` chunk is
converted to a `USVString` and then UTF-8 encoded. `writev()` and
`writevSync()` accept any iterable object whose values can be converted to
chunks. Writer option dictionaries treat `null` as an empty dictionary and
ignore unknown members.

Arguments are converted before the write itself starts. If the conversion runs
user code (for example a `toString()` method, or the iterator of a `writev()`
argument) that writes to the same writer, those writes are ordered before the
write whose argument is being converted, and they count against the same
backpressure limits.

After `end()` or `endSync()` has been called, and until all buffered data has
been consumed, the writer is _closing_. While closing, `canWrite` is `null`,
`write()` and `writev()` reject with a `TypeError`, `writeSync()` and
`writevSync()` return `false`, `endSync()` returns `-1`, and calling `end()`
again returns the same promise as the first call.

Each async method has a synchronous `*Sync` counterpart designed for a
try-fallback pattern: attempt the fast synchronous path first, and fall back
to the async version only when the synchronous call indicates it could not
complete:

```mjs
if (!writer.writeSync(chunk)) await writer.write(chunk);
if (!writer.writevSync(chunks)) await writer.writev(chunks);
if (writer.endSync() < 0) await writer.end();
writer.fail(err);  // Always synchronous, no fallback needed
```

#### `writer.canWrite`

* {boolean|null}

Returns `true` if the slots buffer has physical capacity (buffered data is
below the configured byte budget), `false` if the budget is exhausted, or
`null` if the writer is closed or the consumer has disconnected.

This reports physical capacity independently of the backpressure policy. With
`'drop-oldest'` or `'drop-newest'`, writes still complete when this is `false`
by evicting buffered data or discarding the incoming data, respectively.

This is a hint, not a guarantee: the state can change between the check and
the write. Use `ondrain()` to wait for capacity rather than polling.

#### `writer.end([options])`

* `options` {Object}
  * `signal` {AbortSignal} Cancel just this operation. The signal cancels only
    the pending `end()` call; it does not fail the writer itself.
* Returns: {Promise} Fulfills with the total number of bytes written.

Signals that no more data will be written. Writes already waiting for buffer
space remain ordered before the end of the stream, while later writes fail. If
data is outstanding, the returned promise fulfills after the consumer pulls
`done: true` beyond the final batch. If no data is buffered or pending, the
writer closes immediately.

#### `writer.endSync()`

* Returns: {number} Total bytes written, or `-1` if ending cannot complete
  synchronously.

Synchronous variant of `writer.end()`. A return value of `-1` only indicates
that the operation could not complete synchronously; no assumption can be made
about whether closing has started or why it could not complete. Use the
try-fallback pattern to await completion:

```cjs
const result = writer.endSync();
if (result < 0) {
  writer.end();
}
```

#### `writer.fail([reason])`

* `reason` {any}

Put the writer into a terminal error state. If the writer is already closed
or errored, this is a no-op. Unlike `write()` and `end()`, `fail()` is
unconditionally synchronous because failing a writer is a pure state
transition with no async work to perform. The reason is stored and propagated
without modification. If omitted, the reason is `undefined`.

#### `writerSymbol.asyncDispose`

If the writer is open, calls `writer.fail()`. If the writer is closing after
`end()` or `endSync()`, waits for buffered data to drain. If the writer is
already closed or errored, resolves immediately.

#### `writer.write(chunk[, options])`

* `chunk` {Uint8Array|string}
* `options` {Object}
  * `signal` {AbortSignal} Cancel just this write operation. The signal cancels
    only the pending `write()` call; it does not fail the writer itself.
* Returns: {Promise} Fulfills with `undefined` when buffer space is available.

Write a chunk.

#### `writer.writeSync(chunk)`

* `chunk` {Uint8Array|string}
* Returns: {boolean} `true` if the write was accepted, `false` if the
  buffer is full.

Synchronous write. Does not block; returns `false` if backpressure is active.

#### `writer.writev(chunks[, options])`

* `chunks` {Iterable} of {Uint8Array|string} values
* `options` {Object}
  * `signal` {AbortSignal} Cancel just this write operation. The signal cancels
    only the pending `writev()` call; it does not fail the writer itself.
* Returns: {Promise}

Write multiple chunks as a single batch.

#### `writer.writevSync(chunks)`

* `chunks` {Iterable} of {Uint8Array|string} values
* Returns: {boolean} `true` if the write was accepted, `false` if the
  buffer is full.

Synchronous batch write.
