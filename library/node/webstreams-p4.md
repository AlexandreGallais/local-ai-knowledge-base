---
title: "Web Streams API (part 4 of 4)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/webstreams.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Web Streams API (part 4 of 4)

### Class: `CountQueuingStrategy`

#### `new CountQueuingStrategy(init)`

* `init` {Object}
  * `highWaterMark` {number}

#### `countQueuingStrategy.highWaterMark`

* Type: {number}

#### `countQueuingStrategy.size`

* Type: {Function}
  * `chunk` {any}
  * Returns: {number}

### Class: `TextEncoderStream`

#### `new TextEncoderStream()`

Creates a new `TextEncoderStream` instance.

#### `textEncoderStream.encoding`

* Type: {string}

The encoding supported by the `TextEncoderStream` instance.

#### `textEncoderStream.readable`

* Type: {ReadableStream}

#### `textEncoderStream.writable`

* Type: {WritableStream}

### Class: `TextDecoderStream`

#### `new TextDecoderStream([encoding[, options]])`

* `encoding` {string} Identifies the `encoding` that this `TextDecoder` instance
  supports. **Default:** `'utf-8'`.
* `options` {Object}
  * `fatal` {boolean} `true` if decoding failures are fatal.
  * `ignoreBOM` {boolean} When `true`, the `TextDecoderStream` will include the
    byte order mark in the decoded result. When `false`, the byte order mark
    will be removed from the output. This option is only used when `encoding` is
    `'utf-8'`, `'utf-16be'`, or `'utf-16le'`. **Default:** `false`.

Creates a new `TextDecoderStream` instance.

#### `textDecoderStream.encoding`

* Type: {string}

The encoding supported by the `TextDecoderStream` instance.

#### `textDecoderStream.fatal`

* Type: {boolean}

The value will be `true` if decoding errors result in a `TypeError` being
thrown.

#### `textDecoderStream.ignoreBOM`

* Type: {boolean}

The value will be `true` if the decoding result will include the byte order
mark.

#### `textDecoderStream.readable`

* Type: {ReadableStream}

#### `textDecoderStream.writable`

* Type: {WritableStream}

### Class: `CompressionStream`

#### `new CompressionStream(format)`

* `format` {string} One of `'deflate'`, `'deflate-raw'`, `'gzip'`, or `'brotli'`.

#### `compressionStream.readable`

* Type: {ReadableStream}

#### `compressionStream.writable`

* Type: {WritableStream}

### Class: `DecompressionStream`

#### `new DecompressionStream(format)`

* `format` {string} One of `'deflate'`, `'deflate-raw'`, `'gzip'`, or `'brotli'`.

#### `decompressionStream.readable`

* Type: {ReadableStream}

#### `decompressionStream.writable`

* Type: {WritableStream}

### Utility Consumers

The utility consumer functions provide common options for consuming
streams.

They are accessed using:

```mjs
import {
  arrayBuffer,
  blob,
  buffer,
  json,
  text,
} from 'node:stream/consumers';
```

```cjs
const {
  arrayBuffer,
  blob,
  buffer,
  json,
  text,
} = require('node:stream/consumers');
```

#### `streamConsumers.arrayBuffer(stream)`

* `stream` {ReadableStream|stream.Readable|AsyncIterator}
* Returns: {Promise} Fulfills with an `ArrayBuffer` containing the full
  contents of the stream.

```mjs
import { arrayBuffer } from 'node:stream/consumers';
import { Readable } from 'node:stream';
import { TextEncoder } from 'node:util';

const encoder = new TextEncoder();
const dataArray = encoder.encode('hello world from consumers!');

const readable = Readable.from(dataArray);
const data = await arrayBuffer(readable);
console.log(`from readable: ${data.byteLength}`);
// Prints: from readable: 76
```

```cjs
const { arrayBuffer } = require('node:stream/consumers');
const { Readable } = require('node:stream');
const { TextEncoder } = require('node:util');

const encoder = new TextEncoder();
const dataArray = encoder.encode('hello world from consumers!');
const readable = Readable.from(dataArray);
arrayBuffer(readable).then((data) => {
  console.log(`from readable: ${data.byteLength}`);
  // Prints: from readable: 76
});
```

#### `streamConsumers.blob(stream)`

* `stream` {ReadableStream|stream.Readable|AsyncIterator}
* Returns: {Promise} Fulfills with a {Blob} containing the full contents
  of the stream.

```mjs
import { blob } from 'node:stream/consumers';

const dataBlob = new Blob(['hello world from consumers!']);

const readable = dataBlob.stream();
const data = await blob(readable);
console.log(`from readable: ${data.size}`);
// Prints: from readable: 27
```

```cjs
const { blob } = require('node:stream/consumers');

const dataBlob = new Blob(['hello world from consumers!']);

const readable = dataBlob.stream();
blob(readable).then((data) => {
  console.log(`from readable: ${data.size}`);
  // Prints: from readable: 27
});
```

#### `streamConsumers.buffer(stream)`

* `stream` {ReadableStream|stream.Readable|AsyncIterator}
* Returns: {Promise} Fulfills with a {Buffer} containing the full
  contents of the stream.

```mjs
import { buffer } from 'node:stream/consumers';
import { Readable } from 'node:stream';
import { Buffer } from 'node:buffer';

const dataBuffer = Buffer.from('hello world from consumers!');

const readable = Readable.from(dataBuffer);
const data = await buffer(readable);
console.log(`from readable: ${data.length}`);
// Prints: from readable: 27
```

```cjs
const { buffer } = require('node:stream/consumers');
const { Readable } = require('node:stream');
const { Buffer } = require('node:buffer');

const dataBuffer = Buffer.from('hello world from consumers!');

const readable = Readable.from(dataBuffer);
buffer(readable).then((data) => {
  console.log(`from readable: ${data.length}`);
  // Prints: from readable: 27
});
```

#### `streamConsumers.bytes(stream)`

* `stream` {ReadableStream|stream.Readable|AsyncIterator}
* Returns: {Promise} Fulfills with a {Uint8Array} containing the full
  contents of the stream.

```mjs
import { bytes } from 'node:stream/consumers';
import { Readable } from 'node:stream';
import { Buffer } from 'node:buffer';

const dataBuffer = Buffer.from('hello world from consumers!');

const readable = Readable.from(dataBuffer);
const data = await bytes(readable);
console.log(`from readable: ${data.length}`);
// Prints: from readable: 27
```

```cjs
const { bytes } = require('node:stream/consumers');
const { Readable } = require('node:stream');
const { Buffer } = require('node:buffer');

const dataBuffer = Buffer.from('hello world from consumers!');

const readable = Readable.from(dataBuffer);
bytes(readable).then((data) => {
  console.log(`from readable: ${data.length}`);
  // Prints: from readable: 27
});
```

#### `streamConsumers.json(stream)`

* `stream` {ReadableStream|stream.Readable|AsyncIterator}
* Returns: {Promise} Fulfills with the contents of the stream parsed as a
  UTF-8 encoded string that is then passed through `JSON.parse()`.

```mjs
import { json } from 'node:stream/consumers';
import { Readable } from 'node:stream';

const items = Array.from(
  {
    length: 100,
  },
  () => ({
    message: 'hello world from consumers!',
  }),
);

const readable = Readable.from(JSON.stringify(items));
const data = await json(readable);
console.log(`from readable: ${data.length}`);
// Prints: from readable: 100
```

```cjs
const { json } = require('node:stream/consumers');
const { Readable } = require('node:stream');

const items = Array.from(
  {
    length: 100,
  },
  () => ({
    message: 'hello world from consumers!',
  }),
);

const readable = Readable.from(JSON.stringify(items));
json(readable).then((data) => {
  console.log(`from readable: ${data.length}`);
  // Prints: from readable: 100
});
```

#### `streamConsumers.text(stream)`

* `stream` {ReadableStream|stream.Readable|AsyncIterator}
* Returns: {Promise} Fulfills with the contents of the stream parsed as a
  UTF-8 encoded string.

```mjs
import { text } from 'node:stream/consumers';
import { Readable } from 'node:stream';

const readable = Readable.from('Hello world from consumers!');
const data = await text(readable);
console.log(`from readable: ${data.length}`);
// Prints: from readable: 27
```

```cjs
const { text } = require('node:stream/consumers');
const { Readable } = require('node:stream');

const readable = Readable.from('Hello world from consumers!');
text(readable).then((data) => {
  console.log(`from readable: ${data.length}`);
  // Prints: from readable: 27
});
```
