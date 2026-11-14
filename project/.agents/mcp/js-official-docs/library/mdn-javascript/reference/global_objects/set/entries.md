---
title: "Set.prototype.entries()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/set/entries/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Set.prototype.entries()

The **`entries()`** method of `Set` instances returns a new _set iterator_ object that contains **an array of `[value, value]`** for each element in this set, in insertion order. For `Set` objects there is no `key` like in `Map` objects. However, to keep the API similar to the `Map` object, each _entry_ has the same value for its _key_ and _value_ here, so that an array `[value, value]` is returned.

```js
const set = new Set();
set.add(42);
set.add("forty two");

const iterator = set.entries();

for (const entry of iterator) {
  console.log(entry);
  // Expected output: Array [42, 42]
  // Expected output: Array ["forty two", "forty two"]
}
```

## Syntax

```js
entries()
```

### Parameters

None.

### Return value

A new iterable iterator object.

## Examples

### Using entries()

```js
const mySet = new Set();
mySet.add("foobar");
mySet.add(1);
mySet.add("baz");

const setIter = mySet.entries();

console.log(setIter.next().value); // ["foobar", "foobar"]
console.log(setIter.next().value); // [1, 1]
console.log(setIter.next().value); // ["baz", "baz"]
```

## See also

- `Set.prototype.keys()`
- `Set.prototype.values()`
