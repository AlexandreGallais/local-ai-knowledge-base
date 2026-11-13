---
title: "handler.deleteProperty()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/proxy/proxy/deleteproperty/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# handler.deleteProperty()

The **`handler.deleteProperty()`** method is a trap for the `[[Delete]]` object internal method, which is used by operations such as the `delete` operator.

```js
const monster = {
  texture: "scaly",
};

const handler = {
  deleteProperty(target, prop) {
    if (prop in target) {
      delete target[prop];
      console.log(`property removed: ${prop}`);
      // Expected output: "property removed: texture"
    }
  },
};

console.log(monster.texture);
// Expected output: "scaly"

const proxy = new Proxy(monster, handler);
delete proxy.texture;

console.log(monster.texture);
// Expected output: undefined
```

## Syntax

```js
new Proxy(target, {
  deleteProperty(target, property) {
  }
})
```

### Parameters

The following parameters are passed to the `deleteProperty()` method. `this` is bound to the handler.

- `target`
    The target object.
- `property`
    A string or `Symbol` representing the property name.

### Return value

The `deleteProperty()` method must return a `Boolean` indicating whether or not the property has been successfully deleted. Other values are coerced to booleans.

Many operations, including the `delete` operator when in strict mode, throw a `TypeError` if the `[[Delete]]` internal method returns `false`.

## Description

### Interceptions

This trap can intercept these operations:

- The `delete` operator: `delete proxy[foo]` and
  `delete proxy.foo`
- `Reflect.deleteProperty()`

Or any other operation that invokes the `[[Delete]]` internal method.

### Invariants

The proxy's `[[Delete]]` internal method throws a `TypeError` if the handler definition violates one of the following invariants:

- A property cannot be reported as deleted, if it exists as a non-configurable own property of the target object. That is, if `Reflect.getOwnPropertyDescriptor()` returns `configurable: false` for the property on `target`, then the trap must return a falsy value.
- A property cannot be reported as deleted, if it exists as an own property of the target object and the target object is non-extensible. That is, if `Reflect.isExtensible()` returns `false` on `target`, and `Reflect.getOwnPropertyDescriptor()` returns a property descriptor for the property on `target`, then the trap must return a falsy value.

## Examples

### Trapping the delete operator

The following code traps the `delete` operator.

```js
const p = new Proxy(
  {},
  {
    deleteProperty(target, prop) {
      if (!(prop in target)) {
        console.log(`property not found: ${prop}`);
        return false;
      }
      delete target[prop];
      console.log(`property removed: ${prop}`);
      return true;
    },
  },
);

p.a = 10;
console.log("a" in p); // true

const result1 = delete p.a; // "property removed: a"
console.log(result1); // true
console.log("a" in p); // false

const result2 = delete p.a; // "property not found: a"
console.log(result2); // false
```

## See also

- `Proxy`
- `Proxy()` constructor
- `delete`
- `Reflect.deleteProperty()`
