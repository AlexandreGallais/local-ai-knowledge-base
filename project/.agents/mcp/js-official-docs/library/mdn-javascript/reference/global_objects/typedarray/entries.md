---
title: "TypedArray.prototype.entries()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/typedarray/entries/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TypedArray.prototype.entries()

The **`entries()`** method of `TypedArray` instances returns a new _array iterator_ object that contains the key/value pairs for each index in the typed array. This method has the same algorithm as `Array.prototype.entries()`.

```js
const uint8 = new Uint8Array([10, 20, 30, 40, 50]);
const eArr = uint8.entries();

eArr.next();
eArr.next();

console.log(eArr.next().value);
// Expected output: Array [2, 30]
```

## Syntax

```js
entries()
```

### Parameters

None.

### Return value

A new iterable iterator object.

## Description

See `Array.prototype.entries()` for more details. This method is not generic and can only be called on typed array instances.

## Examples

### Iteration using for...of loop

```js
const array = new Uint8Array([10, 20, 30, 40, 50]);
const arrayEntries = arr.entries();
for (const element of arrayEntries) {
  console.log(element);
}
```

### Alternative iteration

```js
const array = new Uint8Array([10, 20, 30, 40, 50]);
const arrayEntries = arr.entries();

console.log(arrayEntries.next().value); // [0, 10]
console.log(arrayEntries.next().value); // [1, 20]
console.log(arrayEntries.next().value); // [2, 30]
console.log(arrayEntries.next().value); // [3, 40]
console.log(arrayEntries.next().value); // [4, 50]
```

## See also

- Polyfill of `TypedArray.prototype.entries` in `core-js`
- JavaScript typed arrays guide
- `TypedArray`
- `TypedArray.prototype.keys()`
- `TypedArray.prototype.values()`
- `TypedArray.prototype[Symbol.iterator]()`
- `Array.prototype.entries()`
- Iteration protocols
