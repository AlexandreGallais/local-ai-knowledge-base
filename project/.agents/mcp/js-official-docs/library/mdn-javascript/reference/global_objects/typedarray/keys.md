---
title: "TypedArray.prototype.keys()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/typedarray/keys/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TypedArray.prototype.keys()

The **`keys()`** method of `TypedArray` instances returns a new _array iterator_ object that contains the keys for each index in the typed array. This method has the same algorithm as `Array.prototype.keys()`.

```js
const uint8 = new Uint8Array([10, 20, 30, 40, 50]);
const keys = uint8.keys();

keys.next();
keys.next();

console.log(keys.next().value);
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

See `Array.prototype.keys()` for more details. This method is not generic and can only be called on typed array instances.

## Examples

### Iteration using for...of loop

```js
const arr = new Uint8Array([10, 20, 30, 40, 50]);
const arrKeys = arr.keys();
for (const n of arrKeys) {
  console.log(n);
}
```

### Alternative iteration

```js
const arr = new Uint8Array([10, 20, 30, 40, 50]);
const arrKeys = arr.keys();
console.log(arrKeys.next().value); // 0
console.log(arrKeys.next().value); // 1
console.log(arrKeys.next().value); // 2
console.log(arrKeys.next().value); // 3
console.log(arrKeys.next().value); // 4
```

## See also

- Polyfill of `TypedArray.prototype.keys` in `core-js`
- JavaScript typed arrays guide
- `TypedArray`
- `TypedArray.prototype.entries()`
- `TypedArray.prototype.values()`
- `TypedArray.prototype[Symbol.iterator]()`
- `Array.prototype.keys()`
- Iteration protocols
