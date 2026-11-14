---
title: "WeakMap.prototype.getOrInsert()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/weakmap/getorinsert/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WeakMap.prototype.getOrInsert()

The **`getOrInsert()`** method of `WeakMap` instances returns the value corresponding to the specified key in this `WeakMap`. If the key is not present, it inserts a new entry with the key and a given default value, and returns the inserted value.

If the computation of the default value is expensive, consider using `WeakMap.prototype.getOrInsertComputed()` instead, which takes a callback to compute the default value only if it's actually needed.

```js
const map = new WeakMap([[window, "foo"]]);
console.log(map.getOrInsert(window, "default"));
// Expected output: "foo"

console.log(map.getOrInsert({}, "default"));
// Expected output: "default"
```

## Syntax

```js
getOrInsert(key, defaultValue)
```

### Parameters

- `key`
    The key of the value to return from the `WeakMap` object. Must be either an object or a non-registered symbol. Object keys are compared by reference, not by value.
- `defaultValue`
    The value to insert and return if the key is not already present in the `WeakMap` object.

### Return value

The value associated with the specified key in the `WeakMap` object. If the key can't be found, `defaultValue` is inserted and returned.

### Exceptions

- `TypeError`
    Thrown if `key` is not an object or a non-registered symbol.

## Examples

### Using getOrInsert()

```js
const wm = new WeakMap();
const obj = {};

console.log(wm.get(obj)); // undefined
console.log(wm.getOrInsert(obj, "default")); // "default"
console.log(wm.get(obj)); // "default"
console.log(wm.getOrInsert(obj, "another default")); // "default"
```

## See also

- Polyfill of `WeakMap.prototype.getOrInsert` in `core-js`
- es-shims polyfill of `WeakMap.prototype.getOrInsert`
- `WeakMap`
- `WeakMap.prototype.get()`
- `WeakMap.prototype.set()`
- `WeakMap.prototype.has()`
- `WeakMap.prototype.getOrInsertComputed()`
