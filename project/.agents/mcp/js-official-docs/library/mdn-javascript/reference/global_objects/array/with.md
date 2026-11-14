---
title: "Array.prototype.with()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/array/with/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Array.prototype.with()

The **`with()`** method of `Array` instances is the copying version of using the bracket notation to change the value of a given index. It returns a new array with the element at the given index replaced with the given value.

## Syntax

```js
arrayInstance.with(index, value)
```

### Parameters

- `index`
    Zero-based index at which to change the array, converted to an integer.
    - Negative index counts back from the end of the array — if `-array.length <= index < 0`, `index + array.length` is used.
    - If the index after normalization is out of bounds, a `RangeError` is thrown.
- `value`
    Any value to be assigned to the given index.

### Return value

A new array with the element at `index` replaced with `value`.

### Exceptions

- `RangeError`
    Thrown if `index >= array.length` or `index < -array.length`.

## Description

The `with()` method changes the value of a given index in the array, returning a new array with the element at the given index replaced with the given value. The original array is not modified. This allows you to chain array methods while doing manipulations.

By combining `with()` with `at()`, you can both write and read (respectively) an array using negative indices.

The `with()` method never produces a sparse array. If the source array is sparse, the empty slots will be replaced with `undefined` in the new array.

The `with()` method is generic. It only expects the `this` value to have a `length` property and integer-keyed properties.

## Examples

### Creating a new array with a single element changed

```js
const arr = [1, 2, 3, 4, 5];
console.log(arr.with(2, 6)); // [1, 2, 6, 4, 5]
console.log(arr); // [1, 2, 3, 4, 5]
```

### Chaining array methods

With the `with()` method, you can update a single element in an array and then apply other array methods.

```js
const arr = [1, 2, 3, 4, 5];
console.log(arr.with(2, 6).map((x) => x ** 2)); // [1, 4, 36, 16, 25]
```

### Using with() on sparse arrays

The `with()` method always creates a dense array.

```js
const arr = [1, , 3, 4, , 6];
console.log(arr.with(0, 2)); // [2, undefined, 3, 4, undefined, 6]
```

### Calling with() on non-array objects

The `with()` method creates and returns a new array. It reads the `length` property of `this` and then accesses each property whose key is a nonnegative integer less than `length`. As each property of `this` is accessed, the array element having an index equal to the key of the property is set to the value of the property. Finally, the array value at `index` is set to `value`.

```js
const arrayLike = {
  length: 3,
  unrelated: "foo",
  0: 5,
  2: 4,
  3: 3, // ignored by with() since length is 3
};
console.log(Array.prototype.with.call(arrayLike, 0, 1));
// [ 1, undefined, 4 ]
```

## See also

- Polyfill of `Array.prototype.with` in `core-js`
- es-shims polyfill of `Array.prototype.with`
- Indexed collections guide
- `Array.prototype.toReversed()`
- `Array.prototype.toSorted()`
- `Array.prototype.toSpliced()`
- `Array.prototype.at()`
- `TypedArray.prototype.with()`
