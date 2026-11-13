---
title: "Reflect.deleteProperty()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/reflect/deleteproperty/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Reflect.deleteProperty()

The **`Reflect.deleteProperty()`** static method is like the `delete` operator, but as a function. It deletes a property from an object.

```js
const object = {
  foo: 42,
};

Reflect.deleteProperty(object, "foo");

console.log(object.foo);
// Expected output: undefined

const array = [1, 2, 3, 4, 5];
Reflect.deleteProperty(array, "3");

console.log(array);
// Expected output: Array [1, 2, 3, <1 empty slot>, 5]
```

## Syntax

```js
Reflect.deleteProperty(target, propertyKey)
```

### Parameters

- `target`
    The target object on which to delete the property.
- `propertyKey`
    The name of the property to be deleted.

### Return value

A boolean indicating whether or not the property was successfully deleted.

### Exceptions

- `TypeError`
    Thrown if `target` is not an object.

## Description

`Reflect.deleteProperty()` provides the reflective semantic of the `delete` operator. That is, `Reflect.deleteProperty(target, propertyKey)` is semantically equivalent to:

```js
delete target.propertyKey;
```

At the very low level, deleting a property returns a boolean (as is the case with the proxy handler). `Reflect.deleteProperty()` directly returns the status, while `delete` would throw a `TypeError` in strict mode if the status is `false`. In non-strict mode, `delete` and `Reflect.deleteProperty()` have the same behavior.

`Reflect.deleteProperty()` invokes the `[[Delete]]` object internal method of `target`.

## Examples

### Using Reflect.deleteProperty()

```js
const obj = { x: 1, y: 2 };
Reflect.deleteProperty(obj, "x"); // true
console.log(obj); // { y: 2 }

const arr = [1, 2, 3, 4, 5];
Reflect.deleteProperty(arr, "3"); // true
console.log(arr); // [1, 2, 3, <1 empty slot>, 5]

// Returns true if no such property exists
Reflect.deleteProperty({}, "foo"); // true

// Returns false if a property is unconfigurable
Reflect.deleteProperty(Object.freeze({ foo: 1 }), "foo"); // false
```

## See also

- Polyfill of `Reflect.deleteProperty` in `core-js`
- `Reflect`
- `delete`
- `handler.deleteProperty()`
