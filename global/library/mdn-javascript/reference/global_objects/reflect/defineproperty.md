---
title: "Reflect.defineProperty()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/reflect/defineproperty/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Reflect.defineProperty()

The **`Reflect.defineProperty()`** static method is like `Object.defineProperty()` but returns a `Boolean`.

```js
const object = {};

if (Reflect.defineProperty(object, "foo", { value: 42 })) {
  console.log("foo created!");
  // Expected output: "foo created!"
} else {
  console.log("problem creating foo");
}

console.log(object.foo);
// Expected output: 42
```

## Syntax

```js
Reflect.defineProperty(target, propertyKey, attributes)
```

### Parameters

- `target`
    The target object on which to define the property.
- `propertyKey`
    The name of the property to be defined or modified.
- `attributes`
    The attributes for the property being defined or modified.

### Return value

A boolean indicating whether or not the property was successfully defined.

### Exceptions

- `TypeError`
    Thrown if `target` or `attributes` is not an object.

## Description

`Reflect.defineProperty()` provides the reflective semantic of defining an own property on an object. At the very low level, defining a property returns a boolean (as is the case with the proxy handler). `Object.defineProperty()` provides nearly the same semantic, but it throws a `TypeError` if the status is `false` (the operation was unsuccessful), while `Reflect.defineProperty()` directly returns the status.

Many built-in operations would also define own properties on objects. The most significant difference between defining properties and setting them is that setters aren't invoked. For example, class fields directly define properties on the instance without invoking setters.

```js
class B extends class A {
  set a(v) {
    console.log("Setter called");
  }
} {
  a = 1; // Nothing logged
}
```

`Reflect.defineProperty()` invokes the `[[DefineOwnProperty]]` object internal method of `target`.

## Examples

### Using Reflect.defineProperty()

```js
const obj = {};
Reflect.defineProperty(obj, "x", { value: 7 }); // true
console.log(obj.x); // 7
```

### Checking if property definition has been successful

With `Object.defineProperty()`, which returns an object if successful, or throws a `TypeError` otherwise, you would use a `try...catch` block to catch any error that occurred while defining a property.

Because `Reflect.defineProperty()` returns a Boolean success status, you can just use an `if...else` block here:

```js
if (Reflect.defineProperty(target, property, attributes)) {
  // success
} else {
  // failure
}
```

## See also

- Polyfill of `Reflect.defineProperty` in `core-js`
- `Reflect`
- `Object.defineProperty()`
- `handler.defineProperty()`
