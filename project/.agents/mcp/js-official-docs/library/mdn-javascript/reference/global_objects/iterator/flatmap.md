---
title: "Iterator.prototype.flatMap()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/iterator/flatmap/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Iterator.prototype.flatMap()

The **`flatMap()`** method of `Iterator` instances returns a new iterator helper object that takes each element in the original iterator, runs it through a mapping function, and yields elements returned by the mapping function (which are contained in another iterator or iterable).

## Syntax

```js
flatMap(callbackFn)
```

### Parameters

- `callbackFn`
    A function to execute for each element produced by the iterator. It should return an iterator or iterable that yields elements to be yielded by `flatMap()`. Note that unlike `Array.prototype.flatMap()`, you cannot return single non-iterator/iterable values. The function is called with the following arguments:
    - `element`
        The current element being processed in the array.
    - `index`
        The index of the current element being processed in the array.

### Return value

A new iterator helper object. The first time the iterator helper's `next()` method is called, it calls `callbackFn` on the first element produced by the underlying iterator, and the return value, which should be an iterator or iterable, is yielded one-by-one by the iterator helper (like `yield*`). The next element is fetched from the underlying iterator when the previous one returned by `callbackFn` is completed. When the underlying iterator is completed, the iterator helper is also completed (the `next()` method produces `{ value: undefined, done: true }`).

### Exceptions

- `TypeError`
    Thrown if `callbackFn` returns a non-iterator/iterable value or a string primitive.

## Description

`flatMap` accepts two kinds of return values from `callbackFn`: an iterator or iterable. They are handled in the same way as `Iterator.from()`: if the return value is iterable, the `Symbol.iterator` method is called and the return value is used; otherwise, the return value is treated as an iterator and its `next()` method is called.

```js
[1, 2, 3]
  .values()
  .flatMap((x) => {
    let itDone = false;
    const it = {
      next() {
        if (itDone) {
          return { value: undefined, done: true };
        }
        itDone = true;
        return { value: x, done: false };
      },
    };
    switch (x) {
      case 1:
        // An iterable that's not an iterator
        return { [Symbol.iterator]: () => it };
      case 2:
        // An iterator that's not an iterable
        return it;
      case 3:
        // An iterable iterator is treated as an iterable
        return {
          ...it,
          [Symbol.iterator]() {
            console.log("Symbol.iterator called");
            return it;
          },
        };
      default:
        return undefined;
    }
  })
  .toArray();
// Logs "Symbol.iterator called"
// Returns [1, 2, 3]
```

## Examples

### Merging maps

The following example merges two `Map` objects into one:

```js
const map1 = new Map([
  ["a", 1],
  ["b", 2],
  ["c", 3],
]);
const map2 = new Map([
  ["d", 4],
  ["e", 5],
  ["f", 6],
]);

const merged = new Map([map1, map2].values().flatMap((x) => x));
console.log(merged.get("a")); // 1
console.log(merged.get("e")); // 5
```

This avoids creating any temporary copies of the map's content. Note that the array `[map1, map2]` must first be converted to an iterator (using `Array.prototype.values()`), because `Array.prototype.flatMap()` only flattens arrays, not iterables.

```js
new Map([map1, map2].flatMap((x) => x)); // Map(1) {undefined => undefined}
```

### Returning strings

Strings are iterable, but `flatMap()` specifically rejects string primitives returned from `callbackFn`, this is because the behavior of iterating by code points is often not what you want.

```js
[1, 2, 3]
  .values()
  .flatMap((x) => String(x))
  .toArray(); // TypeError: Iterator.prototype.flatMap called on non-object
```

You may want to wrap it in an array instead so the entire string is yielded as one:

```js
[1, 2, 3]
  .values()
  .flatMap((x) => [String(x)])
  .toArray(); // ['1', '2', '3']
```

Or, if the behavior of iterating by code points is intended, you can use `Iterator.from()` to convert it to a proper iterator:

```js
[1, 2, 3]
  .values()
  .flatMap((x) => Iterator.from(String(x * 10)))
  .toArray();
// ['1', '0', '2', '0', '3', '0']
```

## See also

- Polyfill of `Iterator.prototype.flatMap` in `core-js`
- es-shims polyfill of `Iterator.prototype.flatMap`
