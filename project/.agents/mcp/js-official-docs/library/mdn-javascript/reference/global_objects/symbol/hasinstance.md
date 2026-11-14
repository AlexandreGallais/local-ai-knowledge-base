---
title: "Symbol.hasInstance"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/symbol/hasinstance/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Symbol.hasInstance

The **`Symbol.hasInstance`** static data property represents the well-known symbol `Symbol.hasInstance`. The `instanceof` operator looks up this symbol on its right-hand operand for the method used to determine if the constructor object recognizes an object as its instance.

```js
class Array1 {
  static [Symbol.hasInstance](instance) {
    return Array.isArray(instance);
  }
}

console.log([] instanceof Array1);
// Expected output: true
```

## Value

The well-known symbol `Symbol.hasInstance`.

## Description

The `instanceof` operator uses the following algorithm to calculate the return value of `object instanceof constructor`:

1. If `constructor` has a `Symbol.hasInstance` method, then call it with `object` as the first argument and return the result, coerced to a boolean. Throw a `TypeError` if `constructor` is not an object, or if `constructor[Symbol.hasInstance]` is not one of `null`, `undefined`, or a function.
2. Otherwise, if `constructor` doesn't have a `Symbol.hasInstance` method (`constructor[Symbol.hasInstance]` is `null` or `undefined`), then determine the result using the same algorithm as `Function.prototype[Symbol.hasInstance]()`. Throw a `TypeError` if `constructor` is not a function.

Because all functions inherit from `Function.prototype` by default, most of the time, the `Function.prototype[Symbol.hasInstance]()` method specifies the behavior of `instanceof` when the right-hand side is a function.

## Examples

### Custom instanceof behavior

You could implement your custom `instanceof` behavior like this, for example:

```js
class MyArray {
  static [Symbol.hasInstance](instance) {
    return Array.isArray(instance);
  }
}
console.log([] instanceof MyArray); // true
```

```js
function MyArray() {}
Object.defineProperty(MyArray, Symbol.hasInstance, {
  value(instance) {
    return Array.isArray(instance);
  },
});
console.log([] instanceof MyArray); // true
```

### Checking the instance of an object

Just in the same manner at which you can check if an object is an instance of a class using the `instanceof` keyword, we can also use `Symbol.hasInstance` for such checks.

```js
class Animal {
  constructor() {}
}

const cat = new Animal();

console.log(Animal[Symbol.hasInstance](cat)); // true
```

## See also

- `instanceof`
- `Function.prototype[Symbol.hasInstance]()`
