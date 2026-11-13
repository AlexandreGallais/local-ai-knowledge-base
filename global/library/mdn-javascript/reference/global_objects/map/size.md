---
title: "Map.prototype.size"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/map/size/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Map.prototype.size

The **`size`** accessor property of `Map` instances returns the number of elements in this map.

```js
const map = new Map();

map.set("a", "alpha");
map.set("b", "beta");
map.set("g", "gamma");

console.log(map.size);
// Expected output: 3
```

## Description

The value of `size` is an integer representing how many entries the `Map` object
has. A set accessor function for `size` is `undefined`; you cannot change this
property.

## Examples

### Using size

```js
const myMap = new Map();
myMap.set("a", "alpha");
myMap.set("b", "beta");
myMap.set("g", "gamma");

console.log(myMap.size); // 3
```

## See also

- `Map`
