---
title: "Map.prototype[Symbol.iterator]()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/map/symbol.iterator/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Map.prototype[Symbol.iterator]()

The **`Symbol.iterator`** method of `Map` instances implements the iterable protocol and allows `Map` objects to be consumed by most syntaxes expecting iterables, such as the spread syntax and `for...of` loops. It returns a map iterator object that yields the key-value pairs of the map in insertion order.

The initial value of this property is the same function object as the initial value of the `Map.prototype.entries` property.

```js
const map = new Map();

map.set("0", "foo");
map.set(1, "bar");

const iterator = map[Symbol.iterator]();

for (const item of iterator) {
  console.log(item);
}
// Expected output: Array ["0", "foo"]
// Expected output: Array [1, "bar"]
```

## Syntax

```js
map[Symbol.iterator]()
```

### Parameters

None.

### Return value

The same return value as `Map.prototype.entries()`: a new iterable iterator object that yields the key-value pairs of the map.

## Examples

### Iteration using for...of loop

Note that you seldom need to call this method directly. The existence of the `Symbol.iterator` method makes `Map` objects iterable, and iterating syntaxes like the `for...of` loop automatically call this method to obtain the iterator to loop over.

```js
const myMap = new Map();
myMap.set("0", "foo");
myMap.set(1, "bar");
myMap.set({}, "baz");

for (const entry of myMap) {
  console.log(entry);
}
// ["0", "foo"]
// [1, "bar"]
// [{}, "baz"]

for (const [key, value] of myMap) {
  console.log(`${key}: ${value}`);
}
// 0: foo
// 1: bar
// [Object]: baz
```

### Manually hand-rolling the iterator

You may still manually call the `next()` method of the returned iterator object to achieve maximum control over the iteration process.

```js
const myMap = new Map();
myMap.set("0", "foo");
myMap.set(1, "bar");
myMap.set({}, "baz");

const mapIter = myMap[Symbol.iterator]();

console.log(mapIter.next().value); // ["0", "foo"]
console.log(mapIter.next().value); // [1, "bar"]
console.log(mapIter.next().value); // [Object, "baz"]
```

## See also

- `Map`
- `Map.prototype.entries()`
- `Map.prototype.keys()`
- `Map.prototype.values()`
- `Symbol.iterator`
- Iteration protocols
