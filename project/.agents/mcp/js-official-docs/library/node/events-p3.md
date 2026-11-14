---
title: "Events (part 3 of 5)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/events.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Events (part 3 of 5)

### `emitter.rawListeners(eventName)`

* `eventName` {string|symbol}
* Returns: {Function\[]}

Returns a copy of the array of listeners for the event named `eventName`,
including any wrappers (such as those created by `.once()`).

```mjs
import { EventEmitter } from 'node:events';
const emitter = new EventEmitter();
emitter.once('log', () => console.log('log once'));

// Returns a new Array with a function `onceWrapper` which has a property
// `listener` which contains the original listener bound above
const listeners = emitter.rawListeners('log');
const logFnWrapper = listeners[0];

// Logs "log once" to the console and does not unbind the `once` event
logFnWrapper.listener();

// Logs "log once" to the console and removes the listener
logFnWrapper();

emitter.on('log', () => console.log('log persistently'));
// Will return a new Array with a single function bound by `.on()` above
const newListeners = emitter.rawListeners('log');

// Logs "log persistently" twice
newListeners[0]();
emitter.emit('log');
```

```cjs
const EventEmitter = require('node:events');
const emitter = new EventEmitter();
emitter.once('log', () => console.log('log once'));

// Returns a new Array with a function `onceWrapper` which has a property
// `listener` which contains the original listener bound above
const listeners = emitter.rawListeners('log');
const logFnWrapper = listeners[0];

// Logs "log once" to the console and does not unbind the `once` event
logFnWrapper.listener();

// Logs "log once" to the console and removes the listener
logFnWrapper();

emitter.on('log', () => console.log('log persistently'));
// Will return a new Array with a single function bound by `.on()` above
const newListeners = emitter.rawListeners('log');

// Logs "log persistently" twice
newListeners[0]();
emitter.emit('log');
```

### `emitterSymbol.for('nodejs.rejection')`

* `err` {Error}
* `eventName` {string|symbol}
* `...args` {any}

The `Symbol.for('nodejs.rejection')` method is called in case a
promise rejection happens when emitting an event and
`captureRejections` is enabled on the emitter.
It is possible to use `events.captureRejectionSymbol` in
place of `Symbol.for('nodejs.rejection')`.

```mjs
import { EventEmitter, captureRejectionSymbol } from 'node:events';

class MyClass extends EventEmitter {
  constructor() {
    super({ captureRejections: true });
  }

  [captureRejectionSymbol](err, event, ...args) {
    console.log('rejection happened for', event, 'with', err, ...args);
    this.destroy(err);
  }

  destroy(err) {
    // Tear the resource down here.
  }
}
```

```cjs
const { EventEmitter, captureRejectionSymbol } = require('node:events');

class MyClass extends EventEmitter {
  constructor() {
    super({ captureRejections: true });
  }

  [captureRejectionSymbol](err, event, ...args) {
    console.log('rejection happened for', event, 'with', err, ...args);
    this.destroy(err);
  }

  destroy(err) {
    // Tear the resource down here.
  }
}
```

## `events.defaultMaxListeners`

By default, a maximum of `10` listeners can be registered for any single
event. This limit can be changed for individual `EventEmitter` instances
using the `emitter.setMaxListeners(n)` method. To change the default
for _all_ `EventEmitter` instances, the `events.defaultMaxListeners`
property can be used. If this value is not a positive number, a `RangeError`
is thrown.

Take caution when setting the `events.defaultMaxListeners` because the
change affects _all_ `EventEmitter` instances, including those created before
the change is made. However, calling `emitter.setMaxListeners(n)` still has
precedence over `events.defaultMaxListeners`.

This is not a hard limit. The `EventEmitter` instance will allow
more listeners to be added but will output a trace warning to stderr indicating
that a "possible EventEmitter memory leak" has been detected. For any single
`EventEmitter`, the `emitter.getMaxListeners()` and `emitter.setMaxListeners()`
methods can be used to temporarily avoid this warning:

`defaultMaxListeners` has no effect on `AbortSignal` instances. While it is
still possible to use `emitter.setMaxListeners(n)` to set a warning limit
for individual `AbortSignal` instances, per default `AbortSignal` instances will not warn.

```mjs
import { EventEmitter } from 'node:events';
const emitter = new EventEmitter();
emitter.setMaxListeners(emitter.getMaxListeners() + 1);
emitter.once('event', () => {
  // do stuff
  emitter.setMaxListeners(Math.max(emitter.getMaxListeners() - 1, 0));
});
```

```cjs
const EventEmitter = require('node:events');
const emitter = new EventEmitter();
emitter.setMaxListeners(emitter.getMaxListeners() + 1);
emitter.once('event', () => {
  // do stuff
  emitter.setMaxListeners(Math.max(emitter.getMaxListeners() - 1, 0));
});
```

The `--trace-warnings` command-line flag can be used to display the
stack trace for such warnings.

The emitted warning can be inspected with `process.on('warning')` and will
have the additional `emitter`, `type`, and `count` properties, referring to
the event emitter instance, the event's name and the number of attached
listeners, respectively.
Its `name` property is set to `'MaxListenersExceededWarning'`.

## `events.errorMonitor`

This symbol shall be used to install a listener for only monitoring `'error'`
events. Listeners installed using this symbol are called before the regular
`'error'` listeners are called.

Installing a listener using this symbol does not change the behavior once an
`'error'` event is emitted. Therefore, the process will still crash if no
regular `'error'` listener is installed.

## `events.getEventListeners(emitterOrTarget, eventName)`

* `emitterOrTarget` {EventEmitter|EventTarget}
* `eventName` {string|symbol}
* Returns: {Function\[]}

Returns a copy of the array of listeners for the event named `eventName`.

For `EventEmitter`s this behaves exactly the same as calling `.listeners` on
the emitter.

For `EventTarget`s this is the only way to get the event listeners for the
event target. This is useful for debugging and diagnostic purposes.

```mjs
import { getEventListeners, EventEmitter } from 'node:events';

{
  const ee = new EventEmitter();
  const listener = () => console.log('Events are fun');
  ee.on('foo', listener);
  console.log(getEventListeners(ee, 'foo')); // [ [Function: listener] ]
}
{
  const et = new EventTarget();
  const listener = () => console.log('Events are fun');
  et.addEventListener('foo', listener);
  console.log(getEventListeners(et, 'foo')); // [ [Function: listener] ]
}
```

```cjs
const { getEventListeners, EventEmitter } = require('node:events');

{
  const ee = new EventEmitter();
  const listener = () => console.log('Events are fun');
  ee.on('foo', listener);
  console.log(getEventListeners(ee, 'foo')); // [ [Function: listener] ]
}
{
  const et = new EventTarget();
  const listener = () => console.log('Events are fun');
  et.addEventListener('foo', listener);
  console.log(getEventListeners(et, 'foo')); // [ [Function: listener] ]
}
```

## `events.getMaxListeners(emitterOrTarget)`

* `emitterOrTarget` {EventEmitter|EventTarget}
* Returns: {number}

Returns the currently set max amount of listeners.

For `EventEmitter`s this behaves exactly the same as calling `.getMaxListeners` on
the emitter.

For `EventTarget`s this is the only way to get the max event listeners for the
event target. If the number of event handlers on a single EventTarget exceeds
the max set, the EventTarget will print a warning.

```mjs
import { getMaxListeners, setMaxListeners, EventEmitter } from 'node:events';

{
  const ee = new EventEmitter();
  console.log(getMaxListeners(ee)); // 10
  setMaxListeners(11, ee);
  console.log(getMaxListeners(ee)); // 11
}
{
  const et = new EventTarget();
  console.log(getMaxListeners(et)); // 10
  setMaxListeners(11, et);
  console.log(getMaxListeners(et)); // 11
}
```

```cjs
const { getMaxListeners, setMaxListeners, EventEmitter } = require('node:events');

{
  const ee = new EventEmitter();
  console.log(getMaxListeners(ee)); // 10
  setMaxListeners(11, ee);
  console.log(getMaxListeners(ee)); // 11
}
{
  const et = new EventTarget();
  console.log(getMaxListeners(et)); // 10
  setMaxListeners(11, et);
  console.log(getMaxListeners(et)); // 11
}
```

## `events.once(emitter, name[, options])`

* `emitter` {EventEmitter}
* `name` {string|symbol}
* `options` {Object}
  * `signal` {AbortSignal} Can be used to cancel waiting for the event.
* Returns: {Promise}

Creates a `Promise` that is fulfilled when the `EventEmitter` emits the given
event or that is rejected if the `EventEmitter` emits `'error'` while waiting.
The `Promise` will resolve with an array of all the arguments emitted to the
given event.

This method is intentionally generic and works with the web platform
EventTarget interface, which has no special
`'error'` event semantics and does not listen to the `'error'` event.

```mjs
import { once, EventEmitter } from 'node:events';
import process from 'node:process';

const ee = new EventEmitter();

process.nextTick(() => {
  ee.emit('myevent', 42);
});

const [value] = await once(ee, 'myevent');
console.log(value);

const err = new Error('kaboom');
process.nextTick(() => {
  ee.emit('error', err);
});

try {
  await once(ee, 'myevent');
} catch (err) {
  console.error('error happened', err);
}
```

```cjs
const { once, EventEmitter } = require('node:events');

async function run() {
  const ee = new EventEmitter();

  process.nextTick(() => {
    ee.emit('myevent', 42);
  });

  const [value] = await once(ee, 'myevent');
  console.log(value);

  const err = new Error('kaboom');
  process.nextTick(() => {
    ee.emit('error', err);
  });

  try {
    await once(ee, 'myevent');
  } catch (err) {
    console.error('error happened', err);
  }
}

run();
```

The special handling of the `'error'` event is only used when `events.once()`
is used to wait for another event. If `events.once()` is used to wait for the
'`error'` event itself, then it is treated as any other kind of event without
special handling:

```mjs
import { EventEmitter, once } from 'node:events';

const ee = new EventEmitter();

once(ee, 'error')
  .then(([err]) => console.log('ok', err.message))
  .catch((err) => console.error('error', err.message));

ee.emit('error', new Error('boom'));

// Prints: ok boom
```

```cjs
const { EventEmitter, once } = require('node:events');

const ee = new EventEmitter();

once(ee, 'error')
  .then(([err]) => console.log('ok', err.message))
  .catch((err) => console.error('error', err.message));

ee.emit('error', new Error('boom'));

// Prints: ok boom
```

An {AbortSignal} can be used to cancel waiting for the event:

```mjs
import { EventEmitter, once } from 'node:events';

const ee = new EventEmitter();
const ac = new AbortController();

async function foo(emitter, event, signal) {
  try {
    await once(emitter, event, { signal });
    console.log('event emitted!');
  } catch (error) {
    if (error.name === 'AbortError') {
      console.error('Waiting for the event was canceled!');
    } else {
      console.error('There was an error', error.message);
    }
  }
}

foo(ee, 'foo', ac.signal);
ac.abort(); // Prints: Waiting for the event was canceled!
```

```cjs
const { EventEmitter, once } = require('node:events');

const ee = new EventEmitter();
const ac = new AbortController();

async function foo(emitter, event, signal) {
  try {
    await once(emitter, event, { signal });
    console.log('event emitted!');
  } catch (error) {
    if (error.name === 'AbortError') {
      console.error('Waiting for the event was canceled!');
    } else {
      console.error('There was an error', error.message);
    }
  }
}

foo(ee, 'foo', ac.signal);
ac.abort(); // Prints: Waiting for the event was canceled!
```

### Caveats when awaiting multiple events

It is important to be aware of execution order when using the `events.once()`
method to await multiple events.

Conventional event listeners are called synchronously when the event is
emitted. This guarantees that execution will not proceed beyond the emitted
event until all listeners have finished executing.

The same is _not_ true when awaiting Promises returned by `events.once()`.
Promise tasks are not handled until after the current execution stack runs to
completion, which means that multiple events could be emitted before
asynchronous execution continues from the relevant `await` statement.

As a result, events can be "missed" if a series of `await events.once()`
statements is used to listen to multiple events, since there might be times
where more than one event is emitted during the same phase of the event loop.
(The same is true when using `process.nextTick()` to emit events, because the
tasks queued by `process.nextTick()` are executed before Promise tasks.)

```mjs
import { EventEmitter, once } from 'node:events';
import process from 'node:process';

const myEE = new EventEmitter();

async function listen() {
  await once(myEE, 'foo');
  console.log('foo');

  // This Promise will never resolve, because the 'bar' event will
  // have already been emitted before the next line is executed.
  await once(myEE, 'bar');
  console.log('bar');
}

process.nextTick(() => {
  myEE.emit('foo');
  myEE.emit('bar');
});

listen().then(() => console.log('done'));
```

```cjs
const { EventEmitter, once } = require('node:events');

const myEE = new EventEmitter();

async function listen() {
  await once(myEE, 'foo');
  console.log('foo');

  // This Promise will never resolve, because the 'bar' event will
  // have already been emitted before the next line is executed.
  await once(myEE, 'bar');
  console.log('bar');
}

process.nextTick(() => {
  myEE.emit('foo');
  myEE.emit('bar');
});

listen().then(() => console.log('done'));
```

To catch multiple events, create all of the Promises _before_ awaiting any of
them. This is usually made easier by using `Promise.all()`, `Promise.race()`,
or `Promise.allSettled()`:

```mjs
import { EventEmitter, once } from 'node:events';
import process from 'node:process';

const myEE = new EventEmitter();

async function listen() {
  await Promise.all([
    once(myEE, 'foo'),
    once(myEE, 'bar'),
  ]);
  console.log('foo', 'bar');
}

process.nextTick(() => {
  myEE.emit('foo');
  myEE.emit('bar');
});

listen().then(() => console.log('done'));
```

```cjs
const { EventEmitter, once } = require('node:events');

const myEE = new EventEmitter();

async function listen() {
  await Promise.all([
    once(myEE, 'bar'),
    once(myEE, 'foo'),
  ]);
  console.log('foo', 'bar');
}

process.nextTick(() => {
  myEE.emit('foo');
  myEE.emit('bar');
});

listen().then(() => console.log('done'));
```

## `events.captureRejections`

* Type: {boolean}

Change the default `captureRejections` option on all new `EventEmitter` objects.

## `events.captureRejectionSymbol`

* Type: {symbol} `Symbol.for('nodejs.rejection')`

See how to write a custom rejection handler.
