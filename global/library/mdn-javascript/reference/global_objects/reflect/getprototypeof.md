---
title: "Reflect.getPrototypeOf()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/reflect/getprototypeof/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Reflect.getPrototypeOf()

The **`Reflect.getPrototypeOf()`** static method is like `Object.getPrototypeOf()`. It returns the prototype of the specified object.

```js
const object = {
  foo: 42,
};

const proto = Reflect.getPrototypeOf(object);

console.log(proto);
// Expected output: Object {  }

console.log(Reflect.getPrototypeOf(proto));
// Expected output: null
```

## Syntax

```js
Reflect.getPrototypeOf(target)
```

### Parameters

- `target`
    The target object of which to get the prototype.

### Return value

The prototype of the given object, which may be an object or `null`.

### Exceptions

- `TypeError`
    Thrown if `target` is not an object.

## Description

`Reflect.getPrototypeOf()` provides the reflective semantic of retrieving the prototype of an object. The only difference with `Object.getPrototypeOf()` is how non-object targets are handled. `Reflect.getPrototypeOf()` throws a `TypeError` if the target is not an object, while `Object.getPrototypeOf()` coerces it to an object.

`Reflect.getPrototypeOf()` invokes the `[[GetPrototypeOf]]` object internal method of `target`.

## Examples

### Using Reflect.getPrototypeOf()

```js
Reflect.getPrototypeOf({}); // Object.prototype
Reflect.getPrototypeOf(Object.prototype); // null
Reflect.getPrototypeOf(Object.create(null)); // null
```

### Difference with Object.getPrototypeOf()

```js
// Same result for Objects
Object.getPrototypeOf({}); // Object.prototype
Reflect.getPrototypeOf({}); // Object.prototype

// Both throw in ES5 for non-Objects
Object.getPrototypeOf("foo"); // Throws TypeError
Reflect.getPrototypeOf("foo"); // Throws TypeError

// In ES2015 only Reflect throws, Object coerces non-Objects
Object.getPrototypeOf("foo"); // String.prototype
Reflect.getPrototypeOf("foo"); // Throws TypeError

// To mimic the Object ES2015 behavior you need to coerce
Reflect.getPrototypeOf(Object("foo")); // String.prototype
```

## See also

- Polyfill of `Reflect.getPrototypeOf` in `core-js`
- es-shims polyfill of `Reflect.getPrototypeOf`
- `Reflect`
- `Object.getPrototypeOf()`
- `handler.getPrototypeOf()`
