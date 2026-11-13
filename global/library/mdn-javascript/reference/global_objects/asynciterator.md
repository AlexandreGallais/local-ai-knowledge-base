---
title: "AsyncIterator"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/asynciterator/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AsyncIterator

An **`AsyncIterator`** object is an object that conforms to the async iterator protocol by providing a `next()` method that returns a promise fulfilling to an iterator result object. The `AsyncIterator.prototype` object is a hidden global object that all built-in async iterators inherit from. It provides a `[Symbol.asyncIterator]()` method that returns the async iterator object itself, making the async iterator also async iterable.

Note that `AsyncIterator` is _not_ a global object, although it will be in the future with the async iterator helpers proposal. The `AsyncIterator.prototype` object shared by all built-in async iterators can be obtained with the following code:

```js
const AsyncIteratorPrototype = Object.getPrototypeOf(
  Object.getPrototypeOf(Object.getPrototypeOf((async function* () {})())),
);
```

## Description

Currently, the only built-in JavaScript async iterator is the `AsyncGenerator` object returned by async generator functions. There are some other built-in async iterators in web API, such as the one of a `ReadableStream`.

Each of these async iterators have a distinct prototype object, which defines the `next()` method used by the particular async iterator. All of these prototype objects inherit from `AsyncIterator.prototype`, which provides a `[Symbol.asyncIterator]()` method that returns the async iterator object itself, making the async iterator also async iterable.

> **Note:**
> `AsyncIterator.prototype` does not implement `[Symbol.iterator]()`, so async iterators are not sync iterable by default.

## Instance methods

- `AsyncIterator.prototype[Symbol.asyncDispose]()`
    Calls and awaits the `return()` method of `this`, if it exists. This implements the _async disposable protocol_ and allows it to be disposed when used with `await using`.
- `AsyncIterator.prototype[Symbol.asyncIterator]()`
    Returns the async iterator object itself. This allows async iterator objects to also be async iterable.

## Examples

### Using an async iterator as an async iterable

All built-in async iterators are also async iterable, so you can use them in a `for await...of` loop:

```js
const asyncIterator = (async function* () {
  yield 1;
  yield 2;
  yield 3;
})();
(async () => {
  for await (const value of asyncIterator) {
    console.log(value);
  }
})();
// Logs: 1, 2, 3
```

## See also

- `async function*`
- Iteration protocols
