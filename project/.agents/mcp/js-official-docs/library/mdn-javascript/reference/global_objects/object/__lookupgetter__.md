---
title: "Object.prototype.__lookupGetter__()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/object/__lookupgetter__/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Object.prototype.__lookupGetter__()

> **Note:**
> This feature is deprecated in favor of the `Object.getOwnPropertyDescriptor()` API. This method's behavior is only specified for web compatibility, and is not required to be implemented in any platform. It may not work everywhere.

The **`__lookupGetter__()`** method of `Object` instances returns the function bound as a getter to the specified property.

## Syntax

```js
__lookupGetter__(prop)
```

### Parameters

- `prop`
    A string containing the name of the property whose getter should be returned.

### Return value

The function bound as a getter to the specified property. Returns `undefined` if no such property is found, or the property is a data property.

## Description

All objects that inherit from `Object.prototype` (that is, all except `null`-prototype objects) inherit the `__lookupGetter__()` method. If a getter has been defined for an object's property, it's not possible to reference the getter function through that property, because that property refers to the return value of that function. `__lookupGetter__()` can be used to obtain a reference to the getter function.

`__lookupGetter__()` walks up the prototype chain to find the specified property. If any object along the prototype chain has the specified own property, the `get` attribute of the property descriptor for that property is returned. If that property is a data property, `undefined` is returned. If the property is not found along the entire prototype chain, `undefined` is also returned.

`__lookupGetter__()` is defined in the spec as "normative optional", which means no implementation is required to implement this. However, all major browsers implement it, and due to its continued usage, it's unlikely to be removed. If a browser implements `__lookupGetter__()`, it also needs to implement the `__lookupSetter__()`, `__defineGetter__()`, and `__defineSetter__()` methods.

## Examples

### Using \_\_lookupGetter\_\_()

```js
const obj = {
  get foo() {
    return Math.random() > 0.5 ? "foo" : "bar";
  },
};

obj.__lookupGetter__("foo");
// [Function: get foo]
```

### Looking up a property's getter in the standard way

You should use the `Object.getOwnPropertyDescriptor()` API to look up a property's getter. Compared to `__lookupGetter__()`, this method allows looking up symbol properties. The `Object.getOwnPropertyDescriptor()` method also works with `null`-prototype objects, which don't inherit from `Object.prototype` and therefore don't have the `__lookupGetter__()` method. If `__lookupGetter__()`'s behavior of walking up the prototype chain is important, you may implement it yourself with `Object.getPrototypeOf()`.

```js
const obj = {
  get foo() {
    return Math.random() > 0.5 ? "foo" : "bar";
  },
};

Object.getOwnPropertyDescriptor(obj, "foo").get;
// [Function: get foo]
```

```js
const obj2 = {
  __proto__: {
    get foo() {
      return Math.random() > 0.5 ? "foo" : "bar";
    },
  },
};

function findGetter(obj, prop) {
  while (obj) {
    const desc = Object.getOwnPropertyDescriptor(obj, prop);
    if (desc) {
      return desc.get;
    }
    obj = Object.getPrototypeOf(obj);
  }
}

console.log(findGetter(obj2, "foo")); // [Function: get foo]
```

## See also

- Polyfill of `Object.prototype.__lookupGetter__` in `core-js`
- `Object.prototype.__lookupSetter__()`
- `get`
- `Object.getOwnPropertyDescriptor()`
- `Object.prototype.__defineGetter__()`
- `Object.prototype.__defineSetter__()`
- JS Guide: Defining Getters and Setters
