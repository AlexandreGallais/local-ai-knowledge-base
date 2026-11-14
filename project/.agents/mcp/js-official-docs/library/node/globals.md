---
title: "Global objects (part 1 of 2)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/globals.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Global objects

> Stability: 2 - Stable

These objects are available in all modules.

The following variables may appear to be global but are not. They exist only in
the scope of CommonJS modules:

* `__dirname`
* `__filename`
* `exports`
* `module`
* `require()`

The objects listed here are specific to Node.js. There are built-in objects
that are part of the JavaScript language itself, which are also globally
accessible.

## `__dirname`

This variable may appear to be global but is not. See `__dirname`.

## `__filename`

This variable may appear to be global but is not. See `__filename`.

## Class: `AbortController`

A utility class used to signal cancelation in selected `Promise`-based APIs.
The API is based on the Web API {AbortController}.

```js
const ac = new AbortController();

ac.signal.addEventListener('abort', () => console.log('Aborted!'),
                           { once: true });

ac.abort();

console.log(ac.signal.aborted);  // Prints true
```

### `abortController.abort([reason])`

* `reason` {any} An optional reason, retrievable on the `AbortSignal`'s
  `reason` property.

Triggers the abort signal, causing the `abortController.signal` to emit
the `'abort'` event.

### `abortController.signal`

* Type: {AbortSignal}

## Class: `AbortSignal`

* Extends: {EventTarget}

The `AbortSignal` is used to notify observers when the
`abortController.abort()` method is called.

### Static method: `AbortSignal.abort([reason])`

* `reason` {any}
* Returns: {AbortSignal}

Returns a new already aborted `AbortSignal`.

### Static method: `AbortSignal.timeout(delay)`

* `delay` {number} The number of milliseconds to wait before triggering
  the AbortSignal.

Returns a new `AbortSignal` which will be aborted in `delay` milliseconds.

### Static method: `AbortSignal.any(signals)`

* `signals` {Iterable} An iterable of {AbortSignal}s from which to compose a new
  {AbortSignal}.

Returns a new `AbortSignal` which will be aborted if any of the provided
signals are aborted. Its `abortSignal.reason` will be set to whichever
one of the `signals` caused it to be aborted.

### Event: `'abort'`

The `'abort'` event is emitted when the `abortController.abort()` method
is called. The callback is invoked with a single object argument with a
single `type` property set to `'abort'`:

```js
const ac = new AbortController();

// Use either the onabort property...
ac.signal.onabort = () => console.log('aborted!');

// Or the EventTarget API...
ac.signal.addEventListener('abort', (event) => {
  console.log(event.type);  // Prints 'abort'
}, { once: true });

ac.abort();
```

The `AbortController` with which the `AbortSignal` is associated will only
ever trigger the `'abort'` event once. We recommended that code check
that the `abortSignal.aborted` attribute is `false` before adding an `'abort'`
event listener.

Any event listeners attached to the `AbortSignal` should use the
`{ once: true }` option (or, if using the `EventEmitter` APIs to attach a
listener, use the `once()` method) to ensure that the event listener is
removed as soon as the `'abort'` event is handled. Failure to do so may
result in memory leaks.

### `abortSignal.aborted`

* Type: {boolean}

True after the `AbortController` has been aborted.

### `abortSignal.onabort`

* Type: {Function}

An optional callback function that may be set by user code to be notified
when the `abortController.abort()` function has been called.

### `abortSignal.reason`

* Type: {any}

An optional reason specified when the `AbortSignal` was triggered.

```js
const ac = new AbortController();
ac.abort(new Error('boom!'));
console.log(ac.signal.reason);  // Error: boom!
```

### `abortSignal.throwIfAborted()`

If `abortSignal.aborted` is `true`, throws `abortSignal.reason`.

## `atob(data)`

> Stability: 3 - Legacy. Use `Buffer.from(data, 'base64')` instead.

Global alias for `buffer.atob()`.

An automated migration is available (source):

```bash
npx codemod@latest @nodejs/buffer-atob-btoa
```

## Class: `Blob`

See {Blob}.

## Class: `BroadcastChannel`

See {BroadcastChannel}.

## `btoa(data)`

> Stability: 3 - Legacy. Use `buf.toString('base64')` instead.

Global alias for `buffer.btoa()`.

An automated migration is available (source):

```bash
npx codemod@latest @nodejs/buffer-atob-btoa
```

## Class: `Buffer`

* Type: {Function}

Used to handle binary data. See the buffer section.

## Class: `ByteLengthQueuingStrategy`

A browser-compatible implementation of `ByteLengthQueuingStrategy`.

## `clearImmediate(immediateObject)`

`clearImmediate` is described in the timers section.

## `clearInterval(intervalObject)`

`clearInterval` is described in the timers section.

## `clearTimeout(timeoutObject)`

`clearTimeout` is described in the timers section.

## Class: `CloseEvent`

A browser-compatible implementation of {CloseEvent}. Disable this API
with the `--no-experimental-websocket` CLI flag.

## Class: `CompressionStream`

A browser-compatible implementation of `CompressionStream`.

## `console`

* Type: {Object}

Used to print to stdout and stderr. See the `console` section.

## Class: `CountQueuingStrategy`

A browser-compatible implementation of `CountQueuingStrategy`.

## Class: `Crypto`

A browser-compatible implementation of {Crypto}. This global is available
only if the Node.js binary was compiled with including support for the
`node:crypto` module.

## `crypto`

A browser-compatible implementation of the Web Crypto API.

## Class: `CryptoKey`

A browser-compatible implementation of {CryptoKey}. This global is available
only if the Node.js binary was compiled with including support for the
`node:crypto` module.

## Class: `CustomEvent`

A browser-compatible implementation of {CustomEvent}.

## Class: `DecompressionStream`

A browser-compatible implementation of `DecompressionStream`.

## Class: `DOMException`

The WHATWG {DOMException} class.

## `ErrorEvent`

A browser-compatible implementation of {ErrorEvent}.

## Class: `Event`

A browser-compatible implementation of the `Event` class. See
`EventTarget` and `Event` API for more details.

## Class: `EventSource`

> Stability: 1 - Experimental. Enable this API with the `--experimental-eventsource`
> CLI flag.

A browser-compatible implementation of {EventSource}.

## Class: `EventTarget`

A browser-compatible implementation of the `EventTarget` class. See
`EventTarget` and `Event` API for more details.

## `exports`

This variable may appear to be global but is not. See `exports`.

## `fetch`

A browser-compatible implementation of the `fetch()` function.

```mjs
const res = await fetch('https://nodejs.org/api/documentation.json');
if (res.ok) {
  const data = await res.json();
  console.log(data);
}
```

The implementation is based upon undici, an HTTP/1.1 client
written from scratch for Node.js. You can figure out which version of `undici` is bundled
in your Node.js process reading the `process.versions.undici` property.

### Custom dispatcher

You can use a custom dispatcher to dispatch requests passing it in fetch's options object.
The dispatcher must be compatible with `undici`'s
`Dispatcher` class.

```js
fetch(url, { dispatcher: new MyAgent() });
```

It is possible to change the global dispatcher in Node.js by installing `undici` and using
the `setGlobalDispatcher()` method. Calling this method will affect both `undici` and
Node.js.

```mjs
import { setGlobalDispatcher } from 'undici';
setGlobalDispatcher(new MyAgent());
```

### Related classes

The following globals are available to use with `fetch`:

* `FormData`
* `Headers`
* `Request`
* `Response`

## Class: `File`

See {File}.

## Class: `FormData`

A browser-compatible implementation of {FormData}.

## `global`

> Stability: 3 - Legacy. Use `globalThis` instead.

* Type: {Object} The global namespace object.

In browsers, the top-level scope has traditionally been the global scope. This
means that `var something` will define a new global variable, except within
ECMAScript modules. In Node.js, this is different. The top-level scope is not
the global scope; `var something` inside a Node.js module will be local to that
module, regardless of whether it is a CommonJS module or an
ECMAScript module.

## Class: `Headers`

A browser-compatible implementation of {Headers}.

## `localStorage`

> Stability: 1.2 - Release candidate. Disable this API with `--no-experimental-webstorage`.

A browser-compatible implementation of `localStorage`. Data is stored
unencrypted in the file specified by the `--localstorage-file` CLI flag.
The maximum amount of data that can be stored is 10 MB.
Any modification of this data outside of the Web Storage API is not supported.
`localStorage` data is not stored per user or per request when used in the context
of a server, it is shared across all users and requests.

## Class: `MessageChannel`

The `MessageChannel` class. See `MessageChannel` for more details.

## Class: `MessageEvent`

A browser-compatible implementation of {MessageEvent}.

## Class: `MessagePort`

The `MessagePort` class. See `MessagePort` for more details.

## `module`

This variable may appear to be global but is not. See `module`.

## Class: `Navigator`

> Stability: 1.1 - Active development. Disable this API with the
> `--no-experimental-global-navigator` CLI flag.

A partial implementation of the Navigator API.

## `navigator`

> Stability: 1.1 - Active development. Disable this API with the
> `--no-experimental-global-navigator` CLI flag.

A partial implementation of `window.navigator`.

### `navigator.hardwareConcurrency`

* Type: {number}

The `navigator.hardwareConcurrency` read-only property returns the number of
logical processors available to the current Node.js instance.

```js
console.log(`This process is running on ${navigator.hardwareConcurrency} logical processors`);
```

### `navigator.language`

* Type: {string}

The `navigator.language` read-only property returns a string representing the
preferred language of the Node.js instance. The language will be determined by
the ICU library used by Node.js at runtime based on the
default language of the operating system.

The value is representing the language version as defined in RFC 5646.

The fallback value on builds without ICU is `'en-US'`.

```js
console.log(`The preferred language of the Node.js instance has the tag '${navigator.language}'`);
```

### `navigator.languages`

* Type: {string\[]}

The `navigator.languages` read-only property returns an array of strings
representing the preferred languages of the Node.js instance.
By default `navigator.languages` contains only the value of
`navigator.language`, which will be determined by the ICU library used by
Node.js at runtime based on the default language of the operating system.

The fallback value on builds without ICU is `['en-US']`.

```js
console.log(`The preferred languages are '${navigator.languages}'`);
```

### `navigator.locks`

> Stability: 1 - Experimental

The `navigator.locks` read-only property returns a `LockManager` instance that
can be used to coordinate access to resources that may be shared across multiple
threads within the same process. This global implementation matches the semantics
of the browser `LockManager` API.

```mjs
// Request an exclusive lock
await navigator.locks.request('my_resource', async (lock) => {
  // The lock has been acquired.
  console.log(`Lock acquired: ${lock.name}`);
  // Lock is automatically released when the function returns
});

// Request a shared lock
await navigator.locks.request('shared_resource', { mode: 'shared' }, async (lock) => {
  // Multiple shared locks can be held simultaneously
  console.log(`Shared lock acquired: ${lock.name}`);
});
```

```cjs
// Request an exclusive lock
navigator.locks.request('my_resource', async (lock) => {
  // The lock has been acquired.
  console.log(`Lock acquired: ${lock.name}`);
  // Lock is automatically released when the function returns
}).then(() => {
  console.log('Lock released');
});

// Request a shared lock
navigator.locks.request('shared_resource', { mode: 'shared' }, async (lock) => {
  // Multiple shared locks can be held simultaneously
  console.log(`Shared lock acquired: ${lock.name}`);
}).then(() => {
  console.log('Shared lock released');
});
```

See `worker_threads.locks` for detailed API documentation.

### `navigator.platform`

* Type: {string}

The `navigator.platform` read-only property returns a string identifying the
platform on which the Node.js instance is running.

```js
console.log(`This process is running on ${navigator.platform}`);
```

### `navigator.userAgent`

* Type: {string}

The `navigator.userAgent` read-only property returns user agent
consisting of the runtime name and major version number.

```js
console.log(`The user-agent is ${navigator.userAgent}`); // Prints "Node.js/21"
```

## `performance`

The `perf_hooks.performance` object.

## Class: `PerformanceEntry`

The `PerformanceEntry` class. See `PerformanceEntry` for more details.

## Class: `PerformanceMark`

The `PerformanceMark` class. See `PerformanceMark` for more details.

## Class: `PerformanceMeasure`

The `PerformanceMeasure` class. See `PerformanceMeasure` for more details.

## Class: `PerformanceObserver`

The `PerformanceObserver` class. See `PerformanceObserver` for more details.

## Class: `PerformanceObserverEntryList`

The `PerformanceObserverEntryList` class. See
`PerformanceObserverEntryList` for more details.

## Class: `PerformanceResourceTiming`

The `PerformanceResourceTiming` class. See `PerformanceResourceTiming` for
more details.

## `process`

* Type: {Object}

The process object. See the `process` object section.

## `queueMicrotask(callback)`

* `callback` {Function} Function to be queued.

The `queueMicrotask()` method queues a microtask to invoke `callback`. If
`callback` throws an exception, the `process` object `'uncaughtException'`
event will be emitted.

The microtask queue is managed by V8 and may be used in a similar manner to
the `process.nextTick()` queue, which is managed by Node.js. The
`process.nextTick()` queue is always processed before the microtask queue
within each turn of the Node.js event loop.

```js
// Here, `queueMicrotask()` is used to ensure the 'load' event is always
// emitted asynchronously, and therefore consistently. Using
// `process.nextTick()` here would result in the 'load' event always emitting
// before any other promise jobs.

DataHandler.prototype.load = async function load(key) {
  const hit = this._cache.get(key);
  if (hit !== undefined) {
    queueMicrotask(() => {
      this.emit('load', hit);
    });
    return;
  }

  const data = await fetchData(key);
  this._cache.set(key, data);
  this.emit('load', data);
};
```

## Class: `QuotaExceededError`

The WHATWG {QuotaExceededError} class. Extends {DOMException}.

## Class: `ReadableByteStreamController`

A browser-compatible implementation of `ReadableByteStreamController`.
