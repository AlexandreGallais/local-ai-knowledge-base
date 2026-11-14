---
title: "Symbol.toPrimitive"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/symbol/toprimitive/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Symbol.toPrimitive

The **`Symbol.toPrimitive`** static data property represents the well-known symbol `Symbol.toPrimitive`. All type coercion algorithms look up this symbol on objects for the method that accepts a preferred type and returns a primitive representation of the object, before falling back to using the object's `valueOf()` and `toString()` methods.

```js
const object = {
  [Symbol.toPrimitive](hint) {
    if (hint === "number") {
      return 42;
    }
    return null;
  },
};

console.log(+object);
// Expected output: 42
```

## Value

The well-known symbol `Symbol.toPrimitive`.

## Description

With the help of the `Symbol.toPrimitive` property (used as a function value), an object can be converted to a primitive value. The function is called with a string argument `hint`, which specifies the preferred type of the result primitive value. The `hint` argument can be one of `"number"`, `"string"`, and `"default"`.

The `"number"` hint is used by numeric coercion algorithms. The `"string"` hint is used by the string coercion algorithm. The `"default"` hint is used by the primitive coercion algorithm. The `hint` only acts as a weak signal of preference, and the implementation is free to ignore it (as `Symbol.prototype[Symbol.toPrimitive]()` does). The language does not enforce alignment between the `hint` and the result type, although `Symbol.toPrimitive` must return a primitive, or a `TypeError` is thrown.

Objects without the `[Symbol.toPrimitive]` property are converted to primitives by calling the `valueOf()` and `toString()` methods in different orders, which is explained in more detail in the type coercion section. `Symbol.toPrimitive` allows full control over the primitive conversion process. For example, `Date.prototype[Symbol.toPrimitive]()` treats `"default"` as if it's `"string"` and calls `toString()` instead of `valueOf()`. `Symbol.prototype[Symbol.toPrimitive]()` ignores the hint and always returns a symbol, which means even in string contexts, `Symbol.prototype.toString()` won't be called, and `Symbol` objects must always be explicitly converted to strings through `String()`.

## Examples

### Modifying primitive values converted from an object

Following example describes how `Symbol.toPrimitive` property can modify the primitive value converted from an object.

```js
// An object without Symbol.toPrimitive property.
const obj1 = {};
console.log(+obj1); // NaN
console.log(`${obj1}`); // "[object Object]"
console.log(obj1 + ""); // "[object Object]"

// An object with Symbol.toPrimitive property.
const obj2 = {
  [Symbol.toPrimitive](hint) {
    if (hint === "number") {
      return 10;
    }
    if (hint === "string") {
      return "hello";
    }
    return true;
  },
};
console.log(+obj2); // 10        — hint is "number"
console.log(`${obj2}`); // "hello"   — hint is "string"
console.log(obj2 + ""); // "true"    — hint is "default"
```

## See also

- Polyfill of `Symbol.toPrimitive` in `core-js`
- `Date.prototype[Symbol.toPrimitive]()`
- `Symbol.prototype[Symbol.toPrimitive]()`
- `Object.prototype.toString()`
- `Object.prototype.valueOf()`
