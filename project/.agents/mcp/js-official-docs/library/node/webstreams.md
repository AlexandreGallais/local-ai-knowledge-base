---
title: "Web Streams API (part 1 of 4)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/webstreams.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Web Streams API

> Stability: 2 - Stable

An implementation of the WHATWG Streams Standard.

## Overview

The WHATWG Streams Standard (or "web streams") defines an API for handling
streaming data. It is similar to the Node.js Streams API but emerged later
and has become the "standard" API for streaming data across many JavaScript
environments.

There are three primary types of objects:

* `ReadableStream` - Represents a source of streaming data.
* `WritableStream` - Represents a destination for streaming data.
* `TransformStream` - Represents an algorithm for transforming streaming data.

### Example `ReadableStream`

This example creates a simple `ReadableStream` that pushes the current
`performance.now()` timestamp once every second forever. An async iterable
is used to read the data from the stream.

```mjs
import {
  ReadableStream,
} from 'node:stream/web';

import {
  setInterval as every,
} from 'node:timers/promises';

import {
  performance,
} from 'node:perf_hooks';

const SECOND = 1000;

const stream = new ReadableStream({
  async start(controller) {
    for await (const _ of every(SECOND))
      controller.enqueue(performance.now());
  },
});

for await (const value of stream)
  console.log(value);
```

```cjs
const {
  ReadableStream,
} = require('node:stream/web');

const {
  setInterval: every,
} = require('node:timers/promises');

const {
  performance,
} = require('node:perf_hooks');

const SECOND = 1000;

const stream = new ReadableStream({
  async start(controller) {
    for await (const _ of every(SECOND))
      controller.enqueue(performance.now());
  },
});

(async () => {
  for await (const value of stream)
    console.log(value);
})();
```

### Node.js streams interoperability

Node.js streams can be converted to web streams and vice versa via the `toWeb` and `fromWeb` methods present on `stream.Readable`, `stream.Writable` and `stream.Duplex` objects.

For more details refer to the relevant documentation:

* `stream.Readable.toWeb`
* `stream.Readable.fromWeb`
* `stream.Writable.toWeb`
* `stream.Writable.fromWeb`
* `stream.Duplex.toWeb`
* `stream.Duplex.fromWeb`
