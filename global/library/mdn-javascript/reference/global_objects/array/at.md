---
title: "Array.prototype.at()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/array/at/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Array.prototype.at()

The **`at()`** method of `Array` instances takes an integer value and returns the item at that index, allowing for positive and negative integers. Negative integers count back from the last item in the array.

```js
const array = [5, 12, 8, 130, 44];

let index = 2;

console.log(`An index of ${index} returns ${array.at(index)}`);
// Expected output: "An index of 2 returns 8"

index = -2;

console.log(`An index of ${index} returns ${array.at(index)}`);
// Expected output: "An index of -2 returns 130"
```

## Syntax

```js
at(index)
```

### Parameters

- `index`
    Zero-based index of the array element to be returned, converted to an integer. Negative index counts back from the end of the array — if `index < 0`, `index + array.length` is accessed.

### Return value

The element in the array matching the given index. Always returns `undefined` if `index < -array.length` or `index >= array.length` without attempting to access the corresponding property.

## Description

The `at()` method is equivalent to the bracket notation when `index` is a non-negative integer. For example, `array[0]` and `array.at(0)` both return the first item. However, when counting elements from the end of the array, you cannot use `array[-1]` like you may in Python or R, because all values inside the square brackets are treated literally as string properties, so you will end up reading `array["-1"]`, which is just a normal string property instead of an array index.

The usual practice is to access `length` and calculate the index from that — for example, `array[array.length - 1]`. The `at()` method allows relative indexing, so this can be shortened to `array.at(-1)`.

By combining `at()` with `with()`, you can both read and write (respectively) an array using negative indices.

The `at()` method is generic. It only expects the `this` value to have a `length` property and integer-keyed properties.

## Examples

### Return the last value of an array

The following example provides a function which returns the last element found in a specified array.

```js
// Our array with items
const cart = ["apple", "banana", "pear"];

// A function which returns the last item of a given array
function returnLast(arr) {
  return arr.at(-1);
}

// Get the last item of our array 'cart'
const item1 = returnLast(cart);
console.log(item1); // 'pear'

// Add an item to our 'cart' array
cart.push("orange");
const item2 = returnLast(cart);
console.log(item2); // 'orange'
```

### Comparing methods

This example compares different ways to select the penultimate (last but one) item of an `Array`. While all the methods shown below are valid, this example highlights the succinctness and readability of the `at()` method.

```js
// Our array with items
const colors = ["red", "green", "blue"];

// Using length property
const lengthWay = colors[colors.length - 2];
console.log(lengthWay); // 'green'

// Using slice() method. Note an array is returned
const sliceWay = colors.slice(-2, -1);
console.log(sliceWay[0]); // 'green'

// Using at() method
const atWay = colors.at(-2);
console.log(atWay); // 'green'
```

### Calling at() on non-array objects

The `at()` method reads the `length` property of `this` and calculates the index to access.

```js
const arrayLike = {
  length: 2,
  0: "a",
  1: "b",
  2: "c", // ignored by at() since length is 2
};
console.log(Array.prototype.at.call(arrayLike, 0)); // "a"
console.log(Array.prototype.at.call(arrayLike, 2)); // undefined
```

## See also

- Polyfill of `Array.prototype.at` in `core-js`
- es-shims polyfill of `Array.prototype.at`
- Indexed collections guide
- `Array`
- `Array.prototype.findIndex()`
- `Array.prototype.indexOf()`
- `Array.prototype.with()`
- `TypedArray.prototype.at()`
- `String.prototype.at()`
