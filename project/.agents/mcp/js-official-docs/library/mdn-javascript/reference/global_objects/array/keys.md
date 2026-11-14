---
title: "Array.prototype.keys()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/array/keys/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Array.prototype.keys()

The **`keys()`** method of `Array` instances returns a new _array iterator_ object that contains the keys for each index in the array.

```js
const array = ["a", "b", "c"];
const iterator = array.keys();

for (const key of iterator) {
  console.log(key);
}

// Expected output: 0
// Expected output: 1
// Expected output: 2
```

## Syntax

```js
keys()
```

### Parameters

None.

### Return value

A new iterable iterator object.

## Description

When used on sparse arrays, the `keys()` method iterates empty slots as if they have the value `undefined`.

The `keys()` method is generic. It only expects the `this` value to have a `length` property and integer-keyed properties.

## Examples

### Using keys() on sparse arrays

Unlike `Object.keys()`, which only includes keys that actually exist in the array, the `keys()` iterator doesn't ignore holes representing missing properties.

```js
const arr = ["a", , "c"];
const sparseKeys = Object.keys(arr);
const denseKeys = [...arr.keys()];
console.log(sparseKeys); // ['0', '2']
console.log(denseKeys); // [0, 1, 2]
```

### Calling keys() on non-array objects

The `keys()` method reads the `length` property of `this` and then yields all integer indices between 0 and `length - 1`. No index access actually happens.

```js
const arrayLike = {
  length: 3,
};
for (const entry of Array.prototype.keys.call(arrayLike)) {
  console.log(entry);
}
// 0
// 1
// 2
```

## See also

- Polyfill of `Array.prototype.keys` in `core-js`
- es-shims polyfill of `Array.prototype.keys`
- Indexed collections guide
- `Array`
- `Array.prototype.entries()`
- `Array.prototype.values()`
- `Array.prototype[Symbol.iterator]()`
- `TypedArray.prototype.keys()`
- Iteration protocols
