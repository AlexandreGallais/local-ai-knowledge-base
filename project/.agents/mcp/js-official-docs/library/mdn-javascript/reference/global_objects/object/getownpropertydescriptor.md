---
title: "Object.getOwnPropertyDescriptor()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/object/getownpropertydescriptor/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Object.getOwnPropertyDescriptor()

The **`Object.getOwnPropertyDescriptor()`** static method returns an
object describing the configuration of a specific property on a given object (that is,
one directly present on an object and not in the object's prototype chain). The object
returned is mutable but mutating it has no effect on the original property's
configuration.

```js
const object = {
  foo: 42,
};

const descriptor = Object.getOwnPropertyDescriptor(object, "foo");

console.log(descriptor.configurable);
// Expected output: true

console.log(descriptor.value);
// Expected output: 42
```

## Syntax

```js
Object.getOwnPropertyDescriptor(obj, prop)
```

### Parameters

- `obj`
    The object in which to look for the property.
- `prop`
    The name or `Symbol` of the property whose description is to be
    retrieved.

### Return value

A property descriptor of the given property if it exists on the object,
`undefined` otherwise.

## Description

This method permits examination of the precise description of a property. A
_property_ in JavaScript consists of either a string-valued name or a
`Symbol` and a property descriptor. Further information about property
descriptor types and their attributes can be found in
`Object.defineProperty()`.

A _property descriptor_ is a record with some of the following attributes:

- `value`
    The value associated with the property (data descriptors only).
- `writable`
    `true` if and only if the value associated with the property may be
    changed (data descriptors only).
- `get`
    A function which serves as a getter for the property, or `undefined` if
    there is no getter (accessor descriptors only).
- `set`
    A function which serves as a setter for the property, or `undefined` if
    there is no setter (accessor descriptors only).
- `configurable`
    `true` if and only if the type of this property descriptor may be changed
    and if the property may be deleted from the corresponding object.
- `enumerable`
    `true` if and only if this property shows up during enumeration of the
    properties on the corresponding object.

## Examples

### Using Object.getOwnPropertyDescriptor()

```js
let o, d;

o = {
  get foo() {
    return 17;
  },
};
d = Object.getOwnPropertyDescriptor(o, "foo");
console.log(d);
// {
//   configurable: true,
//   enumerable: true,
//   get: [Function: get foo],
//   set: undefined
// }

o = { bar: 42 };
d = Object.getOwnPropertyDescriptor(o, "bar");
console.log(d);
// {
//   configurable: true,
//   enumerable: true,
//   value: 42,
//   writable: true
// }

o = { [Symbol.for("baz")]: 73 };
d = Object.getOwnPropertyDescriptor(o, Symbol.for("baz"));
console.log(d);
// {
//   configurable: true,
//   enumerable: true,
//   value: 73,
//   writable: true
// }

o = {};
Object.defineProperty(o, "qux", {
  value: 8675309,
  writable: false,
  enumerable: false,
});
d = Object.getOwnPropertyDescriptor(o, "qux");
console.log(d);
// {
//   value: 8675309,
//   writable: false,
//   enumerable: false,
//   configurable: false
// }
```

### Non-object coercion

In ES5, if the first argument to this method is not an object (a primitive), then it
will cause a `TypeError`. In ES2015, a non-object first argument will be
coerced to an object at first.

```js
Object.getOwnPropertyDescriptor("foo", 0);
// TypeError: "foo" is not an object  // ES5 code

Object.getOwnPropertyDescriptor("foo", 0);
// Object returned by ES2015 code: {
//   configurable: false,
//   enumerable: true,
//   value: "f",
//   writable: false
// }
```

## See also

- `Object.defineProperty()`
- `Reflect.getOwnPropertyDescriptor()`
