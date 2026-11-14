---
title: "Map.prototype.delete()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/map/delete/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Map.prototype.delete()

The **`delete()`** method of `Map` instances removes the entry specified by the key from this `Map`.

```js
const map = new Map();
map.set("bar", "foo");

console.log(map.delete("bar"));
// Expected result: true
// True indicates successful removal

console.log(map.has("bar"));
// Expected result: false
```

## Syntax

```js
mapInstance.delete(key)
```

### Parameters

- `key`
    The key of the entry to remove from the `Map` object. Object keys are compared by reference, not by value.

### Return value

`true` if an entry in the `Map` object has been removed successfully. `false` if the key is not found in the `Map`.

## Examples

### Using delete()

```js
const myMap = new Map();
myMap.set("bar", "foo");

console.log(myMap.delete("bar")); // Returns true. Successfully removed.
console.log(myMap.has("bar")); // Returns false. The "bar" element is no longer present.
```

## See also

- `Map`
- `Map.prototype.clear()`
- `Map.prototype.get()`
- `Map.prototype.set()`
- `Map.prototype.has()`
