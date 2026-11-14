---
title: "Reflect.preventExtensions()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/reflect/preventextensions/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Reflect.preventExtensions()

The **`Reflect.preventExtensions()`** static method is like `Object.preventExtensions()`. It prevents new properties from ever being added to an object (i.e., prevents future extensions to the object).

```js
const object = {};

console.log(Reflect.isExtensible(object));
// Expected output: true

Reflect.preventExtensions(object);

console.log(Reflect.isExtensible(object));
// Expected output: false
```

## Syntax

```js
Reflect.preventExtensions(target)
```

### Parameters

- `target`
    The target object on which to prevent extensions.

### Return value

A `Boolean` indicating whether or not the target was successfully set to prevent extensions.

### Exceptions

- `TypeError`
    Thrown if `target` is not an object.

## Description

`Reflect.preventExtensions()` provides the reflective semantic of preventing extensions of an object. The differences with `Object.preventExtensions()` are:

- `Reflect.preventExtensions()` throws a `TypeError` if the target is not an object, while `Object.preventExtensions()` always returns non-object targets as-is.
- `Reflect.preventExtensions()` returns a `Boolean` indicating whether or not the target was successfully set to prevent extensions, while `Object.preventExtensions()` returns the target object.

`Reflect.preventExtensions()` invokes the `[[PreventExtensions]]` object internal method of `target`.

## Examples

### Using Reflect.preventExtensions()

See also `Object.preventExtensions()`.

```js
// Objects are extensible by default.
const empty = {};
Reflect.isExtensible(empty); // true

// … but that can be changed.
Reflect.preventExtensions(empty);
Reflect.isExtensible(empty); // false
```

### Difference with Object.preventExtensions()

If the `target` argument to this method is not an object (a primitive), then it will cause a `TypeError`. With `Object.preventExtensions()`, a non-object `target` will be returned as-is without any errors.

```js
Reflect.preventExtensions(1);
// TypeError: 1 is not an object

Object.preventExtensions(1);
// 1
```

## See also

- Polyfill of `Reflect.preventExtensions` in `core-js`
- `Reflect`
- `Object.preventExtensions()`
- `handler.preventExtensions()`
