---
title: "Iterator.prototype.find()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/iterator/find/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Iterator.prototype.find()

The **`find()`** method of `Iterator` instances is similar to `Array.prototype.find()`: it returns the first element produced by the iterator that satisfies the provided testing function. If no values satisfy the testing function, `undefined` is returned.

## Syntax

```js
find(callbackFn)
```

### Parameters

- `callbackFn`
    A function to execute for each element produced by the iterator. It should return a truthy value to indicate a matching element has been found, and a falsy value otherwise. The function is called with the following arguments:
    - `element`
        The current element being processed.
    - `index`
        The index of the current element being processed.

### Return value

The first element produced by the iterator that satisfies the provided testing function. Otherwise, `undefined` is returned.

## Description

`find()` iterates the iterator and invokes the `callbackFn` function once for each element. It returns the element immediately if the callback function returns a truthy value. Otherwise, it iterates until the end of the iterator and returns `undefined`. If `find()` returns an element, the underlying iterator is closed by calling its `return()` method.

The main advantage of iterator helpers over array methods is that they are lazy, meaning that they only produce the next value when requested. This avoids unnecessary computation and also allows them to be used with infinite iterators. With infinite iterators, `find()` returns the first satisfying element as soon as it is found. If the `callbackFn` always returns a falsy value, the method never returns.

Calling `find()` always closes the underlying iterator, even if the method early-returns. The iterator is never left in a half-way state.

## Examples

### Using find()

```js
function* fibonacci() {
  let current = 1;
  let next = 1;
  while (true) {
    yield current;
    [current, next] = [next, current + next];
  }
}

const isEven = (x) => x % 2 === 0;
console.log(fibonacci().find(isEven)); // 2

const isNegative = (x) => x < 0;
console.log(fibonacci().take(10).find(isNegative)); // undefined
console.log(fibonacci().find(isNegative)); // Never completes
```

The method closes the iterator after returning.

```js
const seq = fibonacci();
console.log(seq.find(isEven)); // 2
console.log(seq.next()); // { value: undefined, done: true }
```

## See also

- Polyfill of `Iterator.prototype.find` in `core-js`
- es-shims polyfill of `Iterator.prototype.find`
- `Iterator`
- `Iterator.prototype.every()`
- `Iterator.prototype.some()`
- `Array.prototype.find()`
