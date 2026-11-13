---
title: "Set.prototype.values()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/set/values/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Set.prototype.values()

The **`values()`** method of `Set` instances returns a new _set iterator_ object that contains the values for each element in this set in insertion order.

```js
const set = new Set();
set.add(42);
set.add("forty two");

const iterator = set.values();

console.log(iterator.next().value);
// Expected output: 42

console.log(iterator.next().value);
// Expected output: "forty two"
```

## Syntax

```js
values()
```

### Parameters

None.

### Return value

A new iterable iterator object.

## Examples

### Using values()

```js
const mySet = new Set();
mySet.add("foo");
mySet.add("bar");
mySet.add("baz");

const setIter = mySet.values();

console.log(setIter.next().value); // "foo"
console.log(setIter.next().value); // "bar"
console.log(setIter.next().value); // "baz"
```

## See also

- `Set.prototype.entries()`
- `Set.prototype.keys()`
