---
title: "Map.prototype.getOrInsertComputed()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/map/getorinsertcomputed/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Map.prototype.getOrInsertComputed()

The **`getOrInsertComputed()`** method of `Map` instances returns the value corresponding to the specified key in this `Map`. If the key is not present, it inserts a new entry with the key and a default value computed from a given callback, and returns the inserted value.

Use this method instead of `Map.prototype.getOrInsert()` when the default value is expensive to compute, and you want to avoid computing it unless it's actually needed.

```js
const map = new Map([["bar", "foo"]]);
const defaultCreator = (key) => `default for ${key}`;

console.log(map.getOrInsertComputed("bar", defaultCreator));
// Expected output: "foo"

console.log(map.getOrInsertComputed("baz", defaultCreator));
// Expected output: "default for baz"
```

## Syntax

```js
getOrInsertComputed(key, callback)
```

### Parameters

- `key`
    The key of the element to return from the `Map` object. Object keys are compared by reference, not by value.
- `callback`
    A function that returns the value to insert and return if the key is not already present in the `Map` object. The function is called with the following argument:
    - `key`
        The same key that was passed to `getOrInsertComputed()`.

### Return value

The value associated with the specified key in the `Map` object. If the key can't be found, the result of `callback(key)` is inserted and returned.

### Exceptions

- `TypeError`
    Thrown if `callback` isn't callable.

## Examples

### Avoiding unnecessary default computation

When using `Map.prototype.getOrInsert()`, the default value is computed every time, even if it is not needed. With `getOrInsertComputed()`, the default value is only computed when necessary.

```js
const map = new Map([["bar", "foo"]]);
const defaultCreator = (key) => {
  console.log(`Creating default for ${key}`);
  return `default for ${key}`;
};

map.getOrInsert("bar", defaultCreator("bar")); // Logs "Creating default for bar"
map.getOrInsertComputed("bar", defaultCreator); // No log
```

## See also

- Polyfill of `Map.prototype.getOrInsertComputed` in `core-js`
- es-shims polyfill of `Map.prototype.getOrInsertComputed`
- `Map`
- `Map.prototype.get()`
- `Map.prototype.set()`
- `Map.prototype.has()`
- `Map.prototype.getOrInsert()`
