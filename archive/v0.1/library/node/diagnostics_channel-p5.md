---
title: "Diagnostics Channel (part 5 of 6)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/diagnostics_channel.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Diagnostics Channel (part 5 of 6)

### Class: `BoundedChannel`

> Stability: 1 - Experimental

The class `BoundedChannel` is a simplified version of `TracingChannel` that
only traces synchronous operations. It consists of two channels (`start` and
`end`) instead of five, omitting the `asyncStart`, `asyncEnd`, and `error`
events. This makes it suitable for tracing operations that don't involve
asynchronous continuations or error handling.

Like `TracingChannel`, it is recommended to create and reuse a single
`BoundedChannel` at the top-level of the file rather than creating them
dynamically.

#### `boundedChannel.hasSubscribers`

* Returns: {boolean} `true` if any of the individual channels has a subscriber,
  `false` if not.

Check if any of the `start` or `end` channels have subscribers.

```mjs
import { boundedChannel } from 'node:diagnostics_channel';

const wc = boundedChannel('my-operation');

if (wc.hasSubscribers) {
  // There are subscribers, perform traced operation
}
```

```cjs
const { boundedChannel } = require('node:diagnostics_channel');

const wc = boundedChannel('my-operation');

if (wc.hasSubscribers) {
  // There are subscribers, perform traced operation
}
```

#### `boundedChannel.subscribe(handlers)`

* `handlers` {Object} Set of channel subscribers
  * `start` {Function} The start event subscriber
  * `end` {Function} The end event subscriber

Subscribe to the bounded channel events. This is equivalent to calling
`channel.subscribe(onMessage)` on each channel individually.

```mjs
import { boundedChannel } from 'node:diagnostics_channel';

const wc = boundedChannel('my-operation');

wc.subscribe({
  start(message) {
    // Handle start
  },
  end(message) {
    // Handle end
  },
});
```

```cjs
const { boundedChannel } = require('node:diagnostics_channel');

const wc = boundedChannel('my-operation');

wc.subscribe({
  start(message) {
    // Handle start
  },
  end(message) {
    // Handle end
  },
});
```

#### `boundedChannel.unsubscribe(handlers)`

* `handlers` {Object} Set of channel subscribers
  * `start` {Function} The start event subscriber
  * `end` {Function} The end event subscriber
* Returns: {boolean} `true` if all handlers were successfully unsubscribed,
  `false` otherwise.

Unsubscribe from the bounded channel events. This is equivalent to calling
`channel.unsubscribe(onMessage)` on each channel individually.

```mjs
import { boundedChannel } from 'node:diagnostics_channel';

const wc = boundedChannel('my-operation');

const handlers = {
  start(message) {},
  end(message) {},
};

wc.subscribe(handlers);
wc.unsubscribe(handlers);
```

```cjs
const { boundedChannel } = require('node:diagnostics_channel');

const wc = boundedChannel('my-operation');

const handlers = {
  start(message) {},
  end(message) {},
};

wc.subscribe(handlers);
wc.unsubscribe(handlers);
```

#### `boundedChannel.run(context, fn[, thisArg[, ...args]])`

* `context` {Object} Shared object to correlate events through
* `fn` {Function} Function to wrap a trace around
* `thisArg` {any} The receiver to be used for the function call
* `...args` {any} Optional arguments to pass to the function
* Returns: {any} The return value of the given function

Trace a synchronous function call. This will produce a `start` event and `end`
event around the execution. This runs the given function using
`channel.runStores(context, ...)` on the `start` channel which ensures all
events have any bound stores set to match this trace context.

```mjs
import { boundedChannel } from 'node:diagnostics_channel';

const wc = boundedChannel('my-operation');

const result = wc.run({ operationId: '123' }, () => {
  // Perform operation
  return 42;
});
```

```cjs
const { boundedChannel } = require('node:diagnostics_channel');

const wc = boundedChannel('my-operation');

const result = wc.run({ operationId: '123' }, () => {
  // Perform operation
  return 42;
});
```

#### `boundedChannel.withScope([context])`

* `context` {Object} Shared object to correlate events through
* Returns: {BoundedChannelScope} Disposable scope object

Create a disposable scope for tracing a synchronous operation using JavaScript's
explicit resource management (`using` syntax). The scope automatically publishes
`start` and `end` events, enters bound stores, and handles cleanup when disposed.

```mjs
import { boundedChannel } from 'node:diagnostics_channel';

const wc = boundedChannel('my-operation');

const context = { operationId: '123' };
{
  using scope = wc.withScope(context);
  // Stores are entered, start event is published

  // Perform work and set result on context
  context.result = 42;
}
// End event is published, stores are restored automatically
```

```cjs
const { boundedChannel } = require('node:diagnostics_channel');

const wc = boundedChannel('my-operation');

const context = { operationId: '123' };
{
  using scope = wc.withScope(context);
  // Stores are entered, start event is published

  // Perform work and set result on context
  context.result = 42;
}
// End event is published, stores are restored automatically
```

### Class: `BoundedChannelScope`

> Stability: 1 - Experimental

The class `BoundedChannelScope` represents a disposable scope created by
`boundedChannel.withScope(context)`. It manages the lifecycle of a traced
operation, automatically publishing events and managing store contexts.

The scope must be used with the `using` syntax to ensure proper disposal.

```mjs
import { boundedChannel } from 'node:diagnostics_channel';

const wc = boundedChannel('my-operation');

const context = {};
{
  using scope = wc.withScope(context);
  // Start event is published, stores are entered
  context.result = performOperation();
  // End event is automatically published at end of block
}
```

```cjs
const { boundedChannel } = require('node:diagnostics_channel');

const wc = boundedChannel('my-operation');

const context = {};
{
  using scope = wc.withScope(context);
  // Start event is published, stores are entered
  context.result = performOperation();
  // End event is automatically published at end of block
}
```

### BoundedChannel Channels

A `BoundedChannel` consists of two diagnostics channels representing the
lifecycle of a scope created with the `using` syntax:

* `tracing:${name}:start` - Published when the `using` statement executes (scope creation)
* `tracing:${name}:end` - Published when exiting the block (scope disposal)

When using the `using` syntax with \[`boundedChannel.withScope([context])`]\[], the `start`
event is published immediately when the statement executes, and the `end` event
is automatically published when disposal occurs at the end of the block. All
events share the same context object, which can be extended with additional
properties like `result` during scope execution.

### TracingChannel Channels

A TracingChannel is a collection of several diagnostics\_channels representing
specific points in the execution lifecycle of a single traceable action. The
behavior is split into five diagnostics\_channels consisting of `start`,
`end`, `asyncStart`, `asyncEnd`, and `error`. A single traceable action will
share the same event object between all events, this can be helpful for
managing correlation through a weakmap.

These event objects will be extended with `result` or `error` values when
the task "completes". In the case of a synchronous task the `result` will be
the return value and the `error` will be anything thrown from the function.
With callback-based async functions the `result` will be the second argument
of the callback while the `error` will either be a thrown error visible in the
`end` event or the first callback argument in either of the `asyncStart` or
`asyncEnd` events.

To ensure only correct trace graphs are formed, events should only be published
if subscribers are present prior to starting the trace. Subscriptions which are
added after the trace begins should not receive future events from that trace,
only future traces will be seen.

Tracing channels should follow a naming pattern of:

* `tracing:module.class.method:start` or `tracing:module.function:start`
* `tracing:module.class.method:end` or `tracing:module.function:end`
* `tracing:module.class.method:asyncStart` or `tracing:module.function:asyncStart`
* `tracing:module.class.method:asyncEnd` or `tracing:module.function:asyncEnd`
* `tracing:module.class.method:error` or `tracing:module.function:error`

#### `start(event)`

* Name: `tracing:${name}:start`

The `start` event represents the point at which a function is called. At this
point the event data may contain function arguments or anything else available
at the very start of the execution of the function.

#### `end(event)`

* Name: `tracing:${name}:end`

The `end` event represents the point at which a function call returns a value.
In the case of an async function this is when the promise returned not when the
function itself makes a return statement internally. At this point, if the
traced function was synchronous the `result` field will be set to the return
value of the function. Alternatively, the `error` field may be present to
represent any thrown errors.

It is recommended to listen specifically to the `error` event to track errors
as it may be possible for a traceable action to produce multiple errors. For
example, an async task which fails may be started internally before the sync
part of the task then throws an error.

#### `asyncStart(event)`

* Name: `tracing:${name}:asyncStart`

The `asyncStart` event represents the callback or continuation of a traceable
function being reached. At this point things like callback arguments may be
available, or anything else expressing the "result" of the action.

For callbacks-based functions, the first argument of the callback will be
assigned to the `error` field, if not `undefined` or `null`, and the second
argument will be assigned to the `result` field.

For promises, the argument to the `resolve` path will be assigned to `result`
or the argument to the `reject` path will be assign to `error`.

It is recommended to listen specifically to the `error` event to track errors
as it may be possible for a traceable action to produce multiple errors. For
example, an async task which fails may be started internally before the sync
part of the task then throws an error.

#### `asyncEnd(event)`

* Name: `tracing:${name}:asyncEnd`

The `asyncEnd` event represents the callback of an asynchronous function
returning. It's not likely event data will change after the `asyncStart` event,
however it may be useful to see the point where the callback completes.

#### `error(event)`

* Name: `tracing:${name}:error`

The `error` event represents any error produced by the traceable function
either synchronously or asynchronously. If an error is thrown in the
synchronous portion of the traced function the error will be assigned to the
`error` field of the event and the `error` event will be triggered. If an error
is received asynchronously through a callback or promise rejection it will also
be assigned to the `error` field of the event and trigger the `error` event.

It is possible for a single traceable function call to produce errors multiple
times so this should be considered when consuming this event. For example, if
another async task is triggered internally which fails and then the sync part
of the function then throws and error two `error` events will be emitted, one
for the sync error and one for the async error.
