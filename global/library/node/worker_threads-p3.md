---
title: "Worker threads (part 3 of 5)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/worker_threads.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Worker threads (part 3 of 5)

## Class: `MessagePort`

* Extends: {EventTarget}

Instances of the `worker.MessagePort` class represent one end of an
asynchronous, two-way communications channel. It can be used to transfer
structured data, memory regions and other `MessagePort`s between different
`Worker`s.

This implementation matches browser `MessagePort`s.

### Event: `'close'`

The `'close'` event is emitted once either side of the channel has been
disconnected.

```mjs
import { MessageChannel } from 'node:worker_threads';
const { port1, port2 } = new MessageChannel();

// Prints:
//   foobar
//   closed!
port2.on('message', (message) => console.log(message));
port2.once('close', () => console.log('closed!'));

port1.postMessage('foobar');
port1.close();
```

```cjs
const { MessageChannel } = require('node:worker_threads');
const { port1, port2 } = new MessageChannel();

// Prints:
//   foobar
//   closed!
port2.on('message', (message) => console.log(message));
port2.once('close', () => console.log('closed!'));

port1.postMessage('foobar');
port1.close();
```

### Event: `'message'`

* `value` {any} The transmitted value

The `'message'` event is emitted for any incoming message, containing the cloned
input of `port.postMessage()`.

Listeners on this event receive a clone of the `value` parameter as passed
to `postMessage()` and no further arguments.

### Event: `'messageerror'`

* `error` {Error} An Error object

The `'messageerror'` event is emitted when deserializing a message failed.

Currently, this event is emitted when there is an error occurring while
instantiating the posted JS object on the receiving end. Such situations
are rare, but can happen, for instance, when certain Node.js API objects
are received in a `vm.Context` (where Node.js APIs are currently
unavailable).

### `port.close()`

Disables further sending of messages on either side of the connection.
This method can be called when no further communication will happen over this
`MessagePort`.

The `'close'` event is emitted on both `MessagePort` instances that
are part of the channel.

### `port.postMessage(value[, transferList])`

* `value` {any}
* `transferList` {Object\[]}

Sends a JavaScript value to the receiving side of this channel.
`value` is transferred in a way which is compatible with
the HTML structured clone algorithm.

In particular, the significant differences to `JSON` are:

* `value` may contain circular references.
* `value` may contain instances of builtin JS types such as `RegExp`s,
  `BigInt`s, `Map`s, `Set`s, etc.
* `value` may contain typed arrays, both using `ArrayBuffer`s
  and `SharedArrayBuffer`s.
* `value` may contain `WebAssembly.Module` instances.
* `value` may not contain native (C++-backed) objects other than:
  * {CryptoKey}s,
  * {FileHandle}s,
  * {Histogram}s,
  * {KeyObject}s,
  * {MessagePort}s,
  * {net.BlockList}s,
  * {net.Server}s (TCP only, when listed in `transferList`),
  * {net.Socket}s (TCP only, when listed in `transferList`),
  * {net.SocketAddress}es,
  * {X509Certificate}s.

```mjs
import { MessageChannel } from 'node:worker_threads';
const { port1, port2 } = new MessageChannel();

port1.on('message', (message) => console.log(message));

const circularData = {};
circularData.foo = circularData;
// Prints: { foo: [Circular] }
port2.postMessage(circularData);
```

```cjs
const { MessageChannel } = require('node:worker_threads');
const { port1, port2 } = new MessageChannel();

port1.on('message', (message) => console.log(message));

const circularData = {};
circularData.foo = circularData;
// Prints: { foo: [Circular] }
port2.postMessage(circularData);
```

`transferList` may be a list of {ArrayBuffer}, `MessagePort`,
`FileHandle`, {net.Server}, {net.Socket}, and {net.BoundSocket} objects.
After transferring, they are not usable on the sending side of the channel
anymore (even if they are not contained in `value`).

Transferring a {net.Server} moves its listening socket — together with any
pending connections in the accept queue — to the receiving thread's event loop.
Transferring a {net.Socket} moves a single connection; the socket must be a
freshly accepted or created TCP connection that has not yet started reading and
has no buffered data, otherwise `postMessage()` throws
`ERR_WORKER_HANDLE_NOT_TRANSFERABLE`. This makes it possible to accept
connections on one thread and distribute them across a pool of worker threads.
Transferring a {net.BoundSocket} moves an un-adopted pre-bound socket, so a
port can be reserved synchronously on one thread and adopted on another.
Only TCP handles are supported.

If `value` contains {SharedArrayBuffer} instances, those are accessible
from either thread. They cannot be listed in `transferList`.

`value` may still contain `ArrayBuffer` instances that are not in
`transferList`; in that case, the underlying memory is copied rather than moved.

```mjs
import { MessageChannel } from 'node:worker_threads';
const { port1, port2 } = new MessageChannel();

port1.on('message', (message) => console.log(message));

const uint8Array = new Uint8Array([ 1, 2, 3, 4 ]);
// This posts a copy of `uint8Array`:
port2.postMessage(uint8Array);
// This does not copy data, but renders `uint8Array` unusable:
port2.postMessage(uint8Array, [ uint8Array.buffer ]);

// The memory for the `sharedUint8Array` is accessible from both the
// original and the copy received by `.on('message')`:
const sharedUint8Array = new Uint8Array(new SharedArrayBuffer(4));
port2.postMessage(sharedUint8Array);

// This transfers a freshly created message port to the receiver.
// This can be used, for example, to create communication channels between
// multiple `Worker` threads that are children of the same parent thread.
const otherChannel = new MessageChannel();
port2.postMessage({ port: otherChannel.port1 }, [ otherChannel.port1 ]);
```

```cjs
const { MessageChannel } = require('node:worker_threads');
const { port1, port2 } = new MessageChannel();

port1.on('message', (message) => console.log(message));

const uint8Array = new Uint8Array([ 1, 2, 3, 4 ]);
// This posts a copy of `uint8Array`:
port2.postMessage(uint8Array);
// This does not copy data, but renders `uint8Array` unusable:
port2.postMessage(uint8Array, [ uint8Array.buffer ]);

// The memory for the `sharedUint8Array` is accessible from both the
// original and the copy received by `.on('message')`:
const sharedUint8Array = new Uint8Array(new SharedArrayBuffer(4));
port2.postMessage(sharedUint8Array);

// This transfers a freshly created message port to the receiver.
// This can be used, for example, to create communication channels between
// multiple `Worker` threads that are children of the same parent thread.
const otherChannel = new MessageChannel();
port2.postMessage({ port: otherChannel.port1 }, [ otherChannel.port1 ]);
```

The message object is cloned immediately, and can be modified after
posting without having side effects.

For more information on the serialization and deserialization mechanisms
behind this API, see the serialization API of the `node:v8` module.

#### Considerations when transferring TypedArrays and Buffers

All {TypedArray|Buffer} instances are views over an underlying
{ArrayBuffer}. That is, it is the `ArrayBuffer` that actually stores
the raw data while the `TypedArray` and `Buffer` objects provide a
way of viewing and manipulating the data. It is possible and common
for multiple views to be created over the same `ArrayBuffer` instance.
Great care must be taken when using a transfer list to transfer an
`ArrayBuffer` as doing so causes all `TypedArray` and `Buffer`
instances that share that same `ArrayBuffer` to become unusable.

```js
const ab = new ArrayBuffer(10);

const u1 = new Uint8Array(ab);
const u2 = new Uint16Array(ab);

console.log(u2.length);  // prints 5

port.postMessage(u1, [u1.buffer]);

console.log(u2.length);  // prints 0
```

For `Buffer` instances, specifically, whether the underlying
`ArrayBuffer` can be transferred or cloned depends entirely on how
instances were created, which often cannot be reliably determined.

An `ArrayBuffer` can be marked with `markAsUntransferable()` to indicate
that it should always be cloned and never transferred.

Depending on how a `Buffer` instance was created, it may or may
not own its underlying `ArrayBuffer`. An `ArrayBuffer` must not
be transferred unless it is known that the `Buffer` instance
owns it. In particular, for `Buffer`s created from the internal
`Buffer` pool (using, for instance `Buffer.from()` or `Buffer.allocUnsafe()`),
transferring them is not possible and they are always cloned,
which sends a copy of the entire `Buffer` pool.
This behavior may come with unintended higher memory
usage and possible security concerns.

See `Buffer.allocUnsafe()` for more details on `Buffer` pooling.

The `ArrayBuffer`s for `Buffer` instances created using
`Buffer.alloc()` or `Buffer.allocUnsafeSlow()` can always be
transferred but doing so renders all other existing views of
those `ArrayBuffer`s unusable.

#### Considerations when cloning objects with prototypes, classes, and accessors

Because object cloning uses the HTML structured clone algorithm,
non-enumerable properties, property accessors, and object prototypes are
not preserved. In particular, {Buffer} objects will be read as
plain {Uint8Array}s on the receiving side, and instances of JavaScript
classes will be cloned as plain JavaScript objects.

```js
const b = Symbol('b');

class Foo {
  #a = 1;
  constructor() {
    this[b] = 2;
    this.c = 3;
  }

  get d() { return this.#a + 3; }
}

const { port1, port2 } = new MessageChannel();

port1.onmessage = ({ data }) => console.log(data);

port2.postMessage(new Foo());

// Prints: { c: 3 }
```

Some built-in objects cannot be cloned at all. For example, posting a
`URL` object throws a `DataCloneError`:

```js
const { port1, port2 } = new MessageChannel();

port2.postMessage(new URL('https://example.org'));
// Throws DataCloneError: Cannot clone object of unsupported type.
```

### `port.hasRef()`

* Returns: {boolean}

If true, the `MessagePort` object will keep the Node.js event loop active.

### `port.ref()`

Opposite of `unref()`. Calling `ref()` on a previously `unref()`ed port does
_not_ let the program exit if it's the only active handle left (the default
behavior). If the port is `ref()`ed, calling `ref()` again has no effect.

If listeners are attached or removed using `.on('message')`, the port
is `ref()`ed and `unref()`ed automatically depending on whether
listeners for the event exist.

### `port.start()`

Starts receiving messages on this `MessagePort`. When using this port
as an event emitter, this is called automatically once `'message'`
listeners are attached.

This method exists for parity with the Web `MessagePort` API. In Node.js,
it is only useful for ignoring messages when no event listener is present.
Node.js also diverges in its handling of `.onmessage`. Setting it
automatically calls `.start()`, but unsetting it lets messages queue up
until a new handler is set or the port is discarded.

### `port.unref()`

Calling `unref()` on a port allows the thread to exit if this is the only
active handle in the event system. If the port is already `unref()`ed calling
`unref()` again has no effect.

If listeners are attached or removed using `.on('message')`, the port is
`ref()`ed and `unref()`ed automatically depending on whether
listeners for the event exist.
