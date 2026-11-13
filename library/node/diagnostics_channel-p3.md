---
title: "Diagnostics Channel (part 3 of 6)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/diagnostics_channel.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Diagnostics Channel (part 3 of 6)

### Class: `Channel`

The class `Channel` represents an individual named channel within the data
pipeline. It is used to track subscribers and to publish messages when there
are subscribers present. It exists as a separate object to avoid channel
lookups at publish time, enabling very fast publish speeds and allowing
for heavy use while incurring very minimal cost. Channels are created with
`diagnostics_channel.channel(name)`, constructing a channel directly
with `new Channel(name)` is not supported.

#### `channel.hasSubscribers`

* Returns: {boolean} If there are active subscribers

Check if there are active subscribers to this channel. This is helpful if
the message you want to send might be expensive to prepare.

This API is optional but helpful when trying to publish messages from very
performance-sensitive code.

```mjs
import diagnostics_channel from 'node:diagnostics_channel';

const channel = diagnostics_channel.channel('my-channel');

if (channel.hasSubscribers) {
  // There are subscribers, prepare and publish message
}
```

```cjs
const diagnostics_channel = require('node:diagnostics_channel');

const channel = diagnostics_channel.channel('my-channel');

if (channel.hasSubscribers) {
  // There are subscribers, prepare and publish message
}
```

#### `channel.publish(message)`

* `message` {any} The message to send to the channel subscribers

Publish a message to any subscribers to the channel. This will trigger
message handlers synchronously so they will execute within the same context.

```mjs
import diagnostics_channel from 'node:diagnostics_channel';

const channel = diagnostics_channel.channel('my-channel');

channel.publish({
  some: 'message',
});
```

```cjs
const diagnostics_channel = require('node:diagnostics_channel');

const channel = diagnostics_channel.channel('my-channel');

channel.publish({
  some: 'message',
});
```

#### `channel.subscribe(onMessage)`

* `onMessage` {Function} The handler to receive channel messages
  * `message` {any} The message data
  * `name` {string|symbol} The name of the channel

Register a message handler to subscribe to this channel. This message handler
will be run synchronously whenever a message is published to the channel. Any
errors thrown in the message handler will trigger an `'uncaughtException'`.

```mjs
import diagnostics_channel from 'node:diagnostics_channel';

const channel = diagnostics_channel.channel('my-channel');

channel.subscribe((message, name) => {
  // Received data
});
```

```cjs
const diagnostics_channel = require('node:diagnostics_channel');

const channel = diagnostics_channel.channel('my-channel');

channel.subscribe((message, name) => {
  // Received data
});
```

#### `channel.unsubscribe(onMessage)`

* `onMessage` {Function} The previous subscribed handler to remove
* Returns: {boolean} `true` if the handler was found, `false` otherwise.

Remove a message handler previously registered to this channel with
`channel.subscribe(onMessage)`.

```mjs
import diagnostics_channel from 'node:diagnostics_channel';

const channel = diagnostics_channel.channel('my-channel');

function onMessage(message, name) {
  // Received data
}

channel.subscribe(onMessage);

channel.unsubscribe(onMessage);
```

```cjs
const diagnostics_channel = require('node:diagnostics_channel');

const channel = diagnostics_channel.channel('my-channel');

function onMessage(message, name) {
  // Received data
}

channel.subscribe(onMessage);

channel.unsubscribe(onMessage);
```

#### `channel.bindStore(store[, transform])`

> Stability: 1 - Experimental

* `store` {AsyncLocalStorage} The store to which to bind the context data
* `transform` {Function} Transform context data before setting the store context

When `channel.runStores(context, ...)` is called, the given context data
will be applied to any store bound to the channel. If the store has already been
bound the previous `transform` function will be replaced with the new one.
The `transform` function may be omitted to set the given context data as the
context directly.

```mjs
import diagnostics_channel from 'node:diagnostics_channel';
import { AsyncLocalStorage } from 'node:async_hooks';

const store = new AsyncLocalStorage();

const channel = diagnostics_channel.channel('my-channel');

channel.bindStore(store, (data) => {
  return { data };
});
```

```cjs
const diagnostics_channel = require('node:diagnostics_channel');
const { AsyncLocalStorage } = require('node:async_hooks');

const store = new AsyncLocalStorage();

const channel = diagnostics_channel.channel('my-channel');

channel.bindStore(store, (data) => {
  return { data };
});
```

#### `channel.unbindStore(store)`

> Stability: 1 - Experimental

* `store` {AsyncLocalStorage} The store to unbind from the channel.
* Returns: {boolean} `true` if the store was found, `false` otherwise.

Remove a message handler previously registered to this channel with
`channel.bindStore(store)`.

```mjs
import diagnostics_channel from 'node:diagnostics_channel';
import { AsyncLocalStorage } from 'node:async_hooks';

const store = new AsyncLocalStorage();

const channel = diagnostics_channel.channel('my-channel');

channel.bindStore(store);
channel.unbindStore(store);
```

```cjs
const diagnostics_channel = require('node:diagnostics_channel');
const { AsyncLocalStorage } = require('node:async_hooks');

const store = new AsyncLocalStorage();

const channel = diagnostics_channel.channel('my-channel');

channel.bindStore(store);
channel.unbindStore(store);
```

#### `channel.runStores(context, fn[, thisArg[, ...args]])`

> Stability: 1 - Experimental

* `context` {any} Message to send to subscribers and bind to stores
* `fn` {Function} Handler to run within the entered storage context
* `thisArg` {any} The receiver to be used for the function call.
* `...args` {any} Optional arguments to pass to the function.

Applies the given data to any AsyncLocalStorage instances bound to the channel
for the duration of the given function, then publishes to the channel within
the scope of that data is applied to the stores.

If a transform function was given to `channel.bindStore(store)` it will be
applied to transform the message data before it becomes the context value for
the store. The prior storage context is accessible from within the transform
function in cases where context linking is required.

The context applied to the store should be accessible in any async code which
continues from execution which began during the given function, however
there are some situations in which context loss may occur.

```mjs
import diagnostics_channel from 'node:diagnostics_channel';
import { AsyncLocalStorage } from 'node:async_hooks';

const store = new AsyncLocalStorage();

const channel = diagnostics_channel.channel('my-channel');

channel.bindStore(store, (message) => {
  const parent = store.getStore();
  return new Span(message, parent);
});
channel.runStores({ some: 'message' }, () => {
  store.getStore(); // Span({ some: 'message' })
});
```

```cjs
const diagnostics_channel = require('node:diagnostics_channel');
const { AsyncLocalStorage } = require('node:async_hooks');

const store = new AsyncLocalStorage();

const channel = diagnostics_channel.channel('my-channel');

channel.bindStore(store, (message) => {
  const parent = store.getStore();
  return new Span(message, parent);
});
channel.runStores({ some: 'message' }, () => {
  store.getStore(); // Span({ some: 'message' })
});
```

#### `channel.withStoreScope(data)`

> Stability: 1 - Experimental

* `data` {any} Message to bind to stores
* Returns: {RunStoresScope} Disposable scope object

Creates a disposable scope that binds the given data to any AsyncLocalStorage
instances bound to the channel and publishes it to subscribers. The scope
automatically restores the previous storage contexts when disposed.

This method enables the use of JavaScript's explicit resource management
(`using` syntax with `Symbol.dispose`) to manage store contexts without
closure wrapping.

```mjs
import { channel } from 'node:diagnostics_channel';
import { AsyncLocalStorage } from 'node:async_hooks';

const store = new AsyncLocalStorage();
const ch = channel('my-channel');

ch.bindStore(store, (message) => {
  return { ...message, timestamp: Date.now() };
});

{
  using scope = ch.withStoreScope({ request: 'data' });
  // Store is entered, data is published
  console.log(store.getStore()); // { request: 'data', timestamp: ... }
}
// Store is automatically restored on scope exit
```

```cjs
const { channel } = require('node:diagnostics_channel');
const { AsyncLocalStorage } = require('node:async_hooks');

const store = new AsyncLocalStorage();
const ch = channel('my-channel');

ch.bindStore(store, (message) => {
  return { ...message, timestamp: Date.now() };
});

{
  using scope = ch.withStoreScope({ request: 'data' });
  // Store is entered, data is published
  console.log(store.getStore()); // { request: 'data', timestamp: ... }
}
// Store is automatically restored on scope exit
```

### Class: `RunStoresScope`

> Stability: 1 - Experimental

The class `RunStoresScope` represents a disposable scope created by
`channel.withStoreScope(data)`. It manages the lifecycle of store
contexts and ensures they are properly restored when the scope exits.

The scope must be used with the `using` syntax to ensure proper disposal.
