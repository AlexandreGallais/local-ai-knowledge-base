---
title: "handler.set()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/proxy/proxy/set/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# handler.set()

The **`handler.set()`** method is a trap for the `[[Set]]` object internal method, which is used by operations such as using property accessors to set a property's value.

```js
const monster = { eyeCount: 4 };

const handler = {
  set(obj, prop, value) {
    if (prop === "eyeCount" && value % 2 !== 0) {
      console.log("Monsters must have an even number of eyes");
    } else {
      return Reflect.set(...arguments);
    }
  },
};

const proxy = new Proxy(monster, handler);

proxy.eyeCount = 1;
// Expected output: "Monsters must have an even number of eyes"

console.log(proxy.eyeCount);
// Expected output: 4

proxy.eyeCount = 2;
console.log(proxy.eyeCount);
// Expected output: 2
```

## Syntax

```js
new Proxy(target, {
  set(target, property, value, receiver) {
  }
})
```

### Parameters

The following parameters are passed to the `set()` method. `this` is bound to the handler.

- `target`
    The target object.
- `property`
    A string or `Symbol` representing the property name.
- `value`
    The new value of the property to set.
- `receiver`
    The `this` value for setters; see `Reflect.set()`. This is usually either the proxy itself or an object that inherits from the proxy.

### Return value

The `set()` method must return a `Boolean` indicating whether or not the assignment succeeded. Other values are coerced to booleans.

Many operations, including using property accessors in strict mode, throw a `TypeError` if the `[[Set]]` internal method returns `false`.

## Description

### Interceptions

This trap can intercept these operations:

- Property assignment: `proxy[foo] = bar` and `proxy.foo = bar`
- `Reflect.set()`

Or any other operation that invokes the `[[Set]]` internal method.

### Invariants

The proxy's `[[Set]]` internal method throws a `TypeError` if the handler definition violates one of the following invariants:

- Cannot change the value of a property to be different from the value of the corresponding target object property, if the corresponding target object property is a non-writable, non-configurable own data property. That is, if `Reflect.getOwnPropertyDescriptor()` returns `configurable: false, writable: false` for the property on `target`, and `value` is different from the `value` attribute in the `target`'s property descriptor, then the trap must return a falsy value.
- Cannot set the value of a property if the corresponding target object property is a non-configurable own accessor property that has an undefined setter. That is, if `Reflect.getOwnPropertyDescriptor()` returns `configurable: false, set: undefined` for the property on `target`, then the trap must return a falsy value.

## Examples

### Trap setting of a property value

The following code traps setting a property value.

```js
const p = new Proxy(
  {},
  {
    set(target, prop, value, receiver) {
      target[prop] = value;
      console.log(`property set: ${prop} = ${value}`);
      return true;
    },
  },
);

console.log("a" in p); // false

p.a = 10; // "property set: a = 10"
console.log("a" in p); // true
console.log(p.a); // 10
```

## See also

- `Proxy`
- `Proxy()` constructor
- `Reflect.set()`
