---
title: "WeakSet.prototype.has()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/weakset/has/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WeakSet.prototype.has()

The **`has()`** method of `WeakSet` instances returns a boolean indicating whether the specified value exists in this `WeakSet` or not.

```js
const weakset = new WeakSet();
const object1 = {};
const object2 = {};

weakset.add(object1);

console.log(weakset.has(object1));
// Expected output: true

console.log(weakset.has(object2));
// Expected output: false
```

## Syntax

```js
has(value)
```

### Parameters

- `value`
    The value to test for presence in the `WeakSet` object. Objects are compared by reference, not by value.

### Return value

Returns `true` if the specified value exists in the `WeakSet` object; otherwise `false`. Always returns `false` if `value` is not an object or a non-registered symbol.

## Examples

### Using has()

```js
const ws = new WeakSet();
const obj = {};
ws.add(window);

ws.has(window); // returns true
ws.has(obj); // returns false

// Storing a non-registered symbol
const sym = Symbol("foo");
ws.add(sym);
ws.add(Symbol.iterator);
```

## See also

- `WeakSet`
- `WeakSet.prototype.add()`
- `WeakSet.prototype.delete()`
