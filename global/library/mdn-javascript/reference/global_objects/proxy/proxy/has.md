---
title: "handler.has()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/proxy/proxy/has/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# handler.has()

The **`handler.has()`** method is a trap for the `[[HasProperty]]` object internal method, which is used by operations such as the `in` operator.

```js
const handler = {
  has(target, key) {
    if (key[0] === "_") {
      return false;
    }
    return key in target;
  },
};

const monster = {
  _secret: "<example-value>",
  eyeCount: 4,
};

const proxy = new Proxy(monster, handler);
console.log("eyeCount" in proxy);
// Expected output: true

console.log("<example-value>" in proxy);
// Expected output: false

console.log("<example-value>" in monster);
// Expected output: true
```

## Syntax

```js
new Proxy(target, {
  has(target, property) {
  }
})
```

### Parameters

The following parameters are passed to `has()` method. `this` is bound to the handler.

- `target`
    The target object.
- `property`
    A string or `Symbol` representing the property name.

### Return value

The `has()` method must return a `Boolean` indicating whether or not the property exists. Other values are coerced to booleans.

## Description

### Interceptions

This trap can intercept these operations:

- The `in` operator: `foo in proxy`
- `with` check: `with(proxy) { (foo); }`
- `Reflect.has()`

Or any other operation that invokes the `[[HasProperty]]` internal method.

### Invariants

The proxy's `[[HasProperty]]` internal method throws a `TypeError` if the handler definition violates one of the following invariants:

- A property cannot be reported as non-existent, if it exists as a non-configurable own property of the target object. That is, if `Reflect.getOwnPropertyDescriptor()` returns `configurable: false` for the property on `target`, the trap must return `true`.
- A property cannot be reported as non-existent, if it exists as an own property of the target object and the target object is not extensible. That is, if `Reflect.isExtensible()` returns `false` on `target`, and `Reflect.getOwnPropertyDescriptor()` returns a property descriptor for the property on `target`, the trap must return `true`.

## Examples

### Trapping the in operator

The following code traps the `in` operator.

```js
const p = new Proxy(
  {},
  {
    has(target, prop) {
      console.log(`called: ${prop}`);
      return true;
    },
  },
);

console.log("a" in p);
// "called: a"
// true
```

The following code violates an invariant.

```js
const obj = { a: 10 };
Object.preventExtensions(obj);

const p = new Proxy(obj, {
  has(target, prop) {
    return false;
  },
});

"a" in p; // TypeError is thrown
```

## See also

- `Proxy`
- `Proxy()` constructor
- `in`
- `Reflect.has()`
