---
title: "Iterator.prototype.toArray()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/iterator/toarray/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Iterator.prototype.toArray()

The **`toArray()`** method of `Iterator` instances creates a new `Array` instance populated with the elements yielded from the iterator.

## Syntax

```js
toArray()
```

### Parameters

None.

### Return value

A new `Array` instance containing the elements from the iterator in the order they were produced.

## Examples

### Using toArray()

`iterator.toArray()` is equivalent to `Array.from(iterator)` and `[...iterator]`, except that it's easier to chain when multiple iterator helper methods are involved. The following example creates an iterator that yields terms in the Fibonacci sequence, takes the first 10 terms, filters out the odd numbers, and converts the result to an array:

```js
function* fibonacci() {
  let current = 1;
  let next = 1;
  while (true) {
    yield current;
    [current, next] = [next, current + next];
  }
}

const array = fibonacci()
  .take(10)
  .filter((x) => x % 2 === 0)
  .toArray();

console.log(array); // [2, 8, 34]
```

Note that it's a good idea to call `toArray()` as a last step of your processing. For example, `fibonacci().take(10).toArray().filter(...)` is less efficient, because iterator helpers are lazy and avoids creating a temporary array.

## See also

- Polyfill of `Iterator.prototype.toArray` in `core-js`
- es-shims polyfill of `Iterator.prototype.toArray`
- `Iterator`
- `Array.from()`
