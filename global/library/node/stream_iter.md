---
title: "Iterable Streams (part 1 of 7)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/stream_iter.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Iterable Streams

> Stability: 1 - Experimental – Enable this API with the `--experimental-stream-iter` CLI flag.

The `node:stream/iter` module provides a streaming API built on iterables
rather than the event-driven `Readable`/`Writable`/`Transform` class hierarchy,
or the Web Streams `ReadableStream`/`WritableStream`/`TransformStream` interfaces.

Streams are represented as {AsyncIterable} (async) or {Iterable} (sync). There
are no base classes to extend -- any
object implementing the iterable protocol can participate. Transforms are plain
functions or objects with a `transform` method.

Data flows in **batches** ({Uint8Array\[]} per iteration) to amortize the cost
of async operations.

The module implements the WinterTC Iterable Streams API draft. The
classic stream interop functions (`fromReadable()`, `fromWritable()`,
`toReadable()`, `toReadableSync()` and `toWritable()`),
`Broadcast.from()`, `Share.from()`, `SyncShare.fromSync()` and the
protocol symbols exported by `Stream` are Node.js extensions that are not part
of the draft.

```mjs
import { from, pull, text } from 'node:stream/iter';
import { compressGzip, decompressGzip } from 'node:zlib/iter';

// Compress and decompress a string
const compressed = pull(from('Hello, world!'), compressGzip());
const result = await text(pull(compressed, decompressGzip()));
console.log(result); // 'Hello, world!'
```

```cjs
const { from, pull, text } = require('node:stream/iter');
const { compressGzip, decompressGzip } = require('node:zlib/iter');

async function run() {
  // Compress and decompress a string
  const compressed = pull(from('Hello, world!'), compressGzip());
  const result = await text(pull(compressed, decompressGzip()));
  console.log(result); // 'Hello, world!'
}

run().catch(console.error);
```

```mjs
import { open } from 'node:fs/promises';
import { text, pipeTo } from 'node:stream/iter';
import { compressGzip, decompressGzip } from 'node:zlib/iter';

// Read a file, compress, write to another file
const src = await open('input.txt', 'r');
const dst = await open('output.gz', 'w');
await pipeTo(src.pull(), compressGzip(), dst.writer({ autoClose: true }));
await src.close();

// Read it back
const gz = await open('output.gz', 'r');
console.log(await text(gz.pull(decompressGzip(), { autoClose: true })));
```

```cjs
const { open } = require('node:fs/promises');
const { text, pipeTo } = require('node:stream/iter');
const { compressGzip, decompressGzip } = require('node:zlib/iter');

async function run() {
  // Read a file, compress, write to another file
  const src = await open('input.txt', 'r');
  const dst = await open('output.gz', 'w');
  await pipeTo(src.pull(), compressGzip(), dst.writer({ autoClose: true }));
  await src.close();

  // Read it back
  const gz = await open('output.gz', 'r');
  console.log(await text(gz.pull(decompressGzip(), { autoClose: true })));
}

run().catch(console.error);
```
