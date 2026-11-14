---
title: "TypeError: WeakSet key/WeakMap value 'x' must be an object or an unregistered symbol"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/errors/key_not_weakly_held/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TypeError: WeakSet key/WeakMap value 'x' must be an object or an unregistered symbol

The JavaScript exception "WeakSet key (or WeakMap value) 'x' must be an object or an unregistered symbol" occurs when a value of invalid type is used as a key in a `WeakSet` or as a value in a `WeakMap`.

## Message

```plain
TypeError: Invalid value used as weak map key (V8-based)
TypeError: WeakMap key 1 must be an object or an unregistered symbol (Firefox)
TypeError: WeakMap keys must be objects or non-registered symbols (Safari)

TypeError: Invalid value used in weak set (V8-based)
TypeError: WeakSet value 1 must be an object or an unregistered symbol (Firefox)
TypeError: WeakSet values must be objects or non-registered symbols (Safari)
```

## Error type

`TypeError`

## What went wrong?

`WeakSet` and `WeakMap` require the keys to be _garbage collectable_. Only objects and non-registered symbols (that is, symbols not returned by `Symbol.for()`) are valid. For more information, see Memory management. If you want to add keys that are strings, numbers, or other primitive values, you should store them in a regular `Set` or `Map` instead.

## Examples

### Invalid cases

```js
new WeakSet().add(1); // TypeError
new WeakMap().set(1, {}); // TypeError
new WeakSet([1]); // TypeError
new WeakMap([[1, {}]]); // TypeError
```

### Valid cases

```js
new WeakSet().add({}); // OK
new WeakMap().set({}, 1); // OK

new Set([1]); // OK
new Map([[1, {}]]); // OK
```

## See also

- Memory management
- `WeakSet`
- `WeakMap`
- `Set`
- `Map`
