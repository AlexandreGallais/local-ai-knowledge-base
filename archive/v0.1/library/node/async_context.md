---
title: "Asynchronous context tracking (part 1 of 2)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/async_context.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Asynchronous context tracking

> Stability: 2 - Stable

## Introduction

These classes are used to associate state and propagate it throughout
callbacks and promise chains.
They allow storing data throughout the lifetime of a web request
or any other asynchronous duration. It is similar to thread-local storage
in other languages.

The `AsyncLocalStorage` and `AsyncResource` classes are part of the
`node:async_hooks` module:

```mjs
import { AsyncLocalStorage, AsyncResource } from 'node:async_hooks';
```

```cjs
const { AsyncLocalStorage, AsyncResource } = require('node:async_hooks');
```

## Class: `AsyncLocalStorage`

This class creates stores that stay coherent through asynchronous operations.

While you can create your own implementation on top of the `node:async_hooks`
module, `AsyncLocalStorage` should be preferred as it is a performant and memory
safe implementation that involves significant optimizations that are non-obvious
to implement.

The following example uses `AsyncLocalStorage` to build a simple logger
that assigns IDs to incoming HTTP requests and includes them in messages
logged within each request.

```mjs
import http from 'node:http';
import { AsyncLocalStorage } from 'node:async_hooks';

const asyncLocalStorage = new AsyncLocalStorage();

function logWithId(msg) {
  const id = asyncLocalStorage.getStore();
  console.log(`${id !== undefined ? id : '-'}:`, msg);
}

let idSeq = 0;
http.createServer((req, res) => {
  asyncLocalStorage.run(idSeq++, () => {
    logWithId('start');
    // Imagine any chain of async operations here
    setImmediate(() => {
      logWithId('finish');
      res.end();
    });
  });
}).listen(8080);

http.get('http://localhost:8080');
http.get('http://localhost:8080');
// Prints:
//   0: start
//   0: finish
//   1: start
//   1: finish
```

```cjs
const http = require('node:http');
const { AsyncLocalStorage } = require('node:async_hooks');

const asyncLocalStorage = new AsyncLocalStorage();

function logWithId(msg) {
  const id = asyncLocalStorage.getStore();
  console.log(`${id !== undefined ? id : '-'}:`, msg);
}

let idSeq = 0;
http.createServer((req, res) => {
  asyncLocalStorage.run(idSeq++, () => {
    logWithId('start');
    // Imagine any chain of async operations here
    setImmediate(() => {
      logWithId('finish');
      res.end();
    });
  });
}).listen(8080);

http.get('http://localhost:8080');
http.get('http://localhost:8080');
// Prints:
//   0: start
//   0: finish
//   1: start
//   1: finish
```

Each instance of `AsyncLocalStorage` maintains an independent storage context.
Multiple instances can safely exist simultaneously without risk of interfering
with each other's data.

### `new AsyncLocalStorage([options])`

* `options` {Object}
  * `defaultValue` {any} The default value to be used when no store is provided.
  * `name` {string} A name for the `AsyncLocalStorage` value.

Creates a new instance of `AsyncLocalStorage`. Store is only provided within a
`run()` call or after an `enterWith()` call.

### Static method: `AsyncLocalStorage.bind(fn)`

* `fn` {Function} The function to bind to the current execution context.
* Returns: {Function} A new function that calls `fn` within the captured
  execution context.

Binds the given function to the current execution context.

### Static method: `AsyncLocalStorage.snapshot()`

* Returns: {Function} A new function with the signature
  `(fn: (...args) : R, ...args) : R`.

Captures the current execution context and returns a function that accepts a
function as an argument. Whenever the returned function is called, it
calls the function passed to it within the captured context.

```js
const asyncLocalStorage = new AsyncLocalStorage();
const runInAsyncScope = asyncLocalStorage.run(123, () => AsyncLocalStorage.snapshot());
const result = asyncLocalStorage.run(321, () => runInAsyncScope(() => asyncLocalStorage.getStore()));
console.log(result);  // returns 123
```

AsyncLocalStorage.snapshot() can replace the use of AsyncResource for simple
async context tracking purposes, for example:

```js
class Foo {
  #runInAsyncScope = AsyncLocalStorage.snapshot();

  get() { return this.#runInAsyncScope(() => asyncLocalStorage.getStore()); }
}

const foo = asyncLocalStorage.run(123, () => new Foo());
console.log(asyncLocalStorage.run(321, () => foo.get())); // returns 123
```

### `asyncLocalStorage.disable()`

> Stability: 1 - Experimental

Disables the instance of `AsyncLocalStorage`. All subsequent calls
to `asyncLocalStorage.getStore()` will return `undefined` until
`asyncLocalStorage.run()` or `asyncLocalStorage.enterWith()` is called again.

When calling `asyncLocalStorage.disable()`, all current contexts linked to the
instance will be exited.

Calling `asyncLocalStorage.disable()` is required before the
`asyncLocalStorage` can be garbage collected. This does not apply to stores
provided by the `asyncLocalStorage`, as those objects are garbage collected
along with the corresponding async resources.

Use this method when the `asyncLocalStorage` is not in use anymore
in the current process.

### `asyncLocalStorage.getStore()`

* Returns: {any}

Returns the current store.
If called outside of an asynchronous context initialized by
calling `asyncLocalStorage.run()` or `asyncLocalStorage.enterWith()`, it
returns `undefined`.

### `asyncLocalStorage.enterWith(store)`

> Stability: 1 - Experimental

* `store` {any}

Transitions into the context for the remainder of the current
synchronous execution and then persists the store through any following
asynchronous calls.

Example:

```js
const store = { id: 1 };
// Replaces previous store with the given store object
asyncLocalStorage.enterWith(store);
asyncLocalStorage.getStore(); // Returns the store object
someAsyncOperation(() => {
  asyncLocalStorage.getStore(); // Returns the same object
});
```

This transition will continue for the _entire_ synchronous execution.
This means that if, for example, the context is entered within an event
handler subsequent event handlers will also run within that context unless
specifically bound to another context with an `AsyncResource`. That is why
`run()` should be preferred over `enterWith()` unless there are strong reasons
to use the latter method.

```js
const store = { id: 1 };

emitter.on('my-event', () => {
  asyncLocalStorage.enterWith(store);
});
emitter.on('my-event', () => {
  asyncLocalStorage.getStore(); // Returns the same object
});

asyncLocalStorage.getStore(); // Returns undefined
emitter.emit('my-event');
asyncLocalStorage.getStore(); // Returns the same object
```

### `asyncLocalStorage.name`

* Type: {string}

The name of the `AsyncLocalStorage` instance if provided.

### `asyncLocalStorage.run(store, callback[, ...args])`

* `store` {any}
* `callback` {Function}
* `...args` {any}

Runs a function synchronously within a context and returns its
return value. The store is not accessible outside of the callback function.
The store is accessible to any asynchronous operations created within the
callback.

The optional `args` are passed to the callback function.

If the callback function throws an error, the error is thrown by `run()` too.
The stacktrace is not impacted by this call and the context is exited.

Example:

```js
const store = { id: 2 };
try {
  asyncLocalStorage.run(store, () => {
    asyncLocalStorage.getStore(); // Returns the store object
    setTimeout(() => {
      asyncLocalStorage.getStore(); // Returns the store object
    }, 200);
    throw new Error();
  });
} catch (e) {
  asyncLocalStorage.getStore(); // Returns undefined
  // The error will be caught here
}
```

### `asyncLocalStorage.exit(callback[, ...args])`

> Stability: 1 - Experimental

* `callback` {Function}
* `...args` {any}

Runs a function synchronously outside of a context and returns its
return value. The store is not accessible within the callback function or
the asynchronous operations created within the callback. Any `getStore()`
call done within the callback function will always return `undefined`.

The optional `args` are passed to the callback function.

If the callback function throws an error, the error is thrown by `exit()` too.
The stacktrace is not impacted by this call and the context is re-entered.

Example:

```js
// Within a call to run
try {
  asyncLocalStorage.getStore(); // Returns the store object or value
  asyncLocalStorage.exit(() => {
    asyncLocalStorage.getStore(); // Returns undefined
    throw new Error();
  });
} catch (e) {
  asyncLocalStorage.getStore(); // Returns the same object or value
  // The error will be caught here
}
```

### `asyncLocalStorage.withScope(store)`

> Stability: 1 - Experimental

* `store` {any}
* Returns: {RunScope}

Creates a disposable scope that enters the given store and automatically
restores the previous store value when the scope is disposed. This method is
designed to work with JavaScript's explicit resource management (`using` syntax).

Example:

```mjs
import { AsyncLocalStorage } from 'node:async_hooks';

const asyncLocalStorage = new AsyncLocalStorage();

{
  using _ = asyncLocalStorage.withScope('my-store');
  console.log(asyncLocalStorage.getStore()); // Prints: my-store
}

console.log(asyncLocalStorage.getStore()); // Prints: undefined
```

```cjs
const { AsyncLocalStorage } = require('node:async_hooks');

const asyncLocalStorage = new AsyncLocalStorage();

{
  using _ = asyncLocalStorage.withScope('my-store');
  console.log(asyncLocalStorage.getStore()); // Prints: my-store
}

console.log(asyncLocalStorage.getStore()); // Prints: undefined
```

The `withScope()` method is particularly useful for managing context in
synchronous code where you want to ensure the previous store value is restored
when exiting a block, even if an error is thrown.

```mjs
import { AsyncLocalStorage } from 'node:async_hooks';

const asyncLocalStorage = new AsyncLocalStorage();

try {
  using _ = asyncLocalStorage.withScope('my-store');
  console.log(asyncLocalStorage.getStore()); // Prints: my-store
  throw new Error('test');
} catch (e) {
  // Store is automatically restored even after error
  console.log(asyncLocalStorage.getStore()); // Prints: undefined
}
```

```cjs
const { AsyncLocalStorage } = require('node:async_hooks');

const asyncLocalStorage = new AsyncLocalStorage();

try {
  using _ = asyncLocalStorage.withScope('my-store');
  console.log(asyncLocalStorage.getStore()); // Prints: my-store
  throw new Error('test');
} catch (e) {
  // Store is automatically restored even after error
  console.log(asyncLocalStorage.getStore()); // Prints: undefined
}
```

**Important:** When using `withScope()` in async functions before the first
`await`, be aware that the scope change will affect the caller's context. The
synchronous portion of an async function (before the first `await`) runs
immediately when called, and when it reaches the first `await`, it returns the
promise to the caller. At that point, the scope change becomes visible in the
caller's context and will persist in subsequent synchronous code until something
else changes the scope value. For async operations, prefer using `run()` which
properly isolates context across async boundaries.

```mjs
import { AsyncLocalStorage } from 'node:async_hooks';

const asyncLocalStorage = new AsyncLocalStorage();

async function example() {
  using _ = asyncLocalStorage.withScope('my-store');
  console.log(asyncLocalStorage.getStore()); // Prints: my-store
  await someAsyncOperation(); // Function pauses here and returns promise
  console.log(asyncLocalStorage.getStore()); // Prints: my-store
}

// Calling without await
example(); // Synchronous portion runs, then pauses at first await
// After the promise is returned, the scope 'my-store' is now active in caller!
console.log(asyncLocalStorage.getStore()); // Prints: my-store (unexpected!)
```

### Usage with `async/await`

If, within an async function, only one `await` call is to run within a context,
the following pattern should be used:

```js
async function fn() {
  await asyncLocalStorage.run(new Map(), () => {
    asyncLocalStorage.getStore().set('key', value);
    return foo(); // The return value of foo will be awaited
  });
}
```

In this example, the store is only available in the callback function and the
functions called by `foo`. Outside of `run`, calling `getStore` will return
`undefined`.

### Troubleshooting: Context loss

In most cases, `AsyncLocalStorage` works without issues. In rare situations, the
current store is lost in one of the asynchronous operations.

If your code is callback-based, it is enough to promisify it with
`util.promisify()` so it starts working with native promises.

If you need to use a callback-based API or your code assumes
a custom thenable implementation, use the `AsyncResource` class
to associate the asynchronous operation with the correct execution context.
Find the function call responsible for the context loss by logging the content
of `asyncLocalStorage.getStore()` after the calls you suspect are responsible
for the loss. When the code logs `undefined`, the last callback called is
probably responsible for the context loss.

## Class: `RunScope`

> Stability: 1 - Experimental

A disposable scope returned by `asyncLocalStorage.withScope()` that
automatically restores the previous store value when disposed. This class
implements the Explicit Resource Management protocol and is designed to work
with JavaScript's `using` syntax.

The scope automatically restores the previous store value when the `using` block
exits, whether through normal completion or by throwing an error.

### `scope.dispose()`

Explicitly ends the scope and restores the previous store value. This method
is idempotent: calling it multiple times has the same effect as calling it once.

The `Symbol.dispose` method defers to `dispose()`.

If `withScope()` is called without the `using` keyword, `dispose()` must be
called manually to restore the previous store value. Forgetting to call
`dispose()` will cause the store value to persist for the remainder of the
current execution context:

```mjs
import { AsyncLocalStorage } from 'node:async_hooks';

const storage = new AsyncLocalStorage();

// Without using, the scope must be disposed manually
const scope = storage.withScope('my-store');
// storage.getStore() === 'my-store' here

scope.dispose(); // Restore previous value
// storage.getStore() === undefined here
```

```cjs
const { AsyncLocalStorage } = require('node:async_hooks');

const storage = new AsyncLocalStorage();

// Without using, the scope must be disposed manually
const scope = storage.withScope('my-store');
// storage.getStore() === 'my-store' here

scope.dispose(); // Restore previous value
// storage.getStore() === undefined here
```
