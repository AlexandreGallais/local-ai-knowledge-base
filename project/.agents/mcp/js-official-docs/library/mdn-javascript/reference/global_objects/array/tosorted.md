---
title: "Array.prototype.toSorted()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/array/tosorted/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Array.prototype.toSorted()

The **`toSorted()`** method of `Array` instances is the copying version of the `sort()` method. It returns a new array with the elements sorted in ascending order.

## Syntax

```js
toSorted()
toSorted(compareFn)
```

### Parameters

- `compareFn` (optional)
    A function that determines the order of the elements. If omitted, the array elements are converted to strings, then sorted according to each character's Unicode code point value. See `sort()` for more information.

### Return value

A new array with the elements sorted in ascending order.

## Description

See `sort()` for more information on the `compareFn` parameter.

When used on sparse arrays, the `toSorted()` method iterates empty slots as if they have the value `undefined`.

The `toSorted()` method is generic. It only expects the `this` value to have a `length` property and integer-keyed properties.

## Examples

### Sorting an array

```js
const months = ["Mar", "Jan", "Feb", "Dec"];
const sortedMonths = months.toSorted();
console.log(sortedMonths); // ['Dec', 'Feb', 'Jan', 'Mar']
console.log(months); // ['Mar', 'Jan', 'Feb', 'Dec']

const values = [1, 10, 21, 2];
const sortedValues = values.toSorted((a, b) => a - b);
console.log(sortedValues); // [1, 2, 10, 21]
console.log(values); // [1, 10, 21, 2]
```

For more usage examples, see `sort()`.

### Using toSorted() on sparse arrays

Empty slots are sorted as if they have the value `undefined`. They are always sorted to the end of the array and `compareFn` is not called for them.

```js
console.log(["a", "c", , "b"].toSorted()); // ['a', 'b', 'c', undefined]
console.log([, undefined, "a", "b"].toSorted()); // ["a", "b", undefined, undefined]
```

### Calling toSorted() on non-array objects

The `toSorted()` method reads the `length` property of `this`. It then collects all existing integer-keyed properties in the range of `0` to `length - 1`, sorts them, and writes them into a new array.

```js
const arrayLike = {
  length: 3,
  unrelated: "foo",
  0: 5,
  2: 4,
  3: 3, // ignored by toSorted() since length is 3
};
console.log(Array.prototype.toSorted.call(arrayLike));
// [4, 5, undefined]
```

## See also

- Polyfill of `Array.prototype.toSorted` in `core-js`
- es-shims polyfill of `Array.prototype.toSorted`
- Indexed collections guide
- `Array.prototype.sort()`
- `Array.prototype.toReversed()`
- `Array.prototype.toSpliced()`
- `Array.prototype.with()`
- `TypedArray.prototype.toSorted()`
