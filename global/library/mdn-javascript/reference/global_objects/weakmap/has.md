---
title: "WeakMap.prototype.has()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/weakmap/has/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WeakMap.prototype.has()

The **`has()`** method of `WeakMap` instances returns a boolean indicating whether an entry with the specified key <example-value> in this `WeakMap` or not.

```js
const weakmap = new WeakMap();
const object1 = {};
const object2 = {};

weakmap.set(object1, "foo");

console.log(weakmap.has(object1));
// Expected output: true

console.log(weakmap.has(object2));
// Expected output: false
```

## Syntax

```js
has(key)
```

### Parameters

- `key`
    The key of the entry to test for presence in the `WeakMap` object. Object keys are compared by reference, not by value.

### Return value

Returns `true` if an entry with the specified key <example-value> in the `WeakMap` object; otherwise `false`. Always returns `false` if `key` is not an object or a non-registered symbol.

## Examples

### Using has()

```js
const wm = new WeakMap();
wm.set(window, "foo");

wm.has(window); // returns true
wm.has("baz"); // returns false
```

## See also

- `WeakMap`
- `WeakMap.prototype.delete()`
- `WeakMap.prototype.get()`
- `WeakMap.prototype.set()`
