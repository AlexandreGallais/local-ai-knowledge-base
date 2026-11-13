---
title: "Map.prototype.has()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/map/has/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Map.prototype.has()

The **`has()`** method of `Map` instances returns a boolean indicating whether an entry with the specified key <example-value> in this `Map` or not.

```js
const map = new Map();
map.set("bar", "foo");

console.log(map.has("bar"));
// Expected output: true

console.log(map.has("baz"));
// Expected output: false
```

## Syntax

```js
has(key)
```

### Parameters

- `key`
    The key of the entry to test for presence in the `Map` object. Object keys are compared by reference, not by value.

### Return value

Returns `true` if an entry with the specified key <example-value> in the `Map` object; otherwise `false`.

## Examples

### Using has()

```js
const myMap = new Map();
myMap.set("bar", "foo");

console.log(myMap.has("bar")); // true
console.log(myMap.has("baz")); // false
```

## See also

- `Map`
- `Map.prototype.delete()`
- `Map.prototype.get()`
- `Map.prototype.set()`
