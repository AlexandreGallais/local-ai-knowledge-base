---
title: "Proxy.revocable()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/proxy/revocable/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Proxy.revocable()

The **`Proxy.revocable()`** static method creates a revocable `Proxy` object.

## Syntax

```js
Proxy.revocable(target, handler)
```

### Parameters

- `target`
    A target object to wrap with `Proxy`. It can be any sort of object, including a native array, a function, or even another proxy.
- `handler`
    An object whose properties are functions defining the behavior of `proxy` when an operation is performed on it.

### Return value

A plain object with the following two properties:

- `proxy`
    A Proxy object exactly the same as one created with a `new Proxy(target, handler)` call.
- `revoke`
    A function with no parameters to revoke (switch off) the `proxy`.

## Description

The `Proxy.revocable()` factory function is the same as the `Proxy()` constructor, except that in addition to creating a proxy object, it also creates a `revoke` function that can be called to disable the proxy. The proxy object and the `revoke` function are wrapped in a plain object.

The `revoke` function does not take any parameters, nor does it rely on the `this` value. The created `proxy` object is attached to the `revoke` function as a private field that the `revoke` function accesses on itself when called (the existence of the private field is not observable from the outside, but it has implications on how garbage collection happens). The `proxy` object is _not_ captured within the closure of the `revoke` function (which will make garbage collection of `proxy` impossible if `revoke` is still alive).

After the `revoke()` function gets called, the proxy becomes unusable: any trap to a handler throws a `TypeError`. Once a proxy is revoked, it remains revoked, and calling `revoke()` again has no effect — in fact, the call to `revoke()` detaches the `proxy` object from the `revoke` function, so the `revoke` function will not be able to access the proxy again at all. If the proxy is not referenced elsewhere, it will then be eligible for garbage collection. The `revoke` function also detaches `target` and `handler` from the `proxy`, so if `target` is not referenced elsewhere, it will also be eligible for garbage collection, even when its proxy is still alive, since there's no longer a way to meaningfully interact with the target object.

Letting users interact with an object through a revocable proxy allows you to control the lifetime of the object exposed to the user — you can make the object garbage-collectable even when the user is still holding a reference to its proxy.

## Examples

### Using Proxy.revocable()

```js
const revocable = Proxy.revocable(
  {},
  {
    get(target, name) {
      return `[[${name}]]`;
    },
  },
);
const proxy = revocable.proxy;
console.log(proxy.foo); // "[[foo]]"

revocable.revoke();

console.log(proxy.foo); // TypeError is thrown
proxy.foo = 1; // TypeError again
delete proxy.foo; // still TypeError
typeof proxy; // "object", typeof doesn't trigger any trap
```

## See also

- `Proxy`
