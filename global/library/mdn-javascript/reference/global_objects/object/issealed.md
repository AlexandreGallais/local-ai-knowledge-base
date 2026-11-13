---
title: "Object.isSealed()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/object/issealed/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Object.isSealed()

The **`Object.isSealed()`** static method determines if an object is sealed.

```js
const object = {
  foo: 42,
};

console.log(Object.isSealed(object));
// Expected output: false

Object.seal(object);

console.log(Object.isSealed(object));
// Expected output: true
```

## Syntax

```js
Object.isSealed(obj)
```

### Parameters

- `obj`
    The object which should be checked.

### Return value

A `Boolean` indicating whether or not the given object is sealed.

## Description

Returns `true` if the object is sealed, otherwise `false`. An
object is sealed if it is not `extensible` and
if all its properties are non-configurable and therefore not removable (but not
necessarily non-writable).

## Examples

### Using Object.isSealed

```js
// Objects aren't sealed by default.
const empty = {};
Object.isSealed(empty); // false

// If you make an empty object non-extensible,
// it is vacuously sealed.
Object.preventExtensions(empty);
Object.isSealed(empty); // true

// The same is not true of a non-empty object,
// unless its properties are all non-configurable.
const hasProp = { fee: "fie foe fum" };
Object.preventExtensions(hasProp);
Object.isSealed(hasProp); // false

// But make them all non-configurable
// and the object becomes sealed.
Object.defineProperty(hasProp, "fee", {
  configurable: false,
});
Object.isSealed(hasProp); // true

// The easiest way to seal an object, of course,
// is Object.seal.
const sealed = {};
Object.seal(sealed);
Object.isSealed(sealed); // true

// A sealed object is, by definition, non-extensible.
Object.isExtensible(sealed); // false

// A sealed object might be frozen,
// but it doesn't have to be.
Object.isFrozen(sealed); // true
// (all properties also non-writable)

const s2 = Object.seal({ p: 3 });
Object.isFrozen(s2); // false
// ('p' is still writable)

const s3 = Object.seal({
  get p() {
    return 0;
  },
});
Object.isFrozen(s3); // true
// (only configurability matters for accessor properties)
```

### Non-object argument

In ES5, if the argument to this method is not an object (a primitive), then it will cause a `TypeError`. In ES2015, it will return `true` without any errors if a non-object argument is passed, since primitives are, by definition, immutable.

```js
Object.isSealed(1);
// TypeError: 1 is not an object (ES5 code)

Object.isSealed(1);
// true                          (ES2015 code)
```

## See also

- `Object.seal()`
- `Object.preventExtensions()`
- `Object.isExtensible()`
- `Object.freeze()`
- `Object.isFrozen()`
