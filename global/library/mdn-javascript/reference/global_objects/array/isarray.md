---
title: "Array.isArray()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/array/isarray/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Array.isArray()

The **`Array.isArray()`** static method determines whether the passed value is an `Array`.

```js
console.log(Array.isArray([1, 3, 5]));
// Expected output: true

console.log(Array.isArray("[]"));
// Expected output: false

console.log(Array.isArray(new Array(5)));
// Expected output: true

console.log(Array.isArray(new Int16Array([15, 33])));
// Expected output: false
```

## Syntax

```js
Array.isArray(value)
```

### Parameters

- `value`
    The value to be checked.

### Return value

`true` if `value` is an `Array`; otherwise, `false`. `false` is always returned if `value` is a `TypedArray` instance.

## Description

`Array.isArray()` checks if the passed value is an `Array`. It performs a _branded check_, similar to the `in` operator, for a private field initialized by the `Array()` constructor.

It is a more robust alternative to `instanceof Array` because it avoids false positives and false negatives:

- `Array.isArray()` rejects values that aren't actual `Array` instances, even if they have `Array.prototype` in their prototype chain — `instanceof Array` would accept these as it does check the prototype chain.
- `Array.isArray()` accepts `Array` objects constructed in another realm — `instanceof Array` returns `false` for these because the identity of the `Array` constructor is different across realms.

See the article "Determining with absolute accuracy whether or not a JavaScript object is an array" for more details.

## Examples

### Using Array.isArray()

```js
// all following calls return true
Array.isArray([]);
Array.isArray([1]);
Array.isArray(new Array());
Array.isArray(new Array("a", "b", "c", "d"));
Array.isArray(new Array(3));
// Little known fact: Array.prototype itself is an array:
Array.isArray(Array.prototype);

// all following calls return false
Array.isArray();
Array.isArray({});
Array.isArray(null);
Array.isArray(undefined);
Array.isArray(17);
Array.isArray("Array");
Array.isArray(true);
Array.isArray(false);
Array.isArray(new Uint8Array(32));
// This is not an array, because it was not created using the
// array literal syntax or the Array constructor
Array.isArray({ __proto__: Array.prototype });
```

### instanceof vs. Array.isArray()

When checking for `Array` instance, `Array.isArray()` is preferred over `instanceof` because it works across realms.

```js
const iframe = document.createElement("iframe");
document.body.appendChild(iframe);
const xArray = window.frames[window.frames.length - 1].Array;
const arr = new xArray(1, 2, 3); // [1, 2, 3]

// Correctly checking for Array
Array.isArray(arr); // true
// The prototype of arr is xArray.prototype, which is a
// different object from Array.prototype
arr instanceof Array; // false
```

## See also

- Polyfill of `Array.isArray` in `core-js`
- es-shims polyfill of `Array.isArray`
- Indexed collections guide
- `Array`
