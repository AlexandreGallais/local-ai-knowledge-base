---
title: "Object.getPrototypeOf()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/object/getprototypeof/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Object.getPrototypeOf()

The **`Object.getPrototypeOf()`** static method returns the prototype
(i.e., the value of the internal `[[Prototype]]` property) of the specified
object.

```js
const prototype = {};
const object = Object.create(prototype);

console.log(Object.getPrototypeOf(object) === prototype);
// Expected output: true
```

## Syntax

```js
Object.getPrototypeOf(obj)
```

### Parameters

- `obj`
    The object whose prototype is to be returned.

### Return value

The prototype of the given object, which may be `null`.

## Examples

### Using getPrototypeOf

```js
const proto = {};
const obj = Object.create(proto);
Object.getPrototypeOf(obj) === proto; // true
```

### Non-object coercion

In ES5, it will throw a `TypeError` exception if the `obj`
parameter isn't an object. In ES2015, the parameter will be coerced to an
`Object`.

```js
Object.getPrototypeOf("foo");
// TypeError: "foo" is not an object (ES5 code)
Object.getPrototypeOf("foo");
// String.prototype                  (ES2015 code)
```

## See also

- Polyfill of `Object.getPrototypeOf` in `core-js`
- es-shims polyfill of `Object.getPrototypeOf`
- `Object.prototype.isPrototypeOf()`
- `Object.setPrototypeOf()`
- `Object.prototype.__proto__`
- `Reflect.getPrototypeOf()`
- Object.getPrototypeOf by John Resig (2008)
