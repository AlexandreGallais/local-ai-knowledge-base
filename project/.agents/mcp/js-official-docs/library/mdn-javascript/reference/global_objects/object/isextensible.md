---
title: "Object.isExtensible()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/object/isextensible/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Object.isExtensible()

The **`Object.isExtensible()`** static method determines if an object
is extensible (whether it can have new properties added to it).

```js
const object = {};

console.log(Object.isExtensible(object));
// Expected output: true

Object.preventExtensions(object);

console.log(Object.isExtensible(object));
// Expected output: false
```

## Syntax

```js
Object.isExtensible(obj)
```

### Parameters

- `obj`
    The object which should be checked.

### Return value

A `Boolean` indicating whether or not the given object is extensible.

## Description

Objects are extensible by default: they can have new properties added to them, and their `[[Prototype]]` can be re-assigned. An object can be marked as non-extensible using one of `Object.preventExtensions()`, `Object.seal()`, `Object.freeze()`, or `Reflect.preventExtensions()`.

## Examples

### Using Object.isExtensible

```js
// New objects are extensible.
const empty = {};
Object.isExtensible(empty); // true

// They can be made un-extensible
Object.preventExtensions(empty);
Object.isExtensible(empty); // false

// Sealed objects are by definition non-extensible.
const sealed = Object.seal({});
Object.isExtensible(sealed); // false

// Frozen objects are also by definition non-extensible.
const frozen = Object.freeze({});
Object.isExtensible(frozen); // false
```

### Non-object argument

In ES5, if the argument to this method is not an object (a primitive), then it will cause a `TypeError`. In ES2015, it will return `false` without any errors if a non-object argument is passed, since primitives are, by definition, immutable.

```js
Object.isExtensible(1);
// TypeError: 1 is not an object (ES5 code)

Object.isExtensible(1);
// false                         (ES2015 code)
```

## See also

- `Object.preventExtensions()`
- `Object.seal()`
- `Object.isSealed()`
- `Object.freeze()`
- `Object.isFrozen()`
- `Reflect.isExtensible()`
