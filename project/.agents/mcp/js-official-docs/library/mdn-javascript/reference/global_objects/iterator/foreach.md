---
title: "Iterator.prototype.forEach()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/iterator/foreach/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Iterator.prototype.forEach()

The **`forEach()`** method of `Iterator` instances is similar to `Array.prototype.forEach()`: it executes a provided function once for each element produced by the iterator.

## Syntax

```js
forEach(callbackFn)
```

### Parameters

- `callbackFn`
    A function to execute for each element produced by the iterator. Its return value is discarded. The function is called with the following arguments:
    - `element`
        The current element being processed.
    - `index`
        The index of the current element being processed.

### Return value

`undefined`.

## Description

`forEach()` iterates the iterator and invokes the `callbackFn` function once for each element. Unlike most other iterator helper methods, it does not work with infinite iterators, because it is not lazy.

## Examples

### Using forEach()

```js
new Set([1, 2, 3]).values().forEach((v) => console.log(v));

// Logs:
// 1
// 2
// 3
```

This is equivalent to:

```js
for (const v of new Set([1, 2, 3]).values()) {
  console.log(v);
}
```

## See also

- Polyfill of `Iterator.prototype.forEach` in `core-js`
- es-shims polyfill of `Iterator.prototype.forEach`
- `Iterator`
- `Iterator.prototype.find()`
- `Iterator.prototype.map()`
- `Iterator.prototype.filter()`
- `Iterator.prototype.every()`
- `Iterator.prototype.some()`
- `Array.prototype.forEach()`
