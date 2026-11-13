---
title: "Map.prototype.values()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/map/values/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Map.prototype.values()

The **`values()`** method of `Map` instances returns a new _map iterator_ object that contains the values for each element in this map in insertion order.

```js
const map = new Map();

map.set("0", "foo");
map.set(1, "bar");

const iterator = map.values();

console.log(iterator.next().value);
// Expected output: "foo"

console.log(iterator.next().value);
// Expected output: "bar"
```

## Syntax

```js
values()
```

### Parameters

None.

### Return value

A new iterable iterator object.

## Examples

### Using values()

```js
const myMap = new Map();
myMap.set("0", "foo");
myMap.set(1, "bar");
myMap.set({}, "baz");

const mapIter = myMap.values();

console.log(mapIter.next().value); // "foo"
console.log(mapIter.next().value); // "bar"
console.log(mapIter.next().value); // "baz"
```

## See also

- `Map.prototype.entries()`
- `Map.prototype.keys()`
