---
title: "Set.prototype.has()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/set/has/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Set.prototype.has()

The **`has()`** method of `Set` instances returns a boolean indicating whether the specified value exists in this `Set` or not.

```js
const set = new Set([1, 2, 3, 4, 5]);

console.log(set.has(1));
// Expected output: true

console.log(set.has(5));
// Expected output: true

console.log(set.has(6));
// Expected output: false
```

## Syntax

```js
has(value)
```

### Parameters

- `value`
    The value to test for presence in the `Set` object.

### Return value

Returns `true` if the specified value exists in the `Set` object; otherwise `false`.

## Examples

### Using has()

```js
const mySet = new Set();
mySet.add("foo");

console.log(mySet.has("foo")); // true
console.log(mySet.has("bar")); // false

const set = new Set();
const obj = { key1: 1 };
set.add(obj);

console.log(set.has(obj)); // true
console.log(set.has({ key1: 1 })); // false, because they are different object references
console.log(set.add({ key1: 1 })); // now set contains 2 entries
```

## See also

- `Set`
- `Set.prototype.add()`
- `Set.prototype.delete()`
