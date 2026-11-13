---
title: "Events (part 4 of 5)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/events.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Events (part 4 of 5)

## `events.listenerCount(emitterOrTarget, eventName)`

* `emitterOrTarget` {EventEmitter|EventTarget}
* `eventName` {string|symbol}
* Returns: {integer}

Returns the number of registered listeners for the event named `eventName`.

For `EventEmitter`s this behaves exactly the same as calling `.listenerCount`
on the emitter.

For `EventTarget`s this is the only way to obtain the listener count. This can
be useful for debugging and diagnostic purposes.

```mjs
import { EventEmitter, listenerCount } from 'node:events';

{
  const ee = new EventEmitter();
  ee.on('event', () => {});
  ee.on('event', () => {});
  console.log(listenerCount(ee, 'event')); // 2
}
{
  const et = new EventTarget();
  et.addEventListener('event', () => {});
  et.addEventListener('event', () => {});
  console.log(listenerCount(et, 'event')); // 2
}
```

```cjs
const { EventEmitter, listenerCount } = require('node:events');

{
  const ee = new EventEmitter();
  ee.on('event', () => {});
  ee.on('event', () => {});
  console.log(listenerCount(ee, 'event')); // 2
}
{
  const et = new EventTarget();
  et.addEventListener('event', () => {});
  et.addEventListener('event', () => {});
  console.log(listenerCount(et, 'event')); // 2
}
```

## `events.on(emitter, eventName[, options])`

* `emitter` {EventEmitter}
* `eventName` {string|symbol} The name of the event being listened for
* `options` {Object}
  * `signal` {AbortSignal} Can be used to cancel awaiting events.
  * `close` {string\[]} Names of events that will end the iteration.
  * `highWaterMark` {integer} **Default:** `Number.MAX_SAFE_INTEGER`
    The high watermark. The emitter is paused every time the size of events
    being buffered is higher than it. Supported only on emitters implementing
    `pause()` and `resume()` methods.
  * `lowWaterMark` {integer} **Default:** `1`
    The low watermark. The emitter is resumed every time the size of events
    being buffered is lower than it. Supported only on emitters implementing
    `pause()` and `resume()` methods.
* Returns: {AsyncIterator} that iterates `eventName` events emitted by the `emitter`

```mjs
import { on, EventEmitter } from 'node:events';
import process from 'node:process';

const ee = new EventEmitter();

// Emit later on
process.nextTick(() => {
  ee.emit('foo', 'bar');
  ee.emit('foo', 42);
});

for await (const event of on(ee, 'foo')) {
  // The execution of this inner block is synchronous and it
  // processes one event at a time (even with await). Do not use
  // if concurrent execution is required.
  console.log(event); // prints ['bar'] [42]
}
// Unreachable here
```

```cjs
const { on, EventEmitter } = require('node:events');

(async () => {
  const ee = new EventEmitter();

  // Emit later on
  process.nextTick(() => {
    ee.emit('foo', 'bar');
    ee.emit('foo', 42);
  });

  for await (const event of on(ee, 'foo')) {
    // The execution of this inner block is synchronous and it
    // processes one event at a time (even with await). Do not use
    // if concurrent execution is required.
    console.log(event); // prints ['bar'] [42]
  }
  // Unreachable here
})();
```

Returns an `AsyncIterator` that iterates `eventName` events. It will throw
if the `EventEmitter` emits `'error'`. It removes all listeners when
exiting the loop. The `value` returned by each iteration is an array
composed of the emitted event arguments.

An {AbortSignal} can be used to cancel waiting on events:

```mjs
import { on, EventEmitter } from 'node:events';
import process from 'node:process';

const ac = new AbortController();

(async () => {
  const ee = new EventEmitter();

  // Emit later on
  process.nextTick(() => {
    ee.emit('foo', 'bar');
    ee.emit('foo', 42);
  });

  for await (const event of on(ee, 'foo', { signal: ac.signal })) {
    // The execution of this inner block is synchronous and it
    // processes one event at a time (even with await). Do not use
    // if concurrent execution is required.
    console.log(event); // prints ['bar'] [42]
  }
  // Unreachable here
})();

process.nextTick(() => ac.abort());
```

```cjs
const { on, EventEmitter } = require('node:events');

const ac = new AbortController();

(async () => {
  const ee = new EventEmitter();

  // Emit later on
  process.nextTick(() => {
    ee.emit('foo', 'bar');
    ee.emit('foo', 42);
  });

  for await (const event of on(ee, 'foo', { signal: ac.signal })) {
    // The execution of this inner block is synchronous and it
    // processes one event at a time (even with await). Do not use
    // if concurrent execution is required.
    console.log(event); // prints ['bar'] [42]
  }
  // Unreachable here
})();

process.nextTick(() => ac.abort());
```

## `events.setMaxListeners(n[, ...eventTargets])`

* `n` {number} A non-negative number. The maximum number of listeners per
  `EventTarget` event.
* `...eventsTargets` {EventTarget\[]|EventEmitter\[]} Zero or more {EventTarget}
  or {EventEmitter} instances. If none are specified, `n` is set as the default
  max for all newly created {EventTarget} and {EventEmitter} objects.

```mjs
import { setMaxListeners, EventEmitter } from 'node:events';

const target = new EventTarget();
const emitter = new EventEmitter();

setMaxListeners(5, target, emitter);
```

```cjs
const {
  setMaxListeners,
  EventEmitter,
} = require('node:events');

const target = new EventTarget();
const emitter = new EventEmitter();

setMaxListeners(5, target, emitter);
```

## `events.addAbortListener(signal, listener)`

* `signal` {AbortSignal}
* `listener` {Function|EventListener}
* Returns: {Disposable} A Disposable that removes the `abort` listener.

Listens once to the `abort` event on the provided `signal`.

Listening to the `abort` event on abort signals is unsafe and may
lead to resource leaks since another third party with the signal can
call `e.stopImmediatePropagation()`. Unfortunately Node.js cannot change
this since it would violate the web standard. Additionally, the original
API makes it easy to forget to remove listeners.

This API allows safely using `AbortSignal`s in Node.js APIs by solving these
two issues by listening to the event such that `stopImmediatePropagation` does
not prevent the listener from running.

Returns a disposable so that it may be unsubscribed from more easily.

If `signal` is already aborted, the listener is called with an `abort` event in a
microtask. Disposing before that microtask runs cancels the call.

```cjs
const { addAbortListener } = require('node:events');

function example(signal) {
  signal.addEventListener('abort', (e) => e.stopImmediatePropagation());
  // addAbortListener() returns a disposable, so the `using` keyword ensures
  // the abort listener is automatically removed when this scope exits.
  using _ = addAbortListener(signal, (e) => {
    // Do something when signal is aborted.
  });
}
```

```mjs
import { addAbortListener } from 'node:events';

function example(signal) {
  signal.addEventListener('abort', (e) => e.stopImmediatePropagation());
  // addAbortListener() returns a disposable, so the `using` keyword ensures
  // the abort listener is automatically removed when this scope exits.
  using _ = addAbortListener(signal, (e) => {
    // Do something when signal is aborted.
  });
}
```

## Class: `events.EventEmitterAsyncResource extends EventEmitter`

Integrates `EventEmitter` with {AsyncResource} for `EventEmitter`s that
require manual async tracking. Specifically, all events emitted by instances
of `events.EventEmitterAsyncResource` will run within its async context.

```mjs
import { EventEmitterAsyncResource, EventEmitter } from 'node:events';
import { notStrictEqual, strictEqual } from 'node:assert';
import { executionAsyncId, triggerAsyncId } from 'node:async_hooks';

// Async tracking tooling will identify this as 'Q'.
const ee1 = new EventEmitterAsyncResource({ name: 'Q' });

// 'foo' listeners will run in the EventEmitters async context.
ee1.on('foo', () => {
  strictEqual(executionAsyncId(), ee1.asyncId);
  strictEqual(triggerAsyncId(), ee1.triggerAsyncId);
});

const ee2 = new EventEmitter();

// 'foo' listeners on ordinary EventEmitters that do not track async
// context, however, run in the same async context as the emit().
ee2.on('foo', () => {
  notStrictEqual(executionAsyncId(), ee2.asyncId);
  notStrictEqual(triggerAsyncId(), ee2.triggerAsyncId);
});

Promise.resolve().then(() => {
  ee1.emit('foo');
  ee2.emit('foo');
});
```

```cjs
const { EventEmitterAsyncResource, EventEmitter } = require('node:events');
const { notStrictEqual, strictEqual } = require('node:assert');
const { executionAsyncId, triggerAsyncId } = require('node:async_hooks');

// Async tracking tooling will identify this as 'Q'.
const ee1 = new EventEmitterAsyncResource({ name: 'Q' });

// 'foo' listeners will run in the EventEmitters async context.
ee1.on('foo', () => {
  strictEqual(executionAsyncId(), ee1.asyncId);
  strictEqual(triggerAsyncId(), ee1.triggerAsyncId);
});

const ee2 = new EventEmitter();

// 'foo' listeners on ordinary EventEmitters that do not track async
// context, however, run in the same async context as the emit().
ee2.on('foo', () => {
  notStrictEqual(executionAsyncId(), ee2.asyncId);
  notStrictEqual(triggerAsyncId(), ee2.triggerAsyncId);
});

Promise.resolve().then(() => {
  ee1.emit('foo');
  ee2.emit('foo');
});
```

The `EventEmitterAsyncResource` class has the same methods and takes the
same options as `EventEmitter` and `AsyncResource` themselves.

### `new events.EventEmitterAsyncResource([options])`

* `options` {Object}
  * `captureRejections` {boolean} It enables
    automatic capturing of promise rejection.
    **Default:** `false`.
  * `name` {string} The type of async event. **Default:** `new.target.name`.
  * `triggerAsyncId` {number} The ID of the execution context that created this
    async event. **Default:** `executionAsyncId()`.
  * `requireManualDestroy` {boolean} If set to `true`, disables `emitDestroy`
    when the object is garbage collected. This usually does not need to be set
    (even if `emitDestroy` is called manually), unless the resource's `asyncId`
    is retrieved and the sensitive API's `emitDestroy` is called with it.
    When set to `false`, the `emitDestroy` call on garbage collection
    will only take place if there is at least one active `destroy` hook.
    **Default:** `false`.

### `eventemitterasyncresource.asyncId`

* Type: {number} The unique `asyncId` assigned to the resource.

### `eventemitterasyncresource.asyncResource`

* Type: {AsyncResource} The underlying {AsyncResource}.

The returned `AsyncResource` object has an additional `eventEmitter` property
that provides a reference to this `EventEmitterAsyncResource`.

### `eventemitterasyncresource.emitDestroy()`

Call all `destroy` hooks. This should only ever be called once. An error will
be thrown if it is called more than once. This **must** be manually called. If
the resource is left to be collected by the GC then the `destroy` hooks will
never be called.

### `eventemitterasyncresource.triggerAsyncId`

* Type: {number} The same `triggerAsyncId` that is passed to the
  `AsyncResource` constructor.
