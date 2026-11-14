---
title: "Reflect.setPrototypeOf()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/reflect/setprototypeof/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Reflect.setPrototypeOf()

The **`Reflect.setPrototypeOf()`** static method is like `Object.setPrototypeOf()` but returns a `Boolean`. It sets the prototype (i.e., the internal `[[Prototype]]` property) of a specified object.

```js
const object1 = {};

console.log(Reflect.setPrototypeOf(object1, Object.prototype));
// Expected output: true

console.log(Reflect.setPrototypeOf(object1, null));
// Expected output: true

const object2 = {};

console.log(Reflect.setPrototypeOf(Object.freeze(object2), null));
// Expected output: false
```

## Syntax

```js
Reflect.setPrototypeOf(target, prototype)
```

### Parameters

- `target`
    The target object of which to set the prototype.
- `prototype`
    The object's new prototype (an object or `null`).

### Return value

A `Boolean` indicating whether or not the prototype was successfully set.

### Exceptions

- `TypeError`
    Thrown if `target` is not an object or if `prototype` is neither an object nor `null`.

## Description

`Reflect.setPrototypeOf()` provides the reflective semantic of setting the prototype of an object. At the very low level, setting the prototype returns a boolean (as is the case with the proxy handler). `Object.setPrototypeOf()` provides nearly the same semantic, but it throws a `TypeError` if the status is `false` (the operation was unsuccessful), while `Reflect.setPrototypeOf()` directly returns the status.

`Reflect.setPrototypeOf()` invokes the `[[SetPrototypeOf]]` object internal method of `target`.

## Examples

### Using Reflect.setPrototypeOf()

```js
Reflect.setPrototypeOf({}, Object.prototype); // true

// It can change an object's [[Prototype]] to null.
Reflect.setPrototypeOf({}, null); // true

// Returns false if target is not extensible.
Reflect.setPrototypeOf(Object.freeze({}), null); // false

// Returns false if it cause a prototype chain cycle.
const target = {};
const proto = Object.create(target);
Reflect.setPrototypeOf(target, proto); // false
```

## See also

- Polyfill of `Reflect.setPrototypeOf` in `core-js`
- `Reflect`
- `Object.setPrototypeOf()`
- `handler.setPrototypeOf()`
