---
title: "Iterator.prototype[Symbol.iterator]()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/iterator/symbol.iterator/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Iterator.prototype[Symbol.iterator]()

The **`Symbol.iterator`** method of `Iterator` instances implements the iterable protocol and allows built-in iterators to be consumed by most syntaxes expecting iterables, such as the spread syntax and `for...of` loops. It returns the value of `this`, which is the iterator object itself.

## Syntax

```js
iterator[Symbol.iterator]()
```

### Parameters

None.

### Return value

The value of `this`, which is the iterator object itself.

## Examples

### Iteration using for...of loop

Note that you seldom need to call this method directly. The existence of the `Symbol.iterator` method makes built-in iterators iterable, and iterating syntaxes like the `for...of` loop automatically call this method to obtain the iterator to loop over.

```js
const arrIterator = [1, 2, 3].values();
for (const value of arrIterator) {
  console.log(value);
}
// Logs: 1, 2, 3
```

## See also

- `Iterator`
- `Symbol.iterator`
- Iteration protocols
