---
title: "Array.prototype.toReversed()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/array/toreversed/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Array.prototype.toReversed()

The **`toReversed()`** method of `Array` instances is the copying counterpart of the `reverse()` method. It returns a new array with the elements in reversed order.

## Syntax

```js
toReversed()
```

### Parameters

None.

### Return value

A new array containing the elements in reversed order.

## Description

The `toReversed()` method transposes the elements of the calling array object in reverse order and returns a new array.

When used on sparse arrays, the `toReversed()` method iterates empty slots as if they have the value `undefined`.

The `toReversed()` method is generic. It only expects the `this` value to have a `length` property and integer-keyed properties.

## Examples

### Reversing the elements in an array

The following example creates an array `items`, containing three elements, then creates a new array that's the reverse of `items`. The `items` array remains unchanged.

```js
const items = [1, 2, 3];
console.log(items); // [1, 2, 3]

const reversedItems = items.toReversed();
console.log(reversedItems); // [3, 2, 1]
console.log(items); // [1, 2, 3]
```

### Using toReversed() on sparse arrays

The return value of `toReversed()` is never sparse. Empty slots become `undefined` in the returned array.

```js
console.log([1, , 3].toReversed()); // [3, undefined, 1]
console.log([1, , 3, 4].toReversed()); // [4, 3, undefined, 1]
```

### Calling toReversed() on non-array objects

The `toReversed()` method reads the `length` property of `this`. It then visits each property having an integer key <example-value> `length - 1` and `0` in descending order, adding the value of the current property to the end of the array to be returned.

```js
const arrayLike = {
  length: 3,
  unrelated: "foo",
  2: 4,
};
console.log(Array.prototype.toReversed.call(arrayLike));
// [4, undefined, undefined]
// The '0' and '1' indices are not present so they become undefined
```

## See also

- Polyfill of `Array.prototype.toReversed` in `core-js`
- es-shims polyfill of `Array.prototype.toReversed`
- Indexed collections guide
- `Array.prototype.reverse()`
- `Array.prototype.toSorted()`
- `Array.prototype.toSpliced()`
- `Array.prototype.with()`
- `TypedArray.prototype.toReversed()`
