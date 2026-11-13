---
title: "TypeError: can't set prototype of this object"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/errors/cant_set_prototype/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TypeError: can't set prototype of this object

The JavaScript exception "can't set prototype of this object" occurs when attempting to set the prototype of an object, but the object's prototype is frozen, either by being a built-in immutable prototype object, or by being non-extensible.

## Message

```plain
TypeError: Immutable prototype object 'Object.prototype' cannot have their prototype set (V8-based)
TypeError: #<Object> is not extensible (V8-based)
TypeError: can't set prototype of this object (Firefox)
TypeError: Cannot set prototype of immutable prototype object (Safari)
TypeError: Attempted to assign to readonly property. (Safari)
```

## Error type

`TypeError`

## What went wrong?

You are using one of the prototype-mutating methods—most notably, `Object.setPrototypeOf()`—on an object whose prototype is immutable. Some built-in objects have immutable prototypes, such as `Object.prototype` and `window`, for security reasons. User objects can also prevent prototype changes by using `Object.preventExtensions()`, `Object.seal()`, or `Object.freeze()`.

## Examples

### Changing the prototype of a built-in object

A selected few built-in objects have immutable prototypes. For example, you cannot change the prototype of `Object.prototype`:

```js
Object.setPrototypeOf(Object.prototype, {});
```

This prevents you from being able to arbitrarily change the behavior of all objects in the system. The prototype of `Object.prototype` is always `null`. However, other built-in prototype objects, such as `Function.prototype` and `Array.prototype`, are not protected by default in this regard.

### Changing the prototype of a non-extensible object

If you make an object non-extensible, you cannot change its prototype either:

```js
const obj = {};
Object.preventExtensions(obj);
Object.setPrototypeOf(obj, {});
// TypeError: can't set prototype of this object
```

## See also

- `Object.setPrototypeOf()`
- `Object.preventExtensions()`
