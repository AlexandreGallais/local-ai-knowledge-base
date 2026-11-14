---
title: "Array.prototype.reverse()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/array/reverse/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Array.prototype.reverse()

The **`reverse()`** method of `Array` instances reverses an array _in place_ and returns the reference to the same array, the first array element now becoming the last, and the last array element becoming the first. In other words, elements order in the array will be turned towards the direction opposite to that previously stated.

To reverse the elements in an array without mutating the original array, use `toReversed()`.

```js
const array = ["one", "two", "three"];
console.log("array:", array);
// Expected output: "array:" Array ["one", "two", "three"]

const reversed = array.reverse();
console.log("reversed:", reversed);
// Expected output: "reversed:" Array ["three", "two", "one"]

// Careful: reverse is destructive -- it changes the original array.
console.log("array:", array);
// Expected output: "array:" Array ["three", "two", "one"]
```

## Syntax

```js
reverse()
```

### Parameters

None.

### Return value

The reference to the original array, now reversed. Note that the array is reversed _in place_, and no copy is made.

## Description

The `reverse()` method transposes the elements of the calling array object in
place, mutating the array, and returning a reference to the array.

The `reverse()` method preserves empty slots. If the source array is sparse, the empty slots' corresponding new indices are deleted and also become empty slots.

The `reverse()` method is generic. It only expects the `this` value to have a `length` property and integer-keyed properties. Although strings are also array-like, this method is not suitable to be applied on them, as strings are immutable.

## Examples

### Reversing the elements in an array

The following example creates an array `items`, containing three elements, then
reverses the array. The call to `reverse()` returns a reference to the
reversed array `items`.

```js
const items = [1, 2, 3];
console.log(items); // [1, 2, 3]

items.reverse();
console.log(items); // [3, 2, 1]
```

### The reverse() method returns the reference to the same array

The `reverse()` method returns reference to the original array, so mutating the returned array will mutate the original array as well.

```js
const numbers = [3, 2, 4, 1, 5];
const reversed = numbers.reverse();
// numbers and reversed are both in reversed order [5, 1, 4, 2, 3]
reversed[0] = 5;
console.log(numbers[0]); // 5
```

In case you want `reverse()` to not mutate the original array, but return a shallow-copied array like other array methods (e.g., `map()`) do, use the `toReversed()` method. Alternatively, you can do a shallow copy before calling `reverse()`, using the spread syntax or `Array.from()`.

```js
const numbers = [3, 2, 4, 1, 5];
// [...numbers] creates a shallow copy, so reverse() does not mutate the original
const reverted = [...numbers].reverse();
reverted[0] = 5;
console.log(numbers[0]); // 3
```

### Using reverse() on sparse arrays

Sparse arrays remain sparse after calling `reverse()`. Empty slots are copied over to their respective new indices as empty slots.

```js
console.log([1, , 3].reverse()); // [3, empty, 1]
console.log([1, , 3, 4].reverse()); // [4, 3, empty, 1]
```

### Calling reverse() on non-array objects

The `reverse()` method reads the `length` property of `this`. It then visits each property having an integer key <example-value> `0` and `length / 2`, and swaps the two corresponding indices on both ends, deleting any destination property for which the source property did not exist.

```js
const arrayLike = {
  length: 3,
  unrelated: "foo",
  2: 4,
  3: 33, // ignored by reverse() since length is 3
};
console.log(Array.prototype.reverse.call(arrayLike));
// { 0: 4, 3: 33, length: 3, unrelated: 'foo' }
// The index 2 is deleted because there was no index 0 present originally
// The index 3 is unchanged since the length is 3
```

## See also

- Polyfill of `Array.prototype.reverse` in `core-js`
- es-shims polyfill of `Array.prototype.reverse`
- Indexed collections guide
- `Array`
- `Array.prototype.join()`
- `Array.prototype.sort()`
- `Array.prototype.toReversed()`
- `TypedArray.prototype.reverse()`
