---
title: "Iterable Streams (part 7 of 7)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/stream_iter.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Iterable Streams (part 7 of 7)

## Protocol symbols

These well-known symbols allow third-party objects to participate in the
streaming protocol without importing from `node:stream/iter` directly.

### `Stream.broadcastProtocol`

* Value: `Symbol.for('Stream.broadcastProtocol')`

The value must be a function. When called by `Broadcast.from()`, it receives
the options passed to `Broadcast.from()` and must return an object conforming
to the {BroadcastChannel} interface. The implementation is fully custom -- it can
manage consumers, buffering, and backpressure however it wants.

```mjs
import {
  broadcast as createBroadcast,
  Broadcast,
  text,
} from 'node:stream/iter';

// This example defers to the built-in Broadcast, but a custom
// implementation could use any mechanism.
class MessageBus {
  #broadcast;
  #writer;

  constructor() {
    const { writer, broadcast } = createBroadcast();
    this.#writer = writer;
    this.#broadcast = broadcast;
  }

  [Symbol.for('Stream.broadcastProtocol')](options) {
    return this.#broadcast;
  }

  send(data) {
    this.#writer.write(new TextEncoder().encode(data));
  }

  close() {
    this.#writer.end();
  }
}

const bus = new MessageBus();
const broadcast = Broadcast.from(bus);
const consumer = broadcast.push();
bus.send('hello');
bus.close();
console.log(await text(consumer)); // 'hello'
```

```cjs
const {
  broadcast: createBroadcast,
  Broadcast,
  text,
} = require('node:stream/iter');

// This example defers to the built-in Broadcast, but a custom
// implementation could use any mechanism.
class MessageBus {
  #broadcast;
  #writer;

  constructor() {
    const { writer, broadcast } = createBroadcast();
    this.#writer = writer;
    this.#broadcast = broadcast;
  }

  [Symbol.for('Stream.broadcastProtocol')](options) {
    return this.#broadcast;
  }

  send(data) {
    this.#writer.write(new TextEncoder().encode(data));
  }

  close() {
    this.#writer.end();
  }
}

const bus = new MessageBus();
const broadcast = Broadcast.from(bus);
const consumer = broadcast.push();
bus.send('hello');
bus.close();
text(consumer).then(console.log); // 'hello'
```

### `Stream.drainableProtocol`

* Value: `Symbol.for('Stream.drainableProtocol')`

Implement to make a writer compatible with `ondrain()`. The method should
return `null` if no backpressure, or a promise that fulfills with a truthy value
when backpressure clears.

```mjs
import { ondrain } from 'node:stream/iter';

class CustomWriter {
  #queue = [];
  #drain = null;
  #closed = false;
  [Symbol.for('Stream.drainableProtocol')]() {
    if (this.#closed) return null;
    if (this.#queue.length < 3) return Promise.resolve(true);
    this.#drain ??= Promise.withResolvers();
    return this.#drain.promise;
  }
  write(chunk) {
    this.#queue.push(chunk);
  }
  flush() {
    this.#queue.length = 0;
    this.#drain?.resolve(true);
    this.#drain = null;
  }
  close() {
    this.#closed = true;
  }
}
const writer = new CustomWriter();
const ready = ondrain(writer);
console.log(ready); // Promise { true } -- no backpressure
```

```cjs
const { ondrain } = require('node:stream/iter');

class CustomWriter {
  #queue = [];
  #drain = null;
  #closed = false;

  [Symbol.for('Stream.drainableProtocol')]() {
    if (this.#closed) return null;
    if (this.#queue.length < 3) return Promise.resolve(true);
    this.#drain ??= Promise.withResolvers();
    return this.#drain.promise;
  }

  write(chunk) {
    this.#queue.push(chunk);
  }

  flush() {
    this.#queue.length = 0;
    this.#drain?.resolve(true);
    this.#drain = null;
  }

  close() {
    this.#closed = true;
  }
}

const writer = new CustomWriter();
const ready = ondrain(writer);
console.log(ready); // Promise { true } -- no backpressure
```

### `Stream.shareProtocol`

* Value: `Symbol.for('Stream.shareProtocol')`

The value must be a function. When called by `Share.from()`, it receives the
options passed to `Share.from()` and must return an object conforming to the
{Share} interface. The implementation is fully custom -- it can manage the shared
source, consumers, buffering, and backpressure however it wants.

```mjs
import { share, Share, text } from 'node:stream/iter';

// This example defers to the built-in share(), but a custom
// implementation could use any mechanism.
class DataPool {
  #share;

  constructor(source) {
    this.#share = share(source);
  }

  [Symbol.for('Stream.shareProtocol')](options) {
    return this.#share;
  }
}

const pool = new DataPool(
  (async function* () {
    yield 'hello';
  })(),
);

const shared = Share.from(pool);
const consumer = shared.pull();
console.log(await text(consumer)); // 'hello'
```

```cjs
const { share, Share, text } = require('node:stream/iter');

// This example defers to the built-in share(), but a custom
// implementation could use any mechanism.
class DataPool {
  #share;

  constructor(source) {
    this.#share = share(source);
  }

  [Symbol.for('Stream.shareProtocol')](options) {
    return this.#share;
  }
}

const pool = new DataPool(
  (async function* () {
    yield 'hello';
  })(),
);

const shared = Share.from(pool);
const consumer = shared.pull();
text(consumer).then(console.log); // 'hello'
```

### `Stream.shareSyncProtocol`

* Value: `Symbol.for('Stream.shareSyncProtocol')`

The value must be a function. When called by `SyncShare.fromSync()`, it receives
the options passed to `SyncShare.fromSync()` and must return an object conforming
to the {SyncShare} interface. The implementation is fully custom -- it can manage
the shared source, consumers, and buffering however it wants.

```mjs
import { shareSync, SyncShare, textSync } from 'node:stream/iter';

// This example defers to the built-in shareSync(), but a custom
// implementation could use any mechanism.
class SyncDataPool {
  #share;

  constructor(source) {
    this.#share = shareSync(source);
  }

  [Symbol.for('Stream.shareSyncProtocol')](options) {
    return this.#share;
  }
}

const encoder = new TextEncoder();
const pool = new SyncDataPool(
  function* () {
    yield [encoder.encode('hello')];
  }(),
);

const shared = SyncShare.fromSync(pool);
const consumer = shared.pull();
console.log(textSync(consumer)); // 'hello'
```

```cjs
const { shareSync, SyncShare, textSync } = require('node:stream/iter');

// This example defers to the built-in shareSync(), but a custom
// implementation could use any mechanism.
class SyncDataPool {
  #share;

  constructor(source) {
    this.#share = shareSync(source);
  }

  [Symbol.for('Stream.shareSyncProtocol')](options) {
    return this.#share;
  }
}

const encoder = new TextEncoder();
const pool = new SyncDataPool(
  function* () {
    yield [encoder.encode('hello')];
  }(),
);

const shared = SyncShare.fromSync(pool);
const consumer = shared.pull();
console.log(textSync(consumer)); // 'hello'
```

### `Stream.toAsyncStreamable`

* Value: `Symbol.for('Stream.toAsyncStreamable')`

The value must be a function that converts the object into a streamable value.
When the object is passed to `from()`, this method is called to produce the
actual data. It may return any value that resolves to a string, `Uint8Array`,
`AsyncIterable`, `Iterable`, or another streamable object.

```mjs
import { from, text } from 'node:stream/iter';

class Greeting {
  #name;

  constructor(name) {
    this.#name = name;
  }

  [Symbol.for('Stream.toAsyncStreamable')]() {
    return `hello ${this.#name}`;
  }
}

const stream = from(new Greeting('world'));
console.log(await text(stream)); // 'hello world'
```

```cjs
const { from, text } = require('node:stream/iter');

class Greeting {
  #name;

  constructor(name) {
    this.#name = name;
  }

  [Symbol.for('Stream.toAsyncStreamable')]() {
    return `hello ${this.#name}`;
  }
}

const stream = from(new Greeting('world'));
text(stream).then(console.log); // 'hello world'
```

### `Stream.toStreamable`

* Value: `Symbol.for('Stream.toStreamable')`

The value must be a function that synchronously converts the object into a
streamable value. When the object is passed to `fromSync()`, this method is
called to produce the actual data. It must synchronously return a streamable
value: a string, `Uint8Array`, or `Iterable`.

```mjs
import { fromSync, textSync } from 'node:stream/iter';

class Greeting {
  #name;

  constructor(name) {
    this.#name = name;
  }

  [Symbol.for('Stream.toStreamable')]() {
    return `hello ${this.#name}`;
  }
}

const stream = fromSync(new Greeting('world'));
console.log(textSync(stream)); // 'hello world'
```

```cjs
const { fromSync, textSync } = require('node:stream/iter');

class Greeting {
  #name;

  constructor(name) {
    this.#name = name;
  }

  [Symbol.for('Stream.toStreamable')]() {
    return `hello ${this.#name}`;
  }
}

const stream = fromSync(new Greeting('world'));
console.log(textSync(stream)); // 'hello world'
```
