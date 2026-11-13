---
title: "Buffer (part 2 of 11)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/buffer.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Buffer (part 2 of 11)

## Class: `Blob`

A {Blob} encapsulates immutable, raw data that can be safely shared across
multiple worker threads.

### `new buffer.Blob([sources[, options]])`

* `sources` {string\[]|ArrayBuffer\[]|TypedArray\[]|DataView\[]|Blob\[]} An
  array of string, {ArrayBuffer}, {TypedArray}, {DataView}, or {Blob} objects,
  or any mix of such objects, that will be stored within the `Blob`.
* `options` {Object}
  * `endings` {string} One of either `'transparent'` or `'native'`. When set
    to `'native'`, line endings in string source parts will be converted to
    the platform native line-ending as specified by `require('node:os').EOL`.
  * `type` {string} The Blob content-type. The intent is for `type` to convey
    the MIME media type of the data, however no validation of the type format
    is performed.

Creates a new `Blob` object containing a concatenation of the given sources.

{ArrayBuffer}, {TypedArray}, {DataView}, and {Buffer} sources are copied into
the 'Blob' and can therefore be safely modified after the 'Blob' is created.

String sources are encoded as UTF-8 byte sequences and copied into the Blob.
Unmatched surrogate pairs within each string part will be replaced by Unicode
U+FFFD replacement characters.

### `blob.arrayBuffer()`

* Returns: {Promise}

Returns a promise that fulfills with an {ArrayBuffer} containing a copy of
the `Blob` data.

### `blob.bytes()`

* Returns: {Promise}

The `blob.bytes()` method returns the byte of the `Blob` object as a `Promise<Uint8Array>`.

```js
const blob = new Blob(['hello']);
blob.bytes().then((bytes) => {
  console.log(bytes); // Outputs: Uint8Array(5) [ 104, 101, 108, 108, 111 ]
});
```

### `blob.size`

The total size of the `Blob` in bytes.

### `blob.slice([start[, end[, type]]])`

* `start` {number} The starting index.
* `end` {number} The ending index.
* `type` {string} The content-type for the new `Blob`
* Returns: {Blob}

Creates and returns a new `Blob` containing a subset of this `Blob` objects
data. The original `Blob` is not altered.

### `blob.stream()`

* Returns: {ReadableStream}

Returns a new `ReadableStream` that allows the content of the `Blob` to be read.

### `blob.text()`

* Returns: {Promise}

Returns a promise that fulfills with the contents of the `Blob` decoded as a
UTF-8 string.

### `blob.textStream()`

* Returns: {ReadableStream}

Returns a new `ReadableStream` that allows the content of the `Blob` to be read
as a stream of UTF-8 decoded strings. It is equivalent to piping
`blob.stream()` through a `TextDecoderStream` set up with UTF-8.

### `blob.type`

* Type: {string}

The content-type of the `Blob`.

### `Blob` objects and `MessageChannel`

Once a {Blob} object is created, it can be sent via `MessagePort` to multiple
destinations without transferring or immediately copying the data. The data
contained by the `Blob` is copied only when the `arrayBuffer()` or `text()`
methods are called.

```mjs
import { Blob } from 'node:buffer';
import { setTimeout as delay } from 'node:timers/promises';

const blob = new Blob(['hello there']);

const mc1 = new MessageChannel();
const mc2 = new MessageChannel();

mc1.port1.onmessage = async ({ data }) => {
  console.log(await data.arrayBuffer());
  mc1.port1.close();
};

mc2.port1.onmessage = async ({ data }) => {
  await delay(1000);
  console.log(await data.arrayBuffer());
  mc2.port1.close();
};

mc1.port2.postMessage(blob);
mc2.port2.postMessage(blob);

// The Blob is still usable after posting.
blob.text().then(console.log);
```

```cjs
const { Blob } = require('node:buffer');
const { setTimeout: delay } = require('node:timers/promises');

const blob = new Blob(['hello there']);

const mc1 = new MessageChannel();
const mc2 = new MessageChannel();

mc1.port1.onmessage = async ({ data }) => {
  console.log(await data.arrayBuffer());
  mc1.port1.close();
};

mc2.port1.onmessage = async ({ data }) => {
  await delay(1000);
  console.log(await data.arrayBuffer());
  mc2.port1.close();
};

mc1.port2.postMessage(blob);
mc2.port2.postMessage(blob);

// The Blob is still usable after posting.
blob.text().then(console.log);
```
