---
title: "handler.isExtensible()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/proxy/proxy/isextensible/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# handler.isExtensible()

The **`handler.isExtensible()`** method is a trap for the `[[IsExtensible]]` object internal method, which is used by operations such as `Object.isExtensible()`.

```js
const monster = {
  canEvolve: true,
};

const handler = {
  isExtensible(target) {
    return Reflect.isExtensible(target);
  },
  preventExtensions(target) {
    target.canEvolve = false;
    return Reflect.preventExtensions(target);
  },
};

const proxy = new Proxy(monster, handler);

console.log(Object.isExtensible(proxy));
// Expected output: true

console.log(monster.canEvolve);
// Expected output: true

Object.preventExtensions(proxy);

console.log(Object.isExtensible(proxy));
// Expected output: false

console.log(monster.canEvolve);
// Expected output: false
```

## Syntax

```js
new Proxy(target, {
  isExtensible(target) {
  }
})
```

### Parameters

The following parameter is passed to the `isExtensible()` method. `this` is bound to the handler.

- `target`
    The target object.

### Return value

The `isExtensible()` method must return a `Boolean` indicating whether or not the target object is extensible. Other values are coerced to booleans.

## Description

### Interceptions

This trap can intercept these operations:

- `Object.isExtensible()`
- `Reflect.isExtensible()`

Or any other operation that invokes the `[[IsExtensible]]` internal method.

### Invariants

The proxy's `[[IsExtensible]]` internal method throws a `TypeError` if the handler definition violates one of the following invariants:

- The result must be the same as `Reflect.isExtensible()` on the target object.

## Examples

### Trapping of isExtensible

The following code traps `Object.isExtensible()`.

```js
const p = new Proxy(
  {},
  {
    isExtensible(target) {
      console.log("called");
      return true;
    },
  },
);

console.log(Object.isExtensible(p));
// "called"
// true
```

The following code violates the invariant.

```js
const p = new Proxy(
  {},
  {
    isExtensible(target) {
      return false;
    },
  },
);

Object.isExtensible(p); // TypeError is thrown
```

## See also

- `Proxy`
- `Proxy()` constructor
- `Object.isExtensible()`
- `Reflect.isExtensible()`
- `Reflect.preventExtensions()`
