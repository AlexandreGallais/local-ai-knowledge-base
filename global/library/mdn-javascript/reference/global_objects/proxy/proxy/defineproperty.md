---
title: "handler.defineProperty()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/proxy/proxy/defineproperty/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# handler.defineProperty()

The **`handler.defineProperty()`** method is a trap for the `[[DefineOwnProperty]]` object internal method, which is used by operations such as `Object.defineProperty()`.

```js
const handler = {
  defineProperty(target, key, descriptor) {
    invariant(key, "define");
    return true;
  },
};

function invariant(key, action) {
  if (key[0] === "_") {
    throw new Error(`Invalid attempt to ${action} private "${key}" property`);
  }
}

const monster = {};
const proxy = new Proxy(monster, handler);

console.log((proxy._secret = "<example-value>"));
// Expected output: Error: Invalid attempt to define private "<example-value>" <example-value>
```

## Syntax

```js
new Proxy(target, {
  defineProperty(target, property, descriptor) {
  }
})
```

### Parameters

The following parameters are passed to the `defineProperty()` method. `this` is bound to the handler.

- `target`
    The target object.
- `property`
    A string or `Symbol` representing the property name.
- `descriptor`
    The descriptor for the property being defined or modified.

### Return value

The `defineProperty()` method must return a `Boolean` indicating whether or not the property has been successfully defined. Other values are coerced to booleans.

Many operations, including `Object.defineProperty()` and `Object.defineProperties()`, throw a `TypeError` if the `[[DefineOwnProperty]]` internal method returns `false`.

## Description

### Interceptions

This trap can intercept these operations:

- `Object.defineProperty()`, `Object.defineProperties()`
- `Reflect.defineProperty()`

Or any other operation that invokes the `[[DefineOwnProperty]]` internal method.

### Invariants

The proxy's `[[DefineOwnProperty]]` internal method throws a `TypeError` if the handler definition violates one of the following invariants:

- A property cannot be added, if the target object is not extensible. That is, if `Reflect.isExtensible()` returns `false` on `target`, and `Reflect.getOwnPropertyDescriptor()` returns `undefined` for the property on `target`, then the trap must return a falsy value.
- A property cannot be non-configurable, unless there exists a corresponding non-configurable own property of the target object. That is, if `Reflect.getOwnPropertyDescriptor()` returns `undefined` or `configurable: true` for the property on `target`, and `descriptor.configurable` is `false`, then the trap must return a falsy value.
- A non-configurable property cannot be non-writable, unless there exists a corresponding non-configurable, non-writable own property of the target object. That is, if `Reflect.getOwnPropertyDescriptor()` returns `configurable: false, writable: true` for the property on `target`, and `descriptor.writable` is `false`, then the trap must return a falsy value.
- If a property has a corresponding property on the target object, then the target object property's descriptor must be compatible with `descriptor`. That is, pretending `target` is an ordinary object, and `Object.defineProperty(target, property, descriptor)` would throw an error, then the trap must return a falsy value. The `Object.defineProperty()` reference contains more information, but to summarize, when the target property is non-configurable, the following must hold:
  - `configurable`, `enumerable`, `get`, and `set` cannot be changed
  - the property cannot be switched between data and accessor
  - the `writable` attribute can only be changed from `true` to `false`
  - the `value` attribute can only be changed if `writable` is `true`

## Examples

### Trapping of defineProperty

The following code traps `Object.defineProperty()`.

```js
const p = new Proxy(
  {},
  {
    defineProperty(target, prop, descriptor) {
      console.log(`called: ${prop}`);
      return true;
    },
  },
);

const desc = { configurable: true, enumerable: true, value: 10 };
Object.defineProperty(p, "a", desc); // "called: a"
```

When calling `Object.defineProperty()` or
`Reflect.defineProperty()`, the `descriptor` passed to
`defineProperty()` trap has one restriction—only following properties are
usable (non-standard properties will be ignored):

- `enumerable`
- `configurable`
- `writable`
- `value`
- `get`
- `set`

```js
const p = new Proxy(
  {},
  {
    defineProperty(target, prop, descriptor) {
      console.log(descriptor);
      return Reflect.defineProperty(target, prop, descriptor);
    },
  },
);

Object.defineProperty(p, "name", {
  value: "proxy",
  type: "custom",
}); // { value: 'proxy' }
```

## See also

- `Proxy`
- `Proxy()` constructor
- `Object.defineProperty()`
- `Reflect.defineProperty()`
