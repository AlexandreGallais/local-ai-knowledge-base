---
title: "Set.prototype.keys()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/set/keys/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Set.prototype.keys()

The **`keys()`** method of `Set` instances is an alias for the `values()` method.

## Syntax

```js
keys()
```

### Parameters

None.

### Return value

A new iterable iterator object.

## Examples

### Using keys()

The `keys()` method is exactly equivalent to the `values()` method.

```js
const mySet = new Set();
mySet.add("foo");
mySet.add("bar");
mySet.add("baz");

const setIter = mySet.keys();

console.log(setIter.next().value); // "foo"
console.log(setIter.next().value); // "bar"
console.log(setIter.next().value); // "baz"
```

## See also

- `Set.prototype.entries()`
- `Set.prototype.values()`
