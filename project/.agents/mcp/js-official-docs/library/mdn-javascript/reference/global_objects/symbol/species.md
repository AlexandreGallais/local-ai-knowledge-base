---
title: "Symbol.species"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/symbol/species/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Symbol.species

The **`Symbol.species`** static data property represents the well-known symbol `Symbol.species`. Methods that create copies of an object may look up this symbol on the object for the constructor function to use when creating the copy.

> **Warning:**
> The existence of `[Symbol.species]` allows execution of arbitrary code and may create security vulnerabilities. It also makes certain optimizations much harder. Engine implementers are investigating whether to remove this feature. Avoid relying on it if possible.

```js
class Array1 extends Array {
  static get [Symbol.species]() {
    return Array;
  }
}

const a = new Array1(1, 2, 3);
const mapped = a.map((x) => x * x);

console.log(mapped instanceof Array1);
// Expected output: false

console.log(mapped instanceof Array);
// Expected output: true
```

## Value

The well-known symbol `Symbol.species`.

## Description

The `[Symbol.species]` accessor property allows subclasses to override the default constructor for objects. This specifies a protocol about how instances should be copied. For example, when you use copying methods of arrays, such as `map()`, the `map()` method uses `instance.constructor[Symbol.species]` to get the constructor for constructing the new array. For more information, see subclassing built-ins.

All built-in implementations of `[Symbol.species]` return the `this` value, which is the current instance's constructor. This allows copying methods to create instances of derived classes rather than the base class — for example, `map()` will return an array of the same type as the original array.

## Examples

### Using species

You might want to return `Array` objects in your derived array class `MyArray`. For example, when using methods such as `map()` that return the default constructor, you want these methods to return a parent `Array` object, instead of the `MyArray` object. The `species` symbol lets you do this:

```js
class MyArray extends Array {
  // Overwrite species to the parent Array constructor
  static get [Symbol.species]() {
    return Array;
  }
}
const a = new MyArray(1, 2, 3);
const mapped = a.map((x) => x * x);

console.log(mapped instanceof MyArray); // false
console.log(mapped instanceof Array); // true
```

## See also

- `Array[Symbol.species]`
- `ArrayBuffer[Symbol.species]`
- `Map[Symbol.species]`
- `Promise[Symbol.species]`
- `RegExp[Symbol.species]`
- `Set[Symbol.species]`
- `TypedArray[Symbol.species]`
