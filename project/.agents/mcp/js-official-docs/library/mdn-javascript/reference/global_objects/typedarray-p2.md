---
title: "TypedArray (part 2 of 2)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/typedarray/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TypedArray (part 2 of 2)

## Instance methods

These methods are defined on the `TypedArray` prototype object and are thus shared by all `TypedArray` subclass instances.

- `TypedArray.prototype.at()`
    Takes an integer value and returns the item at that index. This method allows for negative integers, which count back from the last item.
- `TypedArray.prototype.copyWithin()`
    Copies a sequence of array elements within the array. See also `Array.prototype.copyWithin()`.
- `TypedArray.prototype.entries()`
    Returns a new _array iterator_ object that contains the key/value pairs for each index in the array. See also `Array.prototype.entries()`.
- `TypedArray.prototype.every()`
    Returns `false` if it finds an element in the array that does not satisfy the provided testing function. Otherwise, it returns `true`. See also `Array.prototype.every()`.
- `TypedArray.prototype.fill()`
    Fills all the elements of an array from a start index to an end index with a static value. See also `Array.prototype.fill()`.
- `TypedArray.prototype.filter()`
    Creates a new array with all of the elements of this array for which the provided filtering function returns `true`. See also `Array.prototype.filter()`.
- `TypedArray.prototype.find()`
    Returns the first `element` in the array that satisfies a provided testing function, or `undefined` if no appropriate element is found. See also `Array.prototype.find()`.
- `TypedArray.prototype.findIndex()`
    Returns the first index value in the array that has an element that satisfies a provided testing function, or `-1` if no appropriate element was found. See also `Array.prototype.findIndex()`.
- `TypedArray.prototype.findLast()`
    Returns the value of the last element in the array that satisfies a provided testing function, or `undefined` if no appropriate element is found. See also `Array.prototype.findLast()`.
- `TypedArray.prototype.findLastIndex()`
    Returns the index of the last element in the array that satisfies a provided testing function, or `-1` if no appropriate element was found. See also `Array.prototype.findLastIndex()`.
- `TypedArray.prototype.forEach()`
    Calls a function for each element in the array. See also `Array.prototype.forEach()`.
- `TypedArray.prototype.includes()`
    Determines whether a typed array includes a certain element, returning `true` or `false` as appropriate. See also `Array.prototype.includes()`.
- `TypedArray.prototype.indexOf()`
    Returns the first (least) index of an element within the array equal to the specified value, or `-1` if none is found. See also `Array.prototype.indexOf()`.
- `TypedArray.prototype.join()`
    Returns a new string that is the concatenation of all elements in this typed array, separated by commas or a specified separator string. See also `Array.prototype.join()`.
- `TypedArray.prototype.keys()`
    Returns a new array iterator that contains the keys for each index in the array. See also `Array.prototype.keys()`.
- `TypedArray.prototype.lastIndexOf()`
    Returns the last (greatest) index of an element within the array equal to the specified value, or `-1` if none is found. See also `Array.prototype.lastIndexOf()`.
- `TypedArray.prototype.map()`
    Creates a new array with the results of calling a provided function on every element in this array. See also `Array.prototype.map()`.
- `TypedArray.prototype.reduce()`
    Apply a function against an accumulator and each value of the array (from left-to-right) as to reduce it to a single value. See also `Array.prototype.reduce()`.
- `TypedArray.prototype.reduceRight()`
    Apply a function against an accumulator and each value of the array (from right-to-left) as to reduce it to a single value. See also `Array.prototype.reduceRight()`.
- `TypedArray.prototype.reverse()`
    Reverses the order of the elements of an array — the first becomes the last, and the last becomes the first. See also `Array.prototype.reverse()`.
- `TypedArray.prototype.set()`
    Stores multiple values in the typed array, reading input values from a specified array.
- `TypedArray.prototype.slice()`
    Extracts a section of an array and returns a new array. See also `Array.prototype.slice()`.
- `TypedArray.prototype.some()`
    Returns `true` if it finds an element in the array that satisfies the provided testing function. Otherwise, it returns `false`. See also `Array.prototype.some()`.
- `TypedArray.prototype.sort()`
    Sorts the elements of an array in place and returns the array. See also `Array.prototype.sort()`.
- `TypedArray.prototype.subarray()`
    Returns a new `TypedArray` from the given start and end element index.
- `TypedArray.prototype.toLocaleString()`
    Returns a localized string representing the array and its elements. See also `Array.prototype.toLocaleString()`.
- `TypedArray.prototype.toReversed()`
    Returns a new array with the elements in reversed order, without modifying the original array.
- `TypedArray.prototype.toSorted()`
    Returns a new array with the elements sorted in ascending order, without modifying the original array.
- `TypedArray.prototype.toString()`
    Returns a string representing the array and its elements. See also `Array.prototype.toString()`.
- `TypedArray.prototype.values()`
    Returns a new _array iterator_ object that contains the values for each index in the array. See also `Array.prototype.values()`.
- `TypedArray.prototype.with()`
    Returns a new array with the element at the given index replaced with the given value, without modifying the original array.
- `TypedArray.prototype[Symbol.iterator]()`
    Returns a new _array iterator_ object that contains the values for each index in the array.

## Examples

### Property access

You can reference elements in the array using standard array index syntax (that is,
using bracket notation). However, getting or setting indexed properties on typed arrays
will not search in the prototype chain for this property, even when the indices are out
of bound. Indexed properties will consult the `ArrayBuffer` and will never
look at object properties. You can still use named properties, just like with all
objects.

```js
// Setting and getting using standard array syntax
const int16 = new Int16Array(2);
int16[0] = 42;
console.log(int16[0]); // 42

// Indexed properties on prototypes are not consulted (Fx 25)
Int8Array.prototype[20] = "foo";
new Int8Array(32)[20]; // 0
// even when out of bound
Int8Array.prototype[20] = "foo";
new Int8Array(8)[20]; // undefined
// or with negative integers
Int8Array.prototype[-1] = "foo";
new Int8Array(8)[-1]; // undefined

// Named properties are allowed, though (Fx 30)
Int8Array.prototype.foo = "bar";
new Int8Array(32).foo; // "bar"
```

### Cannot be frozen

`TypedArray`s that aren't empty cannot be frozen, as their
underlying `ArrayBuffer` could be mutated through another
`TypedArray` view of the buffer. This would mean that the object
would never genuinely be frozen.

```js
const i8 = Int8Array.of(1, 2, 3);
Object.freeze(i8);
// TypeError: Cannot freeze array buffer views with elements
```

### ByteOffset must be aligned

When constructing a `TypedArray` as a view onto an
`ArrayBuffer`, the `byteOffset` argument must be aligned to its
element size; in other words, the offset must be a multiple of
`BYTES_PER_ELEMENT`.

```js
const i32 = new Int32Array(new ArrayBuffer(4), 1);
// RangeError: start offset of Int32Array should be a multiple of 4
```

```js
const i32 = new Int32Array(new ArrayBuffer(4), 0);
```

### ByteLength must be aligned

Like the `byteOffset` parameter, the `byteLength` property of an
`ArrayBuffer` passed to a `TypedArray`'s constructor
must be a multiple of the constructor's `BYTES_PER_ELEMENT`.

```js
const i32 = new Int32Array(new ArrayBuffer(3));
// RangeError: byte length of Int32Array should be a multiple of 4
```

```js
const i32 = new Int32Array(new ArrayBuffer(4));
```

## See also

- Polyfill of typed arrays in `core-js`
- JavaScript typed arrays guide
- `ArrayBuffer`
- `DataView`
- `TextDecoder`
