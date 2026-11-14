---
title: "Iterator.prototype.every()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/iterator/every/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Iterator.prototype.every()

The **`every()`** method of `Iterator` instances is similar to `Array.prototype.every()`: it returns `false` if it finds an element that does not satisfy the provided testing function. Otherwise, if the iterator is exhausted without finding such an element, it returns `true`.

## Syntax

```js
every(callbackFn)
```

### Parameters

- `callbackFn`
    A function to execute for each element produced by the iterator. It should return a truthy value to indicate the element passes the test, and a falsy value otherwise. The function is called with the following arguments:
    - `element`
        The current element being processed.
    - `index`
        The index of the current element being processed.

### Return value

`true` if `callbackFn` returns a truthy value for every element. Otherwise, `false`.

## Description

`every()` iterates the iterator and invokes the `callbackFn` function once for each element. It returns `false` immediately if the callback function returns a falsy value. Otherwise, it iterates until the end of the iterator and returns `true`. If `every()` returns `false`, the underlying iterator is closed by calling its `return()` method.

The main advantage of iterator helpers over array methods is that they are lazy, meaning that they only produce the next value when requested. This avoids unnecessary computation and also allows them to be used with infinite iterators. With infinite iterators, `every()` returns `false` as soon as the first falsy value is found. If the `callbackFn` always returns a truthy value, the method never returns.

Calling `every()` always closes the underlying iterator, even if the method early-returns. The iterator is never left in a half-way state.

## Examples

### Using every()

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
console.log(fibonacci().every(isEven)); // false

const isPositive = (x) => x > 0;
console.log(fibonacci().take(10).every(isPositive)); // true
console.log(fibonacci().every(isPositive)); // Never completes
```

The method closes the iterator after returning.

```js
const seq = fibonacci();
console.log(seq.every(isEven)); // false
console.log(seq.next()); // { value: undefined, done: true }
```

## See also

- Polyfill of `Iterator.prototype.every` in `core-js`
- es-shims polyfill of `Iterator.prototype.every`
- `Iterator`
- `Iterator.prototype.find()`
- `Iterator.prototype.some()`
- `Array.prototype.every()`
