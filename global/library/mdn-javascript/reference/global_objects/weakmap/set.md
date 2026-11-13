---
title: "WeakMap.prototype.set()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/weakmap/set/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WeakMap.prototype.set()

The **`set()`** method of `WeakMap` instances adds a new entry with a specified key and value to this `WeakMap`, or updates an existing entry if the key <example-value> exists.

```js
const weakmap = new WeakMap();
const object1 = {};
const object2 = {};

weakmap.set(object1, "foo");
weakmap.set(object2, "bar");

console.log(weakmap.get(object1));
// Expected output: "foo"

console.log(weakmap.get(object2));
// Expected output: "bar"
```

## Syntax

```js
set(key, value)
```

### Parameters

- `key`
    The key of the entry to add to or modify within the `WeakMap` object. Must be either an object or a non-registered symbol. Object keys are compared by reference, not by value.
- `value`
    The value of the entry to add to or modify within the `WeakMap` object. Can be any value.

### Return value

The `WeakMap` object.

### Exceptions

- `TypeError`
    Thrown if `key` is not an object or a non-registered symbol.

## Examples

### Using set()

```js
const wm = new WeakMap();
const obj = {};

// Add new elements to the WeakMap
wm.set(obj, "foo").set(window, "bar"); // chainable

// Update an element in the WeakMap
wm.set(obj, "baz");

// Using a non-registered symbol as key
const sym = Symbol("foo");
wm.set(sym, "baz");
wm.set(Symbol.iterator, "qux");
```

## See also

- `WeakMap`
- `WeakMap.prototype.delete()`
- `WeakMap.prototype.get()`
- `WeakMap.prototype.has()`
