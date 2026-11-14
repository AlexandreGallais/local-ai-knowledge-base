---
title: "Reflect.has()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/reflect/has/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Reflect.has()

The **`Reflect.has()`** static method is like the `in` operator, but
as a function.

```js
const object = {
  property1: 42,
};

console.log(Reflect.has(object, "property1"));
// Expected output: true

console.log(Reflect.has(object, "property2"));
// Expected output: false

console.log(Reflect.has(object, "toString"));
// Expected output: true
```

## Syntax

```js
Reflect.has(target, propertyKey)
```

### Parameters

- `target`
    The target object in which to look for the property.
- `propertyKey`
    The name of the property to check.

### Return value

A `Boolean` indicating whether or not the `target` has the property.

### Exceptions

- `TypeError`
    Thrown if `target` is not an object.

## Description

`Reflect.has()` provides the reflective semantic of checking if a property is in an object. That is, `Reflect.has(target, propertyKey)` is semantically equivalent to:

```js
propertyKey in target;
```

`Reflect.has()` invokes the `[[HasProperty]]` object internal method of `target`.

## Examples

### Using Reflect.has()

```js
Reflect.has({ x: 0 }, "x"); // true
Reflect.has({ x: 0 }, "y"); // false

// returns true for properties in the prototype chain
Reflect.has({ x: 0 }, "toString");

// Proxy with .has() handler method
obj = new Proxy(
  {},
  {
    has(t, k) {
      return k.startsWith("door");
    },
  },
);
Reflect.has(obj, "doorbell"); // true
Reflect.has(obj, "dormitory"); // false
```

`Reflect.has` returns `true` for any inherited properties, like the `in` operator:

```js
const a = { foo: 123 };
const b = { __proto__: a };
const c = { __proto__: b };
// The prototype chain is: c -> b -> a
Reflect.has(c, "foo"); // true
```

## See also

- Polyfill of `Reflect.has` in `core-js`
- `Reflect`
- `in`
- `handler.has()`
