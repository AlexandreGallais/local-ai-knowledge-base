---
title: "Object.isFrozen()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/object/isfrozen/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Object.isFrozen()

The **`Object.isFrozen()`** static method determines if an object is
`frozen`.

```js
const object = {
  foo: 42,
};

console.log(Object.isFrozen(object));
// Expected output: false

Object.freeze(object);

console.log(Object.isFrozen(object));
// Expected output: true
```

## Syntax

```js
Object.isFrozen(obj)
```

### Parameters

- `obj`
    The object which should be checked.

### Return value

A `Boolean` indicating whether or not the given object is frozen.

## Description

An object is frozen if and only if it is not extensible, all its properties are non-configurable, and all its data
properties (that is, properties which are not accessor properties with getter or setter
components) are non-writable.

## Examples

### Using Object.isFrozen

```js
// A new object is extensible, so it is not frozen.
Object.isFrozen({}); // false

// An empty object which is not extensible
// is vacuously frozen.
const vacuouslyFrozen = Object.preventExtensions({});
Object.isFrozen(vacuouslyFrozen); // true

// A new object with one property is also extensible,
// ergo not frozen.
const oneProp = { p: 42 };
Object.isFrozen(oneProp); // false

// Preventing extensions to the object still doesn't
// make it frozen, because the property is still
// configurable (and writable).
Object.preventExtensions(oneProp);
Object.isFrozen(oneProp); // false

// Deleting that property makes the object vacuously frozen.
delete oneProp.p;
Object.isFrozen(oneProp); // true

// A non-extensible object with a non-writable
// but still configurable property is not frozen.
const nonWritable = { e: "plep" };
Object.preventExtensions(nonWritable);
Object.defineProperty(nonWritable, "e", {
  writable: false,
}); // make non-writable
Object.isFrozen(nonWritable); // false

// Changing that property to non-configurable
// then makes the object frozen.
Object.defineProperty(nonWritable, "e", {
  configurable: false,
}); // make non-configurable
Object.isFrozen(nonWritable); // true

// A non-extensible object with a non-configurable
// but still writable property also isn't frozen.
const nonConfigurable = { release: "the kraken!" };
Object.preventExtensions(nonConfigurable);
Object.defineProperty(nonConfigurable, "release", {
  configurable: false,
});
Object.isFrozen(nonConfigurable); // false

// Changing that property to non-writable
// then makes the object frozen.
Object.defineProperty(nonConfigurable, "release", {
  writable: false,
});
Object.isFrozen(nonConfigurable); // true

// A non-extensible object with a configurable
// accessor property isn't frozen.
const accessor = {
  get food() {
    return "yum";
  },
};
Object.preventExtensions(accessor);
Object.isFrozen(accessor); // false

// When we make that property non-configurable it becomes frozen.
Object.defineProperty(accessor, "food", {
  configurable: false,
});
Object.isFrozen(accessor); // true

// But the easiest way for an object to be frozen
// is if Object.freeze has been called on it.
const frozen = { 1: 81 };
Object.isFrozen(frozen); // false
Object.freeze(frozen);
Object.isFrozen(frozen); // true

// By definition, a frozen object is non-extensible.
Object.isExtensible(frozen); // false

// Also by definition, a frozen object is sealed.
Object.isSealed(frozen); // true
```

### Non-object argument

In ES5, if the argument to this method is not an object (a primitive), then it will cause a `TypeError`. In ES2015, it will return `true` without any errors if a non-object argument is passed, since primitives are, by definition, immutable.

```js
Object.isFrozen(1);
// TypeError: 1 is not an object (ES5 code)

Object.isFrozen(1);
// true                          (ES2015 code)
```

## See also

- `Object.freeze()`
- `Object.preventExtensions()`
- `Object.isExtensible()`
- `Object.seal()`
- `Object.isSealed()`
