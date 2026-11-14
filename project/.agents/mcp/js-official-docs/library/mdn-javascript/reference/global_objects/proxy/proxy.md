---
title: "Proxy() constructor"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/proxy/proxy/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Proxy() constructor

The **`Proxy()`** constructor creates `Proxy` objects.

## Syntax

```js
new Proxy(target, handler)
```

> **Note:**
> `Proxy()` can only be constructed with `new`. Attempting to call it without `new` throws a `TypeError`.

### Parameters

- `target`
    A target object to wrap with `Proxy`. It can be any sort of object,
    including a native array, a function, or even another proxy.
- `handler`
    An object whose properties are functions that define the behavior of the proxy when
    an operation is performed on it.

## Description

Use the `Proxy()` constructor to create a new `Proxy` object.
This constructor takes two mandatory arguments:

- `target` is the object for which you want to create the proxy
- `handler` is the object that defines the custom behavior of the proxy.

An empty handler will create a proxy that behaves, in almost all respects, exactly like
the target. By defining any of a set group of functions on the `handler`
object, you can customize specific aspects of the proxy's behavior. For example, by
defining `get()` you can provide a customized version of the target's
property accessor.

### Handler functions

This section lists all the handler functions you can define. Handler functions are
sometimes called _traps_, because they trap calls to the underlying target
object.

- `handler.apply()`
    A trap for a function call.
- `handler.construct()`
    A trap for the `new` operator.
- `handler.defineProperty()`
    A trap for `Object.defineProperty`.
- `handler.deleteProperty()`
    A trap for the `delete` operator.
- `handler.get()`
    A trap for getting property values.
- `handler.getOwnPropertyDescriptor()`
    A trap for `Object.getOwnPropertyDescriptor`.
- `handler.getPrototypeOf()`
    A trap for `Object.getPrototypeOf`.
- `handler.has()`
    A trap for the `in` operator.
- `handler.isExtensible()`
    A trap for `Object.isExtensible`.
- `handler.ownKeys()`
    A trap for `Object.getOwnPropertyNames` and
    `Object.getOwnPropertySymbols`.
- `handler.preventExtensions()`
    A trap for `Object.preventExtensions`.
- `handler.set()`
    A trap for setting property values.
- `handler.setPrototypeOf()`
    A trap for `Object.setPrototypeOf`.

## Examples

### Selectively proxy property accessors

In this example the target has two properties, `notProxied` and
`proxied`. We define a handler that returns a different value for
`proxied`, and lets any other accesses through to the target.

```js
const target = {
  notProxied: "original value",
  proxied: "original value",
};

const handler = {
  get(target, prop, receiver) {
    if (prop === "proxied") {
      return "replaced value";
    }
    return Reflect.get(...arguments);
  },
};

const proxy = new Proxy(target, handler);

console.log(proxy.notProxied); // "original value"
console.log(proxy.proxied); // "replaced value"
```

## See also

- Meta programming guide
- `Reflect`
