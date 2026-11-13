---
title: "WeakMap.prototype.get()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/weakmap/get/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WeakMap.prototype.get()

The **`get()`** method of `WeakMap` instances returns the value corresponding to the key in this `WeakMap`, or `undefined` if there is none. Object values are returned as the same reference that was originally stored, not as a copy, so mutations to the returned object will be reflected anywhere that reference is held, including inside the `WeakMap`.

```js
const weakmap = new WeakMap();
const object1 = {};
const object2 = {};

weakmap.set(object1, 42);

console.log(weakmap.get(object1));
// Expected output: 42

console.log(weakmap.get(object2));
// Expected output: undefined
```

## Syntax

```js
get(key)
```

### Parameters

- `key`
    The key of the value to return from the `WeakMap` object. Object keys are compared by reference, not by value.

### Return value

The value associated with the specified key in the `WeakMap` object. If the key can't be found, `undefined` is returned. Always returns `undefined` if `key` is not an object or a non-registered symbol.

## Examples

### Using get()

```js
const wm = new WeakMap();
wm.set(window, "foo");

wm.get(window); // Returns "foo".
wm.get("baz"); // Returns undefined.
```

## See also

- `WeakMap`
- `WeakMap.prototype.delete()`
- `WeakMap.prototype.set()`
- `WeakMap.prototype.has()`
