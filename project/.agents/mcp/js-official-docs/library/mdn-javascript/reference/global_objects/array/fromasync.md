---
title: "Array.fromAsync()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/array/fromasync/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Array.fromAsync()

The **`Array.fromAsync()`** static method creates a new, shallow-copied `Array` instance from an async iterable, iterable, or array-like object.

## Syntax

```js
Array.fromAsync(items)
Array.fromAsync(items, mapFn)
Array.fromAsync(items, mapFn, thisArg)
```

### Parameters

- `items`
    An async iterable, iterable, or array-like object to convert to an array.
- `mapFn` (optional)
    A function to call on every element of the array. If provided, every value to be added to the array is first passed through this function, and `mapFn`'s return value is added to the array instead (after being awaited). The function is called with the following arguments:
    - `element`
        The current element being processed in the array. If `items` is a sync iterable or array-like object, then all elements are first awaited, and `element` will never be a thenable. If `items` is an async iterable, then each yielded value is passed as-is.
    - `index`
        The index of the current element being processed in the array.
- `thisArg` (optional)
    Value to use as `this` when executing `mapFn`.

### Return value

A new `Promise` whose fulfillment value is a new `Array` instance.

## Description

`Array.fromAsync()` lets you create arrays from:

- async iterable objects (objects such as `ReadableStream` and `AsyncGenerator`); or, if the object is not async iterable,
- iterable objects (objects such as `Map` and `Set`); or, if the object is not iterable,
- array-like objects (objects with a `length` property and indexed elements).

`Array.fromAsync()` iterates the async iterable in a fashion very similar to `for await...of`. `Array.fromAsync(items)` is generally equivalent to the following code, if `items` is an async iterable or sync iterable:

```js
const result = [];
for await (const element of items) {
  result.push(element);
}
```

`Array.fromAsync()` is almost equivalent to `Array.from()` in terms of behavior, except the following:

- `Array.fromAsync()` handles async iterable objects.
- `Array.fromAsync()` returns a `Promise` that fulfills to the array instance.
- If `Array.fromAsync()` is called with a non-async iterable object, each element to be added to the array is first awaited.
- If a `mapFn` is provided, its output is also internally awaited.

`Array.fromAsync()` and `Promise.all()` can both turn an iterable of promises into a promise of an array. However, there are two key <example-value>:

- `Array.fromAsync()` awaits each value yielded from the object sequentially. `Promise.all()` awaits all values concurrently.
- `Array.fromAsync()` iterates the iterable lazily, and doesn't retrieve the next value until the current one is settled. `Promise.all()` retrieves all values in advance and awaits them all.

## Examples

### Array from an async iterable

```js
const asyncIterable = (async function* () {
  for (let i = 0; i < 5; i++) {
    await new Promise((resolve) => setTimeout(resolve, 10 * i));
    yield i;
  }
})();

Array.fromAsync(asyncIterable).then((array) => console.log(array));
// [0, 1, 2, 3, 4]
```

When `items` is an async iterable where each result's `value` is also a promise, then those promises are added to the resulting array without being awaited. This is consistent with the behavior of `for await...of`.

```js
function createAsyncIter() {
  let i = 0;
  return {
    [Symbol.asyncIterator]() {
      return {
        async next() {
          if (i > 2) return { done: true };
          i++;
          return { value: Promise.resolve(i), done: false };
        },
      };
    },
  };
}

Array.fromAsync(createAsyncIter()).then((array) => console.log(array));
// (3) [Promise, Promise, Promise]
```

> **Note:**
> In practice, you will rarely encounter an async iterable that yields promises, because if you implement it using an async generator function, then the `yield` expression automatically unwraps promises.

### Array from a sync iterable

```js
Array.fromAsync(
  new Map([
    [1, 2],
    [3, 4],
  ]),
).then((array) => console.log(array));
// [[1, 2], [3, 4]]
```

### Array from a sync iterable that yields promises

```js
Array.fromAsync(
  new Set([Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)]),
).then((array) => console.log(array));
// [1, 2, 3]
```

### Array from an array-like object of promises

```js
Array.fromAsync({
  length: 3,
  0: Promise.resolve(1),
  1: Promise.resolve(2),
  2: Promise.resolve(3),
}).then((array) => console.log(array));
// [1, 2, 3]
```

### Using mapFn with a sync iterable

When `items` is a sync iterable or array-like object, both the input and output of `mapFn` are awaited internally by `Array.fromAsync()`.

```js
function delayedValue(v) {
  return new Promise((resolve) => setTimeout(() => resolve(v), 100));
}

Array.fromAsync(
  [delayedValue(1), delayedValue(2), delayedValue(3)],
  (element) => delayedValue(element * 2),
).then((array) => console.log(array));
// [2, 4, 6]
```

### Using mapFn with an async iterable

When `items` is an async iterable, the input to `mapFn` is not awaited, but the output is. Using the same `createAsyncIter` function as above:

```js
Array.fromAsync(createAsyncIter(), async (element) => (await element) * 2).then(
  (array) => console.log(array),
);
// [2, 4, 6]
```

Curiously, this means that `Array.fromAsync(createAsyncIter())` is not equivalent to `Array.fromAsync(createAsyncIter(), (element) => element)`, because the latter awaits each yielded value, while the former does not.

```js
Array.fromAsync(createAsyncIter(), (element) => element).then((array) =>
  console.log(array),
);
// [1, 2, 3]
```

### Comparison with Promise.all()

`Array.fromAsync()` awaits each value yielded from the object sequentially. `Promise.all()` awaits all values concurrently.

```js
function* makeIterableOfPromises() {
  for (let i = 0; i < 5; i++) {
    yield new Promise((resolve) => setTimeout(resolve, 100));
  }
}

(async () => {
  console.time("Array.fromAsync() time");
  await Array.fromAsync(makeIterableOfPromises());
  console.timeEnd("Array.fromAsync() time");
  // Array.fromAsync() time: 503.610ms

  console.time("Promise.all() time");
  await Promise.all(makeIterableOfPromises());
  console.timeEnd("Promise.all() time");
  // Promise.all() time: 101.728ms
})();
```

### Closing sync iterables on rejection

Similar to `for await...of`, if the object being iterated is a sync iterable, and a yielded promise rejects, the `return()` method of the underlying iterator will be called, if one exists, to allow the iterator to perform cleanup.

```js
function* generatorWithRejectedPromises() {
  try {
    yield 0;
    yield Promise.reject(new Error("error"));
  } finally {
    console.log("called finally");
  }
}

(async () => {
  try {
    await Array.fromAsync(generatorWithRejectedPromises());
  } catch (e) {
    console.log("caught", e);
  }
})();
// called finally
// caught Error: error
```

## See also

- Polyfill of `Array.fromAsync` in `core-js`
- Indexed collections guide
- `Array`
- `Array()`
- `Array.of()`
- `Array.from()`
- `for await...of`
