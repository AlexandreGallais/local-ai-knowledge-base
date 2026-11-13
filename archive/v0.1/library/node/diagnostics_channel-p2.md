---
title: "Diagnostics Channel (part 2 of 6)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/diagnostics_channel.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Diagnostics Channel (part 2 of 6)

## Public API

### Overview

Following is a simple overview of the public API.

```mjs
import diagnostics_channel from 'node:diagnostics_channel';

// Get a reusable channel object
const channel = diagnostics_channel.channel('my-channel');

function onMessage(message, name) {
  // Received data
}

// Subscribe to the channel
diagnostics_channel.subscribe('my-channel', onMessage);

// Check if the channel has an active subscriber
if (channel.hasSubscribers) {
  // Publish data to the channel
  channel.publish({
    some: 'data',
  });
}

// Unsubscribe from the channel
diagnostics_channel.unsubscribe('my-channel', onMessage);
```

```cjs
const diagnostics_channel = require('node:diagnostics_channel');

// Get a reusable channel object
const channel = diagnostics_channel.channel('my-channel');

function onMessage(message, name) {
  // Received data
}

// Subscribe to the channel
diagnostics_channel.subscribe('my-channel', onMessage);

// Check if the channel has an active subscriber
if (channel.hasSubscribers) {
  // Publish data to the channel
  channel.publish({
    some: 'data',
  });
}

// Unsubscribe from the channel
diagnostics_channel.unsubscribe('my-channel', onMessage);
```

#### `diagnostics_channel.hasSubscribers(name)`

* `name` {string|symbol} The channel name
* Returns: {boolean} If there are active subscribers

Check if there are active subscribers to the named channel. This is helpful if
the message you want to send might be expensive to prepare.

This API is optional but helpful when trying to publish messages from very
performance-sensitive code.

```mjs
import diagnostics_channel from 'node:diagnostics_channel';

if (diagnostics_channel.hasSubscribers('my-channel')) {
  // There are subscribers, prepare and publish message
}
```

```cjs
const diagnostics_channel = require('node:diagnostics_channel');

if (diagnostics_channel.hasSubscribers('my-channel')) {
  // There are subscribers, prepare and publish message
}
```

#### `diagnostics_channel.channel(name)`

* `name` {string|symbol} The channel name
* Returns: {Channel} The named channel object

This is the primary entry-point for anyone wanting to publish to a named
channel. It produces a channel object which is optimized to reduce overhead at
publish time as much as possible.

```mjs
import diagnostics_channel from 'node:diagnostics_channel';

const channel = diagnostics_channel.channel('my-channel');
```

```cjs
const diagnostics_channel = require('node:diagnostics_channel');

const channel = diagnostics_channel.channel('my-channel');
```

#### `diagnostics_channel.subscribe(name, onMessage)`

* `name` {string|symbol} The channel name
* `onMessage` {Function} The handler to receive channel messages
  * `message` {any} The message data
  * `name` {string|symbol} The name of the channel

Register a message handler to subscribe to this channel. This message handler
will be run synchronously whenever a message is published to the channel. Any
errors thrown in the message handler will trigger an `'uncaughtException'`.

```mjs
import diagnostics_channel from 'node:diagnostics_channel';

diagnostics_channel.subscribe('my-channel', (message, name) => {
  // Received data
});
```

```cjs
const diagnostics_channel = require('node:diagnostics_channel');

diagnostics_channel.subscribe('my-channel', (message, name) => {
  // Received data
});
```

#### `diagnostics_channel.unsubscribe(name, onMessage)`

* `name` {string|symbol} The channel name
* `onMessage` {Function} The previous subscribed handler to remove
* Returns: {boolean} `true` if the handler was found, `false` otherwise.

Remove a message handler previously registered to this channel with
`diagnostics_channel.subscribe(name, onMessage)`.

```mjs
import diagnostics_channel from 'node:diagnostics_channel';

function onMessage(message, name) {
  // Received data
}

diagnostics_channel.subscribe('my-channel', onMessage);

diagnostics_channel.unsubscribe('my-channel', onMessage);
```

```cjs
const diagnostics_channel = require('node:diagnostics_channel');

function onMessage(message, name) {
  // Received data
}

diagnostics_channel.subscribe('my-channel', onMessage);

diagnostics_channel.unsubscribe('my-channel', onMessage);
```

#### `diagnostics_channel.tracingChannel(nameOrChannels)`

> Stability: 2 - Stable

* `nameOrChannels` {string|TracingChannel} Channel name or
  object containing all the TracingChannel Channels
* Returns: {TracingChannel} Collection of channels to trace with

Creates a `TracingChannel` wrapper for the given
TracingChannel Channels. If a name is given, the corresponding tracing
channels will be created in the form of `tracing:${name}:${eventType}` where
`eventType` corresponds to the types of TracingChannel Channels.

```mjs
import diagnostics_channel from 'node:diagnostics_channel';

const channelsByName = diagnostics_channel.tracingChannel('my-channel');

// or...

const channelsByCollection = diagnostics_channel.tracingChannel({
  start: diagnostics_channel.channel('tracing:my-channel:start'),
  end: diagnostics_channel.channel('tracing:my-channel:end'),
  asyncStart: diagnostics_channel.channel('tracing:my-channel:asyncStart'),
  asyncEnd: diagnostics_channel.channel('tracing:my-channel:asyncEnd'),
  error: diagnostics_channel.channel('tracing:my-channel:error'),
});
```

```cjs
const diagnostics_channel = require('node:diagnostics_channel');

const channelsByName = diagnostics_channel.tracingChannel('my-channel');

// or...

const channelsByCollection = diagnostics_channel.tracingChannel({
  start: diagnostics_channel.channel('tracing:my-channel:start'),
  end: diagnostics_channel.channel('tracing:my-channel:end'),
  asyncStart: diagnostics_channel.channel('tracing:my-channel:asyncStart'),
  asyncEnd: diagnostics_channel.channel('tracing:my-channel:asyncEnd'),
  error: diagnostics_channel.channel('tracing:my-channel:error'),
});
```

#### `diagnostics_channel.boundedChannel(nameOrChannels)`

> Stability: 1 - Experimental

* `nameOrChannels` {string|BoundedChannel} Channel name or
  object containing all the BoundedChannel Channels
* Returns: {BoundedChannel} Collection of channels to trace with

Creates a `BoundedChannel` wrapper for the given channels. If a name is
given, the corresponding channels will be created in the form of
`tracing:${name}:${eventType}` where `eventType` is `start` or `end`.

A `BoundedChannel` is a simplified version of `TracingChannel` that only
traces synchronous operations. It only has `start` and `end` events, without
`asyncStart`, `asyncEnd`, or `error` events, making it suitable for tracing
operations that don't involve asynchronous continuations or error handling.

```mjs
import { boundedChannel, channel } from 'node:diagnostics_channel';

const wc = boundedChannel('my-operation');

// or...

const wc2 = boundedChannel({
  start: channel('tracing:my-operation:start'),
  end: channel('tracing:my-operation:end'),
});
```

```cjs
const { boundedChannel, channel } = require('node:diagnostics_channel');

const wc = boundedChannel('my-operation');

// or...

const wc2 = boundedChannel({
  start: channel('tracing:my-operation:start'),
  end: channel('tracing:my-operation:end'),
});
```
