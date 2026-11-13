---
title: "Object.keys()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/object/keys/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Object.keys()

The **`Object.keys()`** static method returns an array of a given object's own enumerable string-keyed property names.

```js
const object = {
  a: "some string",
  b: 42,
  c: false,
};

console.log(Object.keys(object));
// Expected output: Array ["a", "b", "c"]
```

## Syntax

```js
Object.keys(obj)
```

### Parameters

- `obj`
    An object.

### Return value

An array of strings representing the given object's own enumerable string-keyed property keys.

## Description

`Object.keys()` returns an array whose elements are strings corresponding to the enumerable string-keyed property names found directly upon `object`. This is the same as iterating with a `for...in` loop, except that a `for...in` loop enumerates properties in the prototype chain as well. The order of the array returned by `Object.keys()` is the same as that provided by a `for...in` loop.

If you need the property values, use `Object.values()` instead. If you need both the property keys and values, use `Object.entries()` instead.

## Examples

### Using Object.keys()

```js
// Basic array
const arr = ["a", "b", "c"];
console.log(Object.keys(arr)); // ['0', '1', '2']

// Array-like object
const obj = { 0: "a", 1: "b", 2: "c" };
console.log(Object.keys(obj)); // ['0', '1', '2']

// Array-like object with random key <example-value>
const anObj = { 100: "a", 2: "b", 7: "c" };
console.log(Object.keys(anObj)); // ['2', '7', '100']

// getFoo is a non-enumerable property
const myObj = Object.create(
  {},
  {
    getFoo: {
      value() {
        return this.foo;
      },
    },
  },
);
myObj.foo = 1;
console.log(Object.keys(myObj)); // ['foo']
```

If you want _all_ string-keyed own properties, including non-enumerable ones, see `Object.getOwnPropertyNames()`.

### Using Object.keys() on primitives

Non-object arguments are coerced to objects. `undefined` and `null` cannot be coerced to objects and throw a `TypeError` upfront. Only strings may have own enumerable properties, while all other primitives return an empty array.

```js
// Strings have indices as enumerable own properties
console.log(Object.keys("foo")); // ['0', '1', '2']

// Other primitives except undefined and null have no own properties
console.log(Object.keys(100)); // []
```

> **Note:**
> In ES5, passing a non-object to `Object.keys()` threw a `TypeError`.

## See also

- Polyfill of `Object.keys` in `core-js`
- es-shims polyfill of `Object.keys`
- Enumerability and ownership of properties
- `Object.entries()`
- `Object.values()`
- `Object.prototype.propertyIsEnumerable()`
- `Object.create()`
- `Object.getOwnPropertyNames()`
- `Map.prototype.keys()`
