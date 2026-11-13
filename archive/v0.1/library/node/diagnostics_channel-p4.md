---
title: "Diagnostics Channel (part 4 of 6)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/diagnostics_channel.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Diagnostics Channel (part 4 of 6)

### Class: `TracingChannel`

> Stability: 2 - Stable

The class `TracingChannel` is a collection of TracingChannel Channels which
together express a single traceable action. It is used to formalize and
simplify the process of producing events for tracing application flow.
`diagnostics_channel.tracingChannel()` is used to construct a
`TracingChannel`. As with `Channel` it is recommended to create and reuse a
single `TracingChannel` at the top-level of the file rather than creating them
dynamically.

#### `tracingChannel.subscribe(subscribers)`

* `subscribers` {Object} Set of TracingChannel Channels subscribers
  * `start` {Function} The `start` event subscriber
  * `end` {Function} The `end` event subscriber
  * `asyncStart` {Function} The `asyncStart` event subscriber
  * `asyncEnd` {Function} The `asyncEnd` event subscriber
  * `error` {Function} The `error` event subscriber

Helper to subscribe a collection of functions to the corresponding channels.
This is the same as calling `channel.subscribe(onMessage)` on each channel
individually.

```mjs
import diagnostics_channel from 'node:diagnostics_channel';

const channels = diagnostics_channel.tracingChannel('my-channel');

channels.subscribe({
  start(message) {
    // Handle start message
  },
  end(message) {
    // Handle end message
  },
  asyncStart(message) {
    // Handle asyncStart message
  },
  asyncEnd(message) {
    // Handle asyncEnd message
  },
  error(message) {
    // Handle error message
  },
});
```

```cjs
const diagnostics_channel = require('node:diagnostics_channel');

const channels = diagnostics_channel.tracingChannel('my-channel');

channels.subscribe({
  start(message) {
    // Handle start message
  },
  end(message) {
    // Handle end message
  },
  asyncStart(message) {
    // Handle asyncStart message
  },
  asyncEnd(message) {
    // Handle asyncEnd message
  },
  error(message) {
    // Handle error message
  },
});
```

#### `tracingChannel.unsubscribe(subscribers)`

* `subscribers` {Object} Set of TracingChannel Channels subscribers
  * `start` {Function} The `start` event subscriber
  * `end` {Function} The `end` event subscriber
  * `asyncStart` {Function} The `asyncStart` event subscriber
  * `asyncEnd` {Function} The `asyncEnd` event subscriber
  * `error` {Function} The `error` event subscriber
* Returns: {boolean} `true` if all handlers were successfully unsubscribed,
  and `false` otherwise.

Helper to unsubscribe a collection of functions from the corresponding channels.
This is the same as calling `channel.unsubscribe(onMessage)` on each channel
individually.

```mjs
import diagnostics_channel from 'node:diagnostics_channel';

const channels = diagnostics_channel.tracingChannel('my-channel');

channels.unsubscribe({
  start(message) {
    // Handle start message
  },
  end(message) {
    // Handle end message
  },
  asyncStart(message) {
    // Handle asyncStart message
  },
  asyncEnd(message) {
    // Handle asyncEnd message
  },
  error(message) {
    // Handle error message
  },
});
```

```cjs
const diagnostics_channel = require('node:diagnostics_channel');

const channels = diagnostics_channel.tracingChannel('my-channel');

channels.unsubscribe({
  start(message) {
    // Handle start message
  },
  end(message) {
    // Handle end message
  },
  asyncStart(message) {
    // Handle asyncStart message
  },
  asyncEnd(message) {
    // Handle asyncEnd message
  },
  error(message) {
    // Handle error message
  },
});
```

#### `tracingChannel.traceSync(fn[, context[, thisArg[, ...args]]])`

* `fn` {Function} Function to wrap a trace around
* `context` {Object} Shared object to correlate events through
* `thisArg` {any} The receiver to be used for the function call
* `...args` {any} Optional arguments to pass to the function
* Returns: {any} The return value of the given function

Trace a synchronous function call. This will always produce a `start` event
and `end` event around the execution and may produce an `error` event
if the given function throws an error. This will run the given function using
`channel.runStores(context, ...)` on the `start` channel which ensures all
events should have any bound stores set to match this trace context.

To ensure only correct trace graphs are formed, events will only be published
if subscribers are present prior to starting the trace. Subscriptions which are
added after the trace begins will not receive future events from that trace,
only future traces will be seen.

```mjs
import diagnostics_channel from 'node:diagnostics_channel';

const channels = diagnostics_channel.tracingChannel('my-channel');

channels.traceSync(() => {
  // Do something
}, {
  some: 'thing',
});
```

```cjs
const diagnostics_channel = require('node:diagnostics_channel');

const channels = diagnostics_channel.tracingChannel('my-channel');

channels.traceSync(() => {
  // Do something
}, {
  some: 'thing',
});
```

#### `tracingChannel.tracePromise(fn[, context[, thisArg[, ...args]]])`

* `fn` {Function} Function to wrap a trace around
* `context` {Object} Shared object to correlate trace events through
* `thisArg` {any} The receiver to be used for the function call
* `...args` {any} Optional arguments to pass to the function
* Returns: {any} The return value of the given function. If the return value
  is a Promise or thenable, tracing events will be published when it settles.
  If the return value is not a Promise or thenable, it is returned as-is and
  a warning is emitted.

Trace an asynchronous function call which returns a {Promise} or
thenable object. This will always produce a `start` event and
`end` event around the synchronous portion of the function execution, and
will produce an `asyncStart` event and `asyncEnd` event when the
returned promise is resolved or rejected. It may also produce an
`error` event if the given function throws an error or the returned promise
is rejected. This will run the given function using
`channel.runStores(context, ...)` on the `start` channel which ensures all
events should have any bound stores set to match this trace context.

If the value returned by `fn` is not a Promise or thenable, then it will be
returned with a warning, and no `asyncStart` or `asyncEnd` events will be
produced.

To ensure only correct trace graphs are formed, events will only be published
if subscribers are present prior to starting the trace. Subscriptions which are
added after the trace begins will not receive future events from that trace,
only future traces will be seen.

```mjs
import diagnostics_channel from 'node:diagnostics_channel';

const channels = diagnostics_channel.tracingChannel('my-channel');

channels.tracePromise(async () => {
  // Do something
}, {
  some: 'thing',
});
```

```cjs
const diagnostics_channel = require('node:diagnostics_channel');

const channels = diagnostics_channel.tracingChannel('my-channel');

channels.tracePromise(async () => {
  // Do something
}, {
  some: 'thing',
});
```

#### `tracingChannel.traceCallback(fn[, position[, context[, thisArg[, ...args]]]])`

* `fn` {Function} callback using function to wrap a trace around
* `position` {number} Zero-indexed argument position of expected callback
  (defaults to last argument if `undefined` is passed)
* `context` {Object} Shared object to correlate trace events through (defaults
  to `{}` if `undefined` is passed)
* `thisArg` {any} The receiver to be used for the function call
* `...args` {any} arguments to pass to the function (must include the callback)
* Returns: {any} The return value of the given function

Trace a callback-receiving function call. The callback is expected to follow
the error as first arg convention typically used. This will always produce a
`start` event and `end` event around the synchronous portion of the
function execution, and will produce a `asyncStart` event and
`asyncEnd` event around the callback execution. It may also produce an
`error` event if the given function throws or the first argument passed to
the callback is set. This will run the given function using
`channel.runStores(context, ...)` on the `start` channel which ensures all
events should have any bound stores set to match this trace context.

To ensure only correct trace graphs are formed, events will only be published
if subscribers are present prior to starting the trace. Subscriptions which are
added after the trace begins will not receive future events from that trace,
only future traces will be seen.

```mjs
import diagnostics_channel from 'node:diagnostics_channel';

const channels = diagnostics_channel.tracingChannel('my-channel');

channels.traceCallback((arg1, callback) => {
  // Do something
  callback(null, 'result');
}, 1, {
  some: 'thing',
}, thisArg, arg1, callback);
```

```cjs
const diagnostics_channel = require('node:diagnostics_channel');

const channels = diagnostics_channel.tracingChannel('my-channel');

channels.traceCallback((arg1, callback) => {
  // Do something
  callback(null, 'result');
}, 1, {
  some: 'thing',
}, thisArg, arg1, callback);
```

The callback will also be run with `channel.runStores(context, ...)` which
enables context loss recovery in some cases.

```mjs
import diagnostics_channel from 'node:diagnostics_channel';
import { AsyncLocalStorage } from 'node:async_hooks';

const channels = diagnostics_channel.tracingChannel('my-channel');
const myStore = new AsyncLocalStorage();

// The start channel sets the initial store data to something
// and stores that store data value on the trace context object
channels.start.bindStore(myStore, (data) => {
  const span = new Span(data);
  data.span = span;
  return span;
});

// Then asyncStart can restore from that data it stored previously
channels.asyncStart.bindStore(myStore, (data) => {
  return data.span;
});
```

```cjs
const diagnostics_channel = require('node:diagnostics_channel');
const { AsyncLocalStorage } = require('node:async_hooks');

const channels = diagnostics_channel.tracingChannel('my-channel');
const myStore = new AsyncLocalStorage();

// The start channel sets the initial store data to something
// and stores that store data value on the trace context object
channels.start.bindStore(myStore, (data) => {
  const span = new Span(data);
  data.span = span;
  return span;
});

// Then asyncStart can restore from that data it stored previously
channels.asyncStart.bindStore(myStore, (data) => {
  return data.span;
});
```

#### `tracingChannel.hasSubscribers`

* Returns: {boolean} `true` if any of the individual channels has a subscriber,
  `false` if not.

This is a helper method available on a `TracingChannel` instance to check if
any of the TracingChannel Channels have subscribers. A `true` is returned if
any of them have at least one subscriber, a `false` is returned otherwise.

```mjs
import diagnostics_channel from 'node:diagnostics_channel';

const channels = diagnostics_channel.tracingChannel('my-channel');

if (channels.hasSubscribers) {
  // Do something
}
```

```cjs
const diagnostics_channel = require('node:diagnostics_channel');

const channels = diagnostics_channel.tracingChannel('my-channel');

if (channels.hasSubscribers) {
  // Do something
}
```
