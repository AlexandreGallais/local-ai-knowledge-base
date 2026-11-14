---
title: "Reflect.set()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/reflect/set/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Reflect.set()

The **`Reflect.set()`** static method is like the property accessor and assignment syntax, but as a function.

```js
const object = {};
Reflect.set(object, "foo", 42);

console.log(object.foo);
// Expected output: 42

const array = ["duck", "duck", "duck"];
Reflect.set(array, 2, "goose");

console.log(array[2]);
// Expected output: "goose"
```

## Syntax

```js
Reflect.set(target, propertyKey, value)
Reflect.set(target, propertyKey, value, receiver)
```

### Parameters

- `target`
    The target object on which to set the property.
- `propertyKey`
    The name of the property to set.
- `value`
    The value to set.
- `receiver` (optional)
    The value of `this` provided for the call to the setter for `propertyKey` on `target`. If provided and `target` does not have a setter for `propertyKey`, the property will be set on `receiver` instead. Defaults to `target`.

### Return value

A `Boolean` indicating whether or not setting the property was successful.

### Exceptions

- `TypeError`
    Thrown if `target` is not an object.

## Description

`Reflect.set()` provides the reflective semantic of a property access. That is, `Reflect.set(target, propertyKey, value, receiver)` is semantically equivalent to:

```js
target[propertyKey] = value;
```

Note that in a normal property access, `target` and `receiver` would observably be the same object.

`Reflect.set()` invokes the `[[Set]]` object internal method of `target`.

## Examples

### Using Reflect.set()

```js
// Object
const obj = {};
Reflect.set(obj, "prop", "value"); // true
obj.prop; // "value"

// Array
const arr = ["duck", "duck", "duck"];
Reflect.set(arr, 2, "goose"); // true
arr[2]; // "goose"

// It can truncate an array.
Reflect.set(arr, "length", 1); // true
arr; // ["duck"]

// With just one argument, propertyKey and value are "undefined".
Reflect.set(obj); // true
Reflect.getOwnPropertyDescriptor(obj, "undefined");
// { value: undefined, writable: true, enumerable: true, configurable: true }
```

### Different target and receiver

When the `target` and `receiver` are different, `Reflect.set` will use the property descriptor of `target` (to find the setter or determine if the property is writable), but set the property on `receiver`.

```js
const target = {};
const receiver = {};
Reflect.set(target, "a", 2, receiver); // true
// target is {}; receiver is { a: 2 }

const target = { a: 1 };
const receiver = {};
Reflect.set(target, "a", 2, receiver); // true
// target is { a: 1 }; receiver is { a: 2 }

const target = {
  set a(v) {
    this.b = v;
  },
};
const receiver = {};
Reflect.set(target, "a", 2, receiver); // true
// target is { a: [Setter] }; receiver is { b: 2 }
```

## See also

- Polyfill of `Reflect.set` in `core-js`
- `Reflect`
- Property accessors
- `handler.set()`
