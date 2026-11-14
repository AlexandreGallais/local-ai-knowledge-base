---
title: "Array.from()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/array/from/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Array.from()

The **`Array.from()`** static method creates a new, shallow-copied `Array` instance from an iterable or array-like object.

```js
console.log(Array.from("foo"));
// Expected output: Array ["f", "o", "o"]

console.log(Array.from([1, 2, 3], (x) => x + x));
// Expected output: Array [2, 4, 6]
```

## Syntax

```js
Array.from(items)
Array.from(items, mapFn)
Array.from(items, mapFn, thisArg)
```

### Parameters

- `items`
    An iterable or array-like object to convert to an array.
- `mapFn` (optional)
    A function to call on every element of the array. If provided, every value to be added to the array is first passed through this function, and `mapFn`'s return value is added to the array instead. The function is called with the following arguments:
    - `element`
        The current element being processed in the array.
    - `index`
        The index of the current element being processed in the array.
- `thisArg` (optional)
    Value to use as `this` when executing `mapFn`.

### Return value

A new `Array` instance.

## Description

`Array.from()` lets you create `Array`s from:

- iterable objects (objects such as `Map` and `Set`); or, if the object is not iterable,
- array-like objects (objects with a `length` property and indexed elements).

To convert an ordinary object that's not iterable or array-like to an array (by enumerating its property keys, values, or both), use `Object.keys()`, `Object.values()`, or `Object.entries()`. To convert an async iterable to an array, use `Array.fromAsync()`.

`Array.from()` never creates a sparse array. If the `items` object is missing some index properties, they become `undefined` in the new array.

`Array.from()` has an optional parameter `mapFn`, which allows you to execute a function on each element of the array being created, similar to `map()`. More clearly, `Array.from(obj, mapFn, thisArg)` has the same result as `Array.from(obj).map(mapFn, thisArg)`, except that it does not create an intermediate array, and `mapFn` only receives two arguments (`element`, `index`) without the whole array, because the array is still under construction.

> **Note:**
> This behavior is more important for typed arrays, since the intermediate array would necessarily have values truncated to fit into the appropriate type. `Array.from()` is implemented to have the same signature as `TypedArray.from()`.

The `Array.from()` method is a generic factory method. For example, if a subclass of `Array` inherits the `from()` method, the inherited `from()` method will return new instances of the subclass instead of `Array` instances. In fact, the `this` value can be any constructor function that accepts a single argument representing the length of the new array. When an iterable is passed as `items`, the constructor is called with no arguments; when an array-like object is passed, the constructor is called with the normalized length of the array-like object. The final `length` will be set again when iteration finishes. If the `this` value is not a constructor function, the plain `Array` constructor is used instead.

## Examples

### Array from a String

```js
Array.from("foo");
// [ "f", "o", "o" ]
```

### Array from a Set

```js
const set = new Set(["foo", "bar", "baz", "foo"]);
Array.from(set);
// [ "foo", "bar", "baz" ]
```

### Array from a Map

```js
const map = new Map([
  [1, 2],
  [2, 4],
  [4, 8],
]);
Array.from(map);
// [[1, 2], [2, 4], [4, 8]]

const mapper = new Map([
  ["1", "a"],
  ["2", "b"],
]);
Array.from(mapper.values());
// ['a', 'b'];

Array.from(mapper.keys());
// ['1', '2'];
```

### Array from a NodeList

```js
// Create an array based on a property of DOM Elements
const images = document.querySelectorAll("img");
const sources = Array.from(images, (image) => image.src);
const insecureSources = sources.filter((link) => link.startsWith("http://"));
```

### Array from an Array-like object (arguments)

```js
function f() {
  return Array.from(arguments);
}

f(1, 2, 3);

// [ 1, 2, 3 ]
```

### Using arrow functions and Array.from()

```js
// Using an arrow function as the map function to
// manipulate the elements
Array.from([1, 2, 3], (x) => x + x);
// [2, 4, 6]

// Generate a sequence of numbers
// Since the array is initialized with `undefined` on each position,
// the value of `v` below will be `undefined`
Array.from({ length: 5 }, (v, i) => i);
// [0, 1, 2, 3, 4]
```

### Sequence generator (range)

```js
// Sequence generator function (commonly referred to as "range", cf. Python, Clojure, etc.)
const range = (start, stop, step) =>
  Array.from(
    { length: Math.ceil((stop - start) / step) },
    (_, i) => start + i * step,
  );

// Generate a sequence of numbers from 0 (inclusive) to 5 (exclusive), incrementing by 1
range(0, 5, 1);
// [0, 1, 2, 3, 4]

// Generate a sequence of numbers from 1 (inclusive) to 10 (exclusive), incrementing by 2
range(1, 10, 2);
// [1, 3, 5, 7, 9]

// Generate the Latin alphabet making use of it being ordered as a sequence
range("A".charCodeAt(0), "Z".charCodeAt(0) + 1, 1).map((x) =>
  String.fromCharCode(x),
);
// ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
```

### Calling from() on non-array constructors

The `from()` method can be called on any constructor function that accepts a single argument representing the length of the new array.

```js
function NotArray(len) {
  console.log("NotArray called with length", len);
}

// Iterable
console.log(Array.from.call(NotArray, new Set(["foo", "bar", "baz"])));
// NotArray called with length undefined
// NotArray { '0': 'foo', '1': 'bar', '2': 'baz', length: 3 }

// Array-like
console.log(Array.from.call(NotArray, { length: 1, 0: "foo" }));
// NotArray called with length 1
// NotArray { '0': 'foo', length: 1 }
```

When the `this` value is not a constructor, a plain `Array` object is returned.

```js
console.log(Array.from.call({}, { length: 1, 0: "foo" })); // [ 'foo' ]
```

## See also

- Polyfill of `Array.from` in `core-js`
- es-shims polyfill of `Array.from`
- Indexed collections guide
- `Array`
- `Array()`
- `Array.of()`
- `Array.fromAsync()`
- `Array.prototype.map()`
- `TypedArray.from()`
