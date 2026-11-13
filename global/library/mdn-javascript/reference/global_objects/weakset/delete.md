---
title: "WeakSet.prototype.delete()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/weakset/delete/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# WeakSet.prototype.delete()

The **`delete()`** method of `WeakSet` instances removes the specified value from this set, if it is in the set.

```js
const weakset = new WeakSet();
const object = {};

weakset.add(object);

console.log(weakset.has(object));
// Expected output: true

weakset.delete(object);

console.log(weakset.has(object));
// Expected output: false
```

## Syntax

```js
weakSetInstance.delete(value)
```

### Parameters

- `value`
    The value to remove from the `WeakSet` object. Objects are compared by reference, not by value.

### Return value

`true` if a value in the `WeakSet` object has been removed successfully. `false` if the value is not found in the `WeakSet`. Always returns `false` if `value` is not an object or a non-registered symbol.

## Examples

### Using delete()

```js
const ws = new WeakSet();
const obj = {};

ws.add(window);

ws.delete(obj); // Returns false. No obj found to be deleted.
ws.delete(window); // Returns true. Successfully removed.

ws.has(window); // Returns false. The window is no longer present in the WeakSet.
```

## See also

- `WeakSet`
- `WeakSet.prototype.add()`
- `WeakSet.prototype.has()`
