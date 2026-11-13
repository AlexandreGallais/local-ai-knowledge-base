---
title: "Reflect.get()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/reflect/get/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Reflect.get()

The **`Reflect.get()`** static method is like the property accessor syntax, but as a function.

```js
const object = {
  x: 1,
  y: 2,
};

console.log(Reflect.get(object, "x"));
// Expected output: 1

const array = ["zero", "one"];

console.log(Reflect.get(array, 1));
// Expected output: "one"
```

## Syntax

```js
Reflect.get(target, propertyKey)
Reflect.get(target, propertyKey, receiver)
```

### Parameters

- `target`
    The target object on which to get the property.
- `propertyKey`
    The name of the property to get.
- `receiver` (optional)
    The value of `this` provided for the call to `target` if a getter is encountered. Defaults to `target`.

### Return value

The value of the property.

### Exceptions

- `TypeError`
    Thrown if `target` is not an object.

## Description

`Reflect.get()` provides the reflective semantic of a property access. That is, `Reflect.get(target, propertyKey, receiver)` is semantically equivalent to:

```js
target[propertyKey];
```

Note that in a normal property access, `target` and `receiver` would observably be the same object.

`Reflect.get()` invokes the `[[Get]]` object internal method of `target`.

## Examples

### Using Reflect.get()

```js
// Object
const obj1 = { x: 1, y: 2 };
Reflect.get(obj1, "x"); // 1

// Array
Reflect.get(["zero", "one"], 1); // "one"

// Proxy with a get handler
const obj2 = new Proxy(
  { p: 1 },
  {
    get(t, k, r) {
      return `${k}bar`;
    },
  },
);
Reflect.get(obj2, "foo"); // "foobar"

// Proxy with get handler and receiver
const obj3 = new Proxy(
  { p: 1, foo: 2 },
  {
    get(t, prop, receiver) {
      return `${receiver[prop]}bar`;
    },
  },
);
Reflect.get(obj3, "foo", { foo: 3 }); // "3bar"
```

## See also

- Polyfill of `Reflect.get` in `core-js`
- `Reflect`
- Property accessors
- `handler.get()`
