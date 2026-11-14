---
title: "TypedArray.prototype.values()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/typedarray/values/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TypedArray.prototype.values()

The **`values()`** method of `TypedArray` instances returns a new _array iterator_ object that iterates the value of each item in the typed array. This method has the same algorithm as `Array.prototype.values()`.

```js
const bytes = new Uint8Array([10, 20, 30, 40, 50]);
const iterator = bytes.values();

iterator.next();
iterator.next();

console.log(iterator.next().value);
// Expected output: 30
```

## Syntax

```js
values()
```

### Parameters

None.

### Return value

A new iterable iterator object.

## Description

See `Array.prototype.values()` for more details. This method is not generic and can only be called on typed array instances.

## Examples

### Iteration using for...of loop

```js
const arr = new Uint8Array([10, 20, 30, 40, 50]);
const values = arr.values();
for (const n of values) {
  console.log(n);
}
```

### Alternative iteration

```js
const arr = new Uint8Array([10, 20, 30, 40, 50]);
const values = arr.values();
console.log(values.next().value); // 10
console.log(values.next().value); // 20
console.log(values.next().value); // 30
console.log(values.next().value); // 40
console.log(values.next().value); // 50
```

## See also

- Polyfill of `TypedArray.prototype.values` in `core-js`
- JavaScript typed arrays guide
- `TypedArray`
- `TypedArray.prototype.entries()`
- `TypedArray.prototype.keys()`
- `TypedArray.prototype[Symbol.iterator]()`
- `Array.prototype.values()`
- Iteration protocols
