---
title: "Iterator.prototype.join()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/iterator/join/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Iterator.prototype.join()

The **`join()`** method of `Iterator` instances is similar to `Array.prototype.join()`: it returns a string that is the concatenation of all elements produced by the iterator, separated by commas or a specified separator string. If the iterator has only one item, that item's stringification is returned without using the separator.

## Syntax

```js
join()
join(separator)
```

### Parameters

- `separator` (optional)
    A string to separate each pair of adjacent elements of the iterator. If omitted, the elements are separated with a comma (",").

### Return value

A string joining all yielded elements. The elements are converted to strings. If an element is `undefined` or `null`, it is converted to an empty string instead of the string `"null"` or `"undefined"`. If the iterator is empty, the empty string is returned.

## Description

See `Array.prototype.join()` for details about how `join()` works. Unlike most other iterator helper methods, it does not work well with infinite iterators, because it is not lazy.

## Examples

### Using join()

```js
function* fibonacci() {
  let current = 1;
  let next = 1;
  while (true) {
    yield current;
    [current, next] = [next, current + next];
  }
}

console.log(fibonacci().take(5).join()); // "1,1,2,3,5"
console.log(fibonacci().take(5).join(" - ")); // "1 - 1 - 2 - 3 - 5"
```

## See also

- Polyfill of `Iterator.prototype.join` in `core-js`
- es-shims polyfill of `Iterator.prototype.join`
- `Iterator`
- `Iterator.prototype.reduce()`
- `Array.prototype.join()`
