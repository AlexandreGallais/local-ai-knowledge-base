---
title: "handler.preventExtensions()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/proxy/proxy/preventextensions/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# handler.preventExtensions()

The **`handler.preventExtensions()`** method is a trap for the `[[PreventExtensions]]` object internal method, which is used by operations such as `Object.preventExtensions()`.

```js
const monster = {
  canEvolve: true,
};

const handler = {
  preventExtensions(target) {
    target.canEvolve = false;
    Object.preventExtensions(target);
    return true;
  },
};

const proxy = new Proxy(monster, handler);

console.log(monster.canEvolve);
// Expected output: true

Object.preventExtensions(proxy);

console.log(monster.canEvolve);
// Expected output: false
```

## Syntax

```js
new Proxy(target, {
  preventExtensions(target) {
  }
})
```

### Parameters

The following parameter is passed to the `preventExtensions()` method. `this` is bound to the handler.

- `target`
    The target object.

### Return value

The `preventExtensions()` method must return a `Boolean` indicating whether or not the operation was successful. Other values are coerced to booleans.

Many operations, including `Object.preventExtensions()`, throw a `TypeError` if the `[[PreventExtensions]]` internal method returns `false`.

## Description

### Interceptions

This trap can intercept these operations:

- `Object.preventExtensions()`
- `Reflect.preventExtensions()`
- `Object.seal()`
- `Object.freeze()`

Or any other operation that invokes the `[[PreventExtensions]]` internal method.

### Invariants

The proxy's `[[PreventExtensions]]` internal method throws a `TypeError` if the handler definition violates one of the following invariants:

- The result is only `true` if `Reflect.isExtensible()` on the target object returns `false` after calling `handler.preventExtensions()`.

## Examples

### Trapping of preventExtensions

The following code traps `Object.preventExtensions()`.

```js
const p = new Proxy(
  {},
  {
    preventExtensions(target) {
      console.log("called");
      Object.preventExtensions(target);
      return true;
    },
  },
);

console.log(Object.preventExtensions(p));
// "called"
// false
```

The following code violates the invariant.

```js
const p = new Proxy(
  {},
  {
    preventExtensions(target) {
      return true;
    },
  },
);

Object.preventExtensions(p); // TypeError is thrown
```

## See also

- `Proxy`
- `Proxy()` constructor
- `Object.preventExtensions()`
- `Reflect.preventExtensions()`
