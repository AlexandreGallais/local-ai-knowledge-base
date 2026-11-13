---
title: "Map.prototype.getOrInsert()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/map/getorinsert/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Map.prototype.getOrInsert()

The **`getOrInsert()`** method of `Map` instances returns the value corresponding to the specified key in this `Map`. If the key is not present, it inserts a new entry with the key and a given default value, and returns the inserted value.

If the computation of the default value is expensive, consider using `Map.prototype.getOrInsertComputed()` instead, which takes a callback to compute the default value only if it's actually needed.

```js
const map = new Map([["bar", "foo"]]);
console.log(map.getOrInsert("bar", "default"));
// Expected output: "foo"

console.log(map.getOrInsert("baz", "default"));
// Expected output: "default"
```

## Syntax

```js
getOrInsert(key, defaultValue)
```

### Parameters

- `key`
    The key of the value to return from the `Map` object. Object keys are compared by reference, not by value.
- `defaultValue`
    The value to insert and return if the key is not already present in the `Map` object.

### Return value

The value associated with the specified key in the `Map` object. If the key can't be found, `defaultValue` is inserted and returned.

## Description

The `getOrInsert()` method is equivalent to the following:

```js
if (map.has(key)) {
  return map.get(key);
}
map.set(key, defaultValue);
return defaultValue;
```

It is also similar to the following pattern (which is slightly less reliable if `null` or `undefined` are valid values in your map):

```js
map.set(key, map.get(key) ?? defaultValue);
```

## Examples

### Multimap

In a map where each key is mapped to an array of values, you can use `getOrInsert()` to ensure that the array exists for a given key <example-value> attempting to push a new value to the array.

```js
map.getOrInsert(key, []).push(value);
```

### Applying default values

You can use `getOrInsert()` to ensure that a key <example-value> in a map, even if you currently don't need its value. This is usually to normalize user input.

Imagine you have a map of user preferences, and you want to ensure that a certain preference is always set to a default value if the user hasn't specified it:

```js
const options = readConfig();
options.getOrInsert("theme", "light");
options.getOrInsert("fontSize", 14);

// Later in your code, you can safely assume these options exist
document.body.dataset.theme = options.get("theme");
```

## See also

- Polyfill of `Map.prototype.getOrInsert` in `core-js`
- es-shims polyfill of `Map.prototype.getOrInsert`
- `Map`
- `Map.prototype.get()`
- `Map.prototype.set()`
- `Map.prototype.has()`
- `Map.prototype.getOrInsertComputed()`
