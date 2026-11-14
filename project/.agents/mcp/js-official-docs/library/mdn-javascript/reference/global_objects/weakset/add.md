---
title: "WeakSet.prototype.add()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/weakset/add/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WeakSet.prototype.add()

The **`add()`** method of `WeakSet` instances inserts the specified value into this set, if it is not already present.

```js
const weakset = new WeakSet();
const object = {};

weakset.add(object);
console.log(weakset.has(object));
// Expected output: true

try {
  weakset.add(1);
} catch (error) {
  console.log(error);
  // Expected output (Chrome): TypeError: Invalid value used in weak set
  // Expected output (Firefox): TypeError: WeakSet value must be an object, got 1
  // Expected output (Safari): TypeError: Attempted to add a non-object key to a WeakSet
}
```

## Syntax

```js
add(value)
```

### Parameters

- `value`
    The value to add to the `WeakSet` object. Must be either an object or a non-registered symbol. Objects are compared by reference, not by value.

### Return value

The `WeakSet` object.

### Exceptions

- `TypeError`
    Thrown if `value` is not an object or a non-registered symbol.

## Examples

### Using add()

```js
const ws = new WeakSet();

ws.add(window); // add the window object to the WeakSet

ws.has(window); // true

// WeakSet only takes objects as arguments
ws.add(1);
// results in "TypeError: Invalid value used in weak set" in Chrome
// and "TypeError: 1 is not a non-null object" in Firefox
```

## See also

- `WeakSet`
- `WeakSet.prototype.delete()`
- `WeakSet.prototype.has()`
