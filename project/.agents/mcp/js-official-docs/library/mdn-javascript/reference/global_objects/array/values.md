---
title: "Array.prototype.values()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/array/values/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Array.prototype.values()

The **`values()`** method of `Array` instances returns a new _array iterator_ object that iterates the value of each item in the array.

```js
const array = ["a", "b", "c"];
const iterator = array.values();

for (const value of iterator) {
  console.log(value);
}

// Expected output: "a"
// Expected output: "b"
// Expected output: "c"
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

`Array.prototype.values()` is the default implementation of `Array.prototype[Symbol.iterator]()`.

```js
Array.prototype.values === Array.prototype[Symbol.iterator]; // true
```

When used on sparse arrays, the `values()` method iterates empty slots as if they have the value `undefined`.

The `values()` method is generic. It only expects the `this` value to have a `length` property and integer-keyed properties.

## Examples

### Iteration using for...of loop

Because `values()` returns an iterable iterator, you can use a `for...of` loop to iterate it.

```js
const arr = ["a", "b", "c", "d", "e"];
const iterator = arr.values();

for (const letter of iterator) {
  console.log(letter);
} // "a" "b" "c" "d" "e"
```

### Iteration using next()

Because the return value is also an iterator, you can directly call its `next()` method.

```js
const arr = ["a", "b", "c", "d", "e"];
const iterator = arr.values();
iterator.next(); // { value: "a", done: false }
iterator.next(); // { value: "b", done: false }
iterator.next(); // { value: "c", done: false }
iterator.next(); // { value: "d", done: false }
iterator.next(); // { value: "e", done: false }
iterator.next(); // { value: undefined, done: true }
console.log(iterator.next().value); // undefined
```

### Reusing the iterable

> **Warning:**
> The array iterator object should be a one-time use object. Do not reuse it.

The iterable returned from `values()` is not reusable. When `next().done = true` or `currentIndex > length`, the `for...of` loop ends, and further iterating it has no effect.

```js
const arr = ["a", "b", "c", "d", "e"];
const values = arr.values();
for (const letter of values) {
  console.log(letter);
}
// "a" "b" "c" "d" "e"
for (const letter of values) {
  console.log(letter);
}
// No output
```

If you use a `break` statement to end the iteration early, the iterator can resume from the current position when continuing to iterate it.

```js
const arr = ["a", "b", "c", "d", "e"];
const values = arr.values();
for (const letter of values) {
  console.log(letter);
  if (letter === "b") {
    break;
  }
}
// "a" "b"

for (const letter of values) {
  console.log(letter);
}
// "c" "d" "e"
```

### Mutations during iteration

There are no values stored in the array iterator object returned from `values()`; instead, it stores the address of the array used in its creation, and reads the currently visited index on each iteration. Therefore, its iteration output depends on the value stored in that index at the time of stepping. If the values in the array changed, the array iterator object's values change too.

```js
const arr = ["a", "b", "c", "d", "e"];
const iterator = arr.values();
console.log(iterator); // Array Iterator { }
console.log(iterator.next().value); // "a"
arr[1] = "n";
console.log(iterator.next().value); // "n"
```

Unlike iterative methods, the array iterator object does not save the array's length at the time of its creation, but reads it once on each iteration. Therefore, if the array grows during iteration, the iterator will visit the new elements too. This may lead to infinite loops.

```js
const arr = [1, 2, 3];
for (const e of arr) {
  arr.push(e * 10);
}
// RangeError: invalid array length
```

### Iterating sparse arrays

`values()` will visit empty slots as if they are `undefined`.

```js
for (const element of [, "a"].values()) {
  console.log(element);
}
// undefined
// 'a'
```

### Calling values() on non-array objects

The `values()` method reads the `length` property of `this` and then accesses each property whose key is a nonnegative integer less than `length`.

```js
const arrayLike = {
  length: 3,
  0: "a",
  1: "b",
  2: "c",
  3: "d", // ignored by values() since length is 3
};
for (const entry of Array.prototype.values.call(arrayLike)) {
  console.log(entry);
}
// a
// b
// c
```

## See also

- Polyfill of `Array.prototype.values` in `core-js`
- es-shims polyfill of `Array.prototype.values`
- Indexed collections guide
- `Array`
- `Array.prototype.entries()`
- `Array.prototype.keys()`
- `Array.prototype[Symbol.iterator]()`
- `TypedArray.prototype.values()`
- Iteration protocols
