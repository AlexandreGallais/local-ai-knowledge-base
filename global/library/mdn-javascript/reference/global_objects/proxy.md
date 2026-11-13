---
title: "Proxy (part 1 of 2)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/proxy/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Proxy

The **`Proxy`** object enables you to create a proxy for another object, which can intercept and redefine fundamental operations for that object.

## Description

The `Proxy` object allows you to create an object that can be used in place of the original object, but which may redefine fundamental `Object` operations like getting, setting, and defining properties. Proxy objects are commonly used to log property accesses, validate, format, or sanitize inputs, and so on.

You create a `Proxy` with two parameters:

- `target`: the original object which you want to proxy
- `handler`: an object that defines which operations will be intercepted and how to redefine intercepted operations.

For example, this code creates a proxy for the `target` object.

```js
const target = {
  message1: "hello",
  message2: "everyone",
};

const handler1 = {};

const proxy1 = new Proxy(target, handler1);
```

Because the handler is empty, this proxy behaves just like the original target:

```js
console.log(proxy1.message1); // hello
console.log(proxy1.message2); // everyone
```

To customize the proxy, we define functions on the handler object:

```js
const target = {
  message1: "hello",
  message2: "everyone",
};

const handler2 = {
  get(target, prop, receiver) {
    return "world";
  },
};

const proxy2 = new Proxy(target, handler2);
```

Here we've provided an implementation of the `get()` handler, which intercepts attempts to access properties in the target.

Handler functions are sometimes called _traps_, presumably because they trap calls to the target object. The trap in `handler2` above redefines all property accessors:

```js
console.log(proxy2.message1); // world
console.log(proxy2.message2); // world
```

Proxies are often used with the `Reflect` object, which provides some methods with the same names as the `Proxy` traps. The `Reflect` methods provide the reflective semantics for invoking the corresponding object internal methods. For example, we can call `Reflect.get` if we don't wish to redefine the object's behavior:

```js
const target = {
  message1: "hello",
  message2: "everyone",
};

const handler3 = {
  get(target, prop, receiver) {
    if (prop === "message2") {
      return "world";
    }
    return Reflect.get(...arguments);
  },
};

const proxy3 = new Proxy(target, handler3);

console.log(proxy3.message1); // hello
console.log(proxy3.message2); // world
```

The `Reflect` method still interacts with the object through object internal methods — it doesn't "de-proxify" the proxy if it's invoked on a proxy. If you use `Reflect` methods within a proxy trap, and the `Reflect` method call gets intercepted by the trap again, there may be infinite recursion.

### Terminology

The following terms are used when talking about the functionality of proxies.

- handler
    The object passed as the second argument to the `Proxy` constructor. It contains the traps which define the behavior of the proxy.
- trap
    The function that defines the behavior for the corresponding object internal method. (This is analogous to the concept of _traps_ in operating systems.)
- target
    Object which the proxy virtualizes. It is often used as storage backend for the proxy. Invariants (semantics that remain unchanged) regarding object non-extensibility or non-configurable properties are verified against the target.
- invariants
    Semantics that remain unchanged when implementing custom operations. If your trap implementation violates the invariants of a handler, a `TypeError` will be thrown.

### Object internal methods

Objects are collections of properties. However, the language doesn't provide any machinery to _directly_ manipulate data stored in the object — rather, the object defines some internal methods specifying how it can be interacted with. For example, when you read `obj.x`, you may expect the following to happen:

- The `x` property is searched up the prototype chain until it is found.
- If `x` is a data property, the property descriptor's `value` attribute is returned.
- If `x` is an accessor property, the getter is invoked, and the return value of the getter is returned.

There isn't anything special about this process in the language — it's just because ordinary objects, by default, have a `[[Get]]` internal method that is defined with this behavior. The `obj.x` property access syntax simply invokes the `[[Get]]` method on the object, and the object uses its own internal method implementation to determine what to return.

As another example, arrays differ from normal objects, because they have a magic `length` property that, when modified, automatically allocates empty slots or removes elements from the array. Similarly, adding array elements automatically changes the `length` property. This is because arrays have a `[[DefineOwnProperty]]` internal method that knows to update `length` when an integer index is written to, or update the array contents when `length` is written to. Such objects whose internal methods have different implementations from ordinary objects are called _exotic objects_. `Proxy` enable developers to define their own exotic objects with full capacity.

All objects have the following internal methods:

| Internal method         | Corresponding trap                                                               |
| ----------------------- | -------------------------------------------------------------------------------- |
| `[[GetPrototypeOf]]`    | `getPrototypeOf()`                     |
| `[[SetPrototypeOf]]`    | `setPrototypeOf()`                     |
| `[[IsExtensible]]`      | `isExtensible()`                         |
| `[[PreventExtensions]]` | `preventExtensions()`               |
| `[[GetOwnProperty]]`    | `getOwnPropertyDescriptor()` |
| `[[DefineOwnProperty]]` | `defineProperty()`                     |
| `[[HasProperty]]`       | `has()`                                           |
| `[[Get]]`               | `get()`                                           |
| `[[Set]]`               | `set()`                                           |
| `[[Delete]]`            | `deleteProperty()`                     |
| `[[OwnPropertyKeys]]`   | `ownKeys()`                                   |

Function objects also have the following internal methods:

| Internal method | Corresponding trap                                 |
| --------------- | -------------------------------------------------- |
| `[[Call]]`      | `apply()`         |
| `[[Construct]]` | `construct()` |

It's important to realize that all interactions with an object eventually boils down to the invocation of one of these internal methods, and that they are all customizable through proxies. This means almost no behavior (except certain critical invariants) is guaranteed in the language — everything is defined by the object itself. When you run `delete obj.x`, there's no guarantee that `"x" in obj` returns `false` afterwards — it depends on the object's implementations of `[[Delete]]` and `[[HasProperty]]`. A `delete obj.x` may log things to the console, modify some global state, or even define a new property instead of deleting the existing one, although these semantics should be avoided in your own code.

All internal methods are called by the language itself, and are not directly accessible in JavaScript code. The `Reflect` namespace offers methods that do little more than call the internal methods, besides some input normalization/validation. In each trap's page, we list several typical situations when the trap is invoked, but these internal methods are called in _a lot_ of places. For example, array methods read and write to array through these internal methods, so methods like `push()` would also invoke `get()` and `set()` traps.

Most of the internal methods are straightforward in what they do. The only two that may be confusable are `[[Set]]` and `[[DefineOwnProperty]]`. For normal objects, the former invokes setters; the latter doesn't. (And `[[Set]]` calls `[[DefineOwnProperty]]` internally if there's no existing property or the property is a data property.) While you may know that the `obj.x = 1` syntax uses `[[Set]]`, and `Object.defineProperty()` uses `[[DefineOwnProperty]]`, it's not immediately apparent what semantics other built-in methods and syntaxes use. For example, class fields use the `[[DefineOwnProperty]]` semantic, which is why setters defined in the superclass are not invoked when a field is declared on the derived class.

## Constructor

- `Proxy()`
    Creates a new `Proxy` object.

> **Note:**
> There's no `Proxy.prototype` property, so `Proxy` instances do not have any special properties or methods.

## Static methods

- `Proxy.revocable()`
    Creates a revocable `Proxy` object.
