---
title: "Iterator.prototype.some()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/iterator/some/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Iterator.prototype.some()

The **`some()`** method of `Iterator` instances is similar to `Array.prototype.some()`: it returns `true` if it finds an element that satisfies the provided testing function. Otherwise, if the iterator is exhausted without finding such an element, it returns `false`.

## Syntax

```js
some(callbackFn)
```

### Parameters

- `callbackFn`
    A function to execute for each element produced by the iterator. It should return a truthy value to indicate the element passes the test, and a falsy value otherwise. The function is called with the following arguments:
    - `element`
        The current element being processed.
    - `index`
        The index of the current element being processed.

### Return value

`true` if the callback function returns a truthy value for at least one element. Otherwise, `false`.

## Description

`some()` iterates the iterator and invokes the `callbackFn` function once for each element. It returns `true` immediately if the callback function returns a truthy value. Otherwise, it iterates until the end of the iterator and returns `false`. If `some()` returns `true`, the underlying iterator is closed by calling its `return()` method.

The main advantage of iterator helpers over array methods is that they are lazy, meaning that they only produce the next value when requested. This avoids unnecessary computation and also allows them to be used with infinite iterators. With infinite iterators, `some()` returns `true` as soon as the first truthy value is found. If the `callbackFn` always returns a falsy value, the method never returns.

Calling `some()` always closes the underlying iterator, even if the method early-returns. The iterator is never left in a half-way state.

## Examples

### Using some()

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
console.log(fibonacci().some(isEven)); // true

const isNegative = (x) => x < 0;
console.log(fibonacci().take(10).some(isNegative)); // false
console.log(fibonacci().some(isNegative)); // Never completes
```

The method closes the iterator after returning.

```js
const seq = fibonacci();
console.log(seq.some(isEven)); // true
console.log(seq.next()); // { value: undefined, done: true }
```

## See also

- Polyfill of `Iterator.prototype.some` in `core-js`
- es-shims polyfill of `Iterator.prototype.some`
- `Iterator`
- `Iterator.prototype.every()`
- `Iterator.prototype.find()`
- `Array.prototype.some()`
