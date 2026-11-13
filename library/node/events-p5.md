---
title: "Events (part 5 of 5)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/events.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Events (part 5 of 5)

## `EventTarget` and `Event` API

The `EventTarget` and `Event` objects are a Node.js-specific implementation
of the `EventTarget` Web API that are exposed by some Node.js core APIs.

```js
const target = new EventTarget();

target.addEventListener('foo', (event) => {
  console.log('foo event happened!');
});
```

### Node.js `EventTarget` vs. DOM `EventTarget`

There are two key differences between the Node.js `EventTarget` and the
`EventTarget` Web API:

1. Whereas DOM `EventTarget` instances _may_ be hierarchical, there is no
   concept of hierarchy and event propagation in Node.js. That is, an event
   dispatched to an `EventTarget` does not propagate through a hierarchy of
   nested target objects that may each have their own set of handlers for the
   event.
2. In the Node.js `EventTarget`, if an event listener is an async function
   or returns a `Promise`, and the returned `Promise` rejects, the rejection
   is automatically captured and handled the same way as a listener that
   throws synchronously (see `EventTarget` error handling for details).

### `NodeEventTarget` vs. `EventEmitter`

The `NodeEventTarget` object implements a modified subset of the
`EventEmitter` API that allows it to closely _emulate_ an `EventEmitter` in
certain situations. A `NodeEventTarget` is _not_ an instance of `EventEmitter`
and cannot be used in place of an `EventEmitter` in most cases.

1. Unlike `EventEmitter`, any given `listener` can be registered at most once
   per event `type`. Attempts to register a `listener` multiple times are
   ignored.
2. The `NodeEventTarget` does not emulate the full `EventEmitter` API.
   Specifically the `prependListener()`, `prependOnceListener()`,
   `rawListeners()`, and `errorMonitor` APIs are not emulated.
   The `'newListener'` and `'removeListener'` events will also not be emitted.
3. The `NodeEventTarget` does not implement any special default behavior
   for events with type `'error'`.
4. The `NodeEventTarget` supports `EventListener` objects as well as
   functions as handlers for all event types.

### Event listener

Event listeners registered for an event `type` may either be JavaScript
functions or objects with a `handleEvent` property whose value is a function.

In either case, the handler function is invoked with the `event` argument
passed to the `eventTarget.dispatchEvent()` function.

Async functions may be used as event listeners. If an async handler function
rejects, the rejection is captured and handled as described in
`EventTarget` error handling.

An error thrown by one handler function does not prevent the other handlers
from being invoked.

The return value of a handler function is ignored.

Handlers are always invoked in the order they were added.

Handler functions may mutate the `event` object.

```js
function handler1(event) {
  console.log(event.type);  // Prints 'foo'
  event.a = 1;
}

async function handler2(event) {
  console.log(event.type);  // Prints 'foo'
  console.log(event.a);  // Prints 1
}

const handler3 = {
  handleEvent(event) {
    console.log(event.type);  // Prints 'foo'
  },
};

const handler4 = {
  async handleEvent(event) {
    console.log(event.type);  // Prints 'foo'
  },
};

const target = new EventTarget();

target.addEventListener('foo', handler1);
target.addEventListener('foo', handler2);
target.addEventListener('foo', handler3);
target.addEventListener('foo', handler4, { once: true });
```

### `EventTarget` error handling

When a registered event listener throws (or returns a Promise that rejects),
by default the error is treated as an uncaught exception on
`process.nextTick()`. This means uncaught exceptions in `EventTarget`s will
terminate the Node.js process by default.

Throwing within an event listener will _not_ stop the other registered handlers
from being invoked.

The `EventTarget` does not implement any special default handling for `'error'`
type events like `EventEmitter`.

Currently errors are first forwarded to the `process.on('error')` event
before reaching `process.on('uncaughtException')`. This behavior is
deprecated and will change in a future release to align `EventTarget` with
other Node.js APIs. Any code relying on the `process.on('error')` event should
be aligned with the new behavior.

### Class: `Event`

The `Event` object is an adaptation of the `Event` Web API. Instances
are created internally by Node.js.

#### `event.bubbles`

* Type: {boolean} Always returns `false`.

This is not used in Node.js and is provided purely for completeness.

#### `event.cancelBubble`

> Stability: 3 - Legacy: Use `event.stopPropagation()` instead.

* Type: {boolean}

Alias for `event.stopPropagation()` if set to `true`. This is not used
in Node.js and is provided purely for completeness.

#### `event.cancelable`

* Type: {boolean} True if the event was created with the `cancelable` option.

#### `event.composed`

* Type: {boolean} Always returns `false`.

This is not used in Node.js and is provided purely for completeness.

#### `event.composedPath()`

Returns an array containing the current `EventTarget` as the only entry or
empty if the event is not being dispatched. This is not used in
Node.js and is provided purely for completeness.

#### `event.currentTarget`

* Type: {EventTarget} The `EventTarget` dispatching the event.

Alias for `event.target`.

#### `event.defaultPrevented`

* Type: {boolean}

Is `true` if `cancelable` is `true` and `event.preventDefault()` has been
called.

#### `event.eventPhase`

* Type: {number} Returns `0` while an event is not being dispatched, `2` while
  it is being dispatched.

This is not used in Node.js and is provided purely for completeness.

#### `event.initEvent(type[, bubbles[, cancelable]])`

> Stability: 3 - Legacy: The WHATWG spec considers it deprecated and users
> shouldn't use it at all.

* `type` {string}
* `bubbles` {boolean}
* `cancelable` {boolean}

Redundant with event constructors and incapable of setting `composed`.
This is not used in Node.js and is provided purely for completeness.

#### `event.isTrusted`

* Type: {boolean}

The {AbortSignal} `"abort"` event is emitted with `isTrusted` set to `true`. The
value is `false` in all other cases.

#### `event.preventDefault()`

Sets the `defaultPrevented` property to `true` if `cancelable` is `true`.

#### `event.returnValue`

> Stability: 3 - Legacy: Use `event.defaultPrevented` instead.

* Type: {boolean} True if the event has not been canceled.

The value of `event.returnValue` is always the opposite of `event.defaultPrevented`.
This is not used in Node.js and is provided purely for completeness.

#### `event.srcElement`

> Stability: 3 - Legacy: Use `event.target` instead.

* Type: {EventTarget} The `EventTarget` dispatching the event.

Alias for `event.target`.

#### `event.stopImmediatePropagation()`

Stops the invocation of event listeners after the current one completes.

#### `event.stopPropagation()`

This is not used in Node.js and is provided purely for completeness.

#### `event.target`

* Type: {EventTarget} The `EventTarget` dispatching the event.

#### `event.timeStamp`

* Type: {number}

The millisecond timestamp when the `Event` object was created.

#### `event.type`

* Type: {string}

The event type identifier.

### Class: `EventTarget`

#### `eventTarget.addEventListener(type, listener[, options])`

* `type` {string}
* `listener` {Function|EventListener}
* `options` {Object}
  * `once` {boolean} When `true`, the listener is automatically removed
    when it is first invoked. **Default:** `false`.
  * `passive` {boolean} When `true`, serves as a hint that the listener will
    not call the `Event` object's `preventDefault()` method.
    **Default:** `false`.
  * `capture` {boolean} Not directly used by Node.js. Added for API
    completeness. **Default:** `false`.
  * `signal` {AbortSignal} The listener will be removed when the given
    AbortSignal object's `abort()` method is called.

Adds a new handler for the `type` event. Any given `listener` is added
only once per `type` and per `capture` option value.

If the `once` option is `true`, the `listener` is removed after the
next time a `type` event is dispatched.

The `capture` option is not used by Node.js in any functional way other than
tracking registered event listeners per the `EventTarget` specification.
Specifically, the `capture` option is used as part of the key when registering
a `listener`. Any individual `listener` may be added once with
`capture = false`, and once with `capture = true`.

```js
function handler(event) {}

const target = new EventTarget();
target.addEventListener('foo', handler, { capture: true });  // first
target.addEventListener('foo', handler, { capture: false }); // second

// Removes the second instance of handler
target.removeEventListener('foo', handler);

// Removes the first instance of handler
target.removeEventListener('foo', handler, { capture: true });
```

#### `eventTarget.dispatchEvent(event)`

* `event` {Event}
* Returns: {boolean} `true` if either event's `cancelable` attribute value is
  false or its `preventDefault()` method was not invoked, otherwise `false`.

Dispatches the `event` to the list of handlers for `event.type`.

The registered event listeners is synchronously invoked in the order they
were registered.

#### `eventTarget.removeEventListener(type, listener[, options])`

* `type` {string}
* `listener` {Function|EventListener}
* `options` {Object}
  * `capture` {boolean}

Removes the `listener` from the list of handlers for event `type`.

### Class: `CustomEvent`

* Extends: {Event}

The `CustomEvent` object is an adaptation of the `CustomEvent` Web API.
Instances are created internally by Node.js.

#### `event.detail`

* Type: {any} Returns custom data passed when initializing.

Read-only.

### Class: `NodeEventTarget`

* Extends: {EventTarget}

The `NodeEventTarget` is a Node.js-specific extension to `EventTarget`
that emulates a subset of the `EventEmitter` API.

#### `nodeEventTarget.addListener(type, listener)`

* `type` {string}

* `listener` {Function|EventListener}

* Returns: {EventTarget} this

Node.js-specific extension to the `EventTarget` class that emulates the
equivalent `EventEmitter` API. The only difference between `addListener()` and
`addEventListener()` is that `addListener()` will return a reference to the
`EventTarget`.

#### `nodeEventTarget.emit(type, arg)`

* `type` {string}
* `arg` {any}
* Returns: {boolean} `true` if event listeners registered for the `type` exist,
  otherwise `false`.

Node.js-specific extension to the `EventTarget` class that dispatches the
`arg` to the list of handlers for `type`.

#### `nodeEventTarget.eventNames()`

* Returns: {string\[]}

Node.js-specific extension to the `EventTarget` class that returns an array
of event `type` names for which event listeners are registered.

#### `nodeEventTarget.listenerCount(type)`

* `type` {string}

* Returns: {number}

Node.js-specific extension to the `EventTarget` class that returns the number
of event listeners registered for the `type`.

#### `nodeEventTarget.setMaxListeners(n)`

* `n` {number}

Node.js-specific extension to the `EventTarget` class that sets the number
of max event listeners as `n`.

#### `nodeEventTarget.getMaxListeners()`

* Returns: {number}

Node.js-specific extension to the `EventTarget` class that returns the number
of max event listeners.

#### `nodeEventTarget.off(type, listener[, options])`

* `type` {string}

* `listener` {Function|EventListener}

* `options` {Object}
  * `capture` {boolean}

* Returns: {EventTarget} this

Node.js-specific alias for `eventTarget.removeEventListener()`.

#### `nodeEventTarget.on(type, listener)`

* `type` {string}

* `listener` {Function|EventListener}

* Returns: {EventTarget} this

Node.js-specific alias for `eventTarget.addEventListener()`.

#### `nodeEventTarget.once(type, listener)`

* `type` {string}

* `listener` {Function|EventListener}

* Returns: {EventTarget} this

Node.js-specific extension to the `EventTarget` class that adds a `once`
listener for the given event `type`. This is equivalent to calling `on`
with the `once` option set to `true`.

#### `nodeEventTarget.removeAllListeners([type])`

* `type` {string}

* Returns: {EventTarget} this

Node.js-specific extension to the `EventTarget` class. If `type` is specified,
removes all registered listeners for `type`, otherwise removes all registered
listeners.

#### `nodeEventTarget.removeListener(type, listener[, options])`

* `type` {string}

* `listener` {Function|EventListener}

* `options` {Object}
  * `capture` {boolean}

* Returns: {EventTarget} this

Node.js-specific extension to the `EventTarget` class that removes the
`listener` for the given `type`. The only difference between `removeListener()`
and `removeEventListener()` is that `removeListener()` will return a reference
to the `EventTarget`.
