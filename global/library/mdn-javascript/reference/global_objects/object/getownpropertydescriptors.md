---
title: "Object.getOwnPropertyDescriptors()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/object/getownpropertydescriptors/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Object.getOwnPropertyDescriptors()

The **`Object.getOwnPropertyDescriptors()`** static method returns all
own property descriptors of a given object.

```js
const object = {
  foo: 42,
};

const descriptors = Object.getOwnPropertyDescriptors(object);

console.log(descriptors.foo.writable);
// Expected output: true

console.log(descriptors.foo.value);
// Expected output: 42
```

## Syntax

```js
Object.getOwnPropertyDescriptors(obj)
```

### Parameters

- `obj`
    The object for which to get all own property descriptors.

### Return value

An object containing all own property descriptors of an object. Might be an empty
object, if there are no properties.

## Description

This method permits examination of the precise description of all own properties of an
object. A _property_ in JavaScript consists of either a string-valued name or a
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

### Creating a shallow copy

Whereas the `Object.assign()` method will only copy enumerable and own
properties from a source object to a target object, you are able to use this method and
`Object.create()` for a shallow copy between two unknown objects:

```js
Object.create(
  Object.getPrototypeOf(obj),
  Object.getOwnPropertyDescriptors(obj),
);
```

### Creating a subclass

A typical way of creating a subclass is to define the subclass, set its prototype to an
instance of the superclass, and then define properties on that instance. This can get
awkward especially for getters and setters. Instead, you can use this code to set the
prototype:

```js
function superclass() {}
superclass.prototype = {
  // Define the superclass constructor, methods, and properties here
};
function subclass() {}
subclass.prototype = Object.create(superclass.prototype, {
  // Define the subclass constructor, methods, and properties here
});
```

## See also

- Polyfill of `Object.getOwnPropertyDescriptors` in `core-js`
- es-shims polyfill of `Object.getOwnPropertyDescriptors`
- `Object.getOwnPropertyDescriptor()`
- `Object.defineProperty()`
