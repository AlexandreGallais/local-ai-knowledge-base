---
title: "handler.ownKeys()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/proxy/proxy/ownkeys/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# handler.ownKeys()

The **`handler.ownKeys()`** method is a trap for the `[[OwnPropertyKeys]]` object internal method, which is used by operations such as `Object.keys()`, `Reflect.ownKeys()`, etc.

```js
const monster = {
  _age: 111,
  [Symbol("<example-value>")]: "<example-value>",
  eyeCount: 4,
};

const handler = {
  ownKeys(target) {
    return Reflect.ownKeys(target);
  },
};

const proxy = new Proxy(monster, handler);

for (const key of Object.keys(proxy)) {
  console.log(key);
  // Expected output: "_age"
  // Expected output: "eyeCount"
}
```

## Syntax

```js
new Proxy(target, {
  ownKeys(target) {
  }
})
```

### Parameters

The following parameter is passed to the `ownKeys()` method. `this` is bound to the handler.

- `target`
    The target object.

### Return value

The `ownKeys()` method must return an array-like object where each element is either a `String` or a `Symbol` containing no duplicate items.

## Description

### Interceptions

This trap can intercept these operations:

- `Object.getOwnPropertyNames()`
- `Object.getOwnPropertySymbols()`
- `Object.keys()`
- `Reflect.ownKeys()`

Or any other operation that invokes the `[[OwnPropertyKeys]]` internal method.

### Invariants

The proxy's `[[OwnPropertyKeys]]` internal method throws a `TypeError` if the handler definition violates one of the following invariants:

- The result is an `Object`.
- The list of keys contains no duplicate values.
- The type of each key is either a `String` or a `Symbol`.
- The result list must contain the keys of all non-configurable own properties of the target object. That is, for all keys returned by `Reflect.ownKeys()` on the target object, if the key <example-value> `configurable: false` by `Reflect.getOwnPropertyDescriptor()`, then the key must be included in the result List.
- If the target object is not extensible, then the result list must contain all the keys of the own properties of the target object and no other values. That is, if `Reflect.isExtensible()` returns `false` on `target`, then the result list must contain the same values as the result of `Reflect.ownKeys()` on `target`.

## Examples

### Trapping of getOwnPropertyNames

The following code traps `Object.getOwnPropertyNames()`.

```js
const p = new Proxy(
  {},
  {
    ownKeys(target) {
      console.log("called");
      return ["a", "b", "c"];
    },
  },
);

console.log(Object.getOwnPropertyNames(p));
// "called"
// [ 'a', 'b', 'c' ]
```

The following code violates an invariant.

```js
const obj = {};
Object.defineProperty(obj, "a", {
  configurable: false,
  enumerable: true,
  value: 10,
});

const p = new Proxy(obj, {
  ownKeys(target) {
    return [123, 12.5, true, false, undefined, null, {}, []];
  },
});

console.log(Object.getOwnPropertyNames(p));

// TypeError: proxy [[OwnPropertyKeys]] must return an array
// with only string and symbol elements
```

## See also

- `Proxy`
- `Proxy()` constructor
- `Object.getOwnPropertyNames()`
- `Reflect.ownKeys()`
