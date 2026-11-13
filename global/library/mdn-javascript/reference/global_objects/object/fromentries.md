---
title: "Object.fromEntries()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/object/fromentries/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Object.fromEntries()

The **`Object.fromEntries()`** static method transforms a list of key-value pairs into an object.

```js
const entries = new Map([
  ["foo", "bar"],
  ["baz", 42],
]);

const obj = Object.fromEntries(entries);

console.log(obj);
// Expected output: Object { foo: "bar", baz: 42 }
```

## Syntax

```js
Object.fromEntries(iterable)
```

### Parameters

- `iterable`
    An iterable, such as an `Array` or `Map`, containing a list of objects. Each object should have two properties:
    - `0`
        A string or symbol representing the property key.
    - `1`
        The property value.

    Typically, this object is implemented as a two-element array, with the first element being the property key and the second element being the property value.

### Return value

A new object whose properties are given by the entries of the iterable.

## Description

The `Object.fromEntries()` method takes a list of key-value pairs and returns a new object whose properties are given by those entries. The `iterable` argument is expected to be an object that implements a `Symbol.iterator` method. The method returns an iterator object that produces two-element array-like objects. The first element is a value that will be used as a property key, and the second element is the value to associate with that property key.

`Object.fromEntries()` performs the reverse of `Object.entries()`, except that `Object.entries()` only returns string-keyed properties, while `Object.fromEntries()` can also create symbol-keyed properties.

> **Note:**
> Unlike `Array.from()`, `Object.fromEntries()` does not use the value of `this`, so calling it on another constructor does not create objects of that type.

## Examples

### Converting a Map to an Object

With `Object.fromEntries`, you can convert from `Map` to `Object`:

```js
const map = new Map([
  ["foo", "bar"],
  ["baz", 42],
]);
const obj = Object.fromEntries(map);
console.log(obj); // { foo: "bar", baz: 42 }
```

### Converting an Array to an Object

With `Object.fromEntries`, you can convert from `Array` to `Object`:

```js
const arr = [
  ["0", "a"],
  ["1", "b"],
  ["2", "c"],
];
const obj = Object.fromEntries(arr);
console.log(obj); // { 0: "a", 1: "b", 2: "c" }
```

### Object transformations

With `Object.fromEntries`, its reverse method `Object.entries()`, and array manipulation methods, you are able to transform objects like this:

```js
const object1 = { a: 1, b: 2, c: 3 };

const object2 = Object.fromEntries(
  Object.entries(object1).map(([key, val]) => [key, val * 2]),
);

console.log(object2);
// { a: 2, b: 4, c: 6 }
```

## See also

- Polyfill of `Object.fromEntries` in `core-js`
- es-shims polyfill of `Object.fromEntries`
- `Object.entries()`
- `Object.keys()`
- `Object.values()`
- `Object.prototype.propertyIsEnumerable()`
- `Object.create()`
- `Map.prototype.entries()`
- `Map.prototype.keys()`
- `Map.prototype.values()`
