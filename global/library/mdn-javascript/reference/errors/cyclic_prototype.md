---
title: "TypeError: can't set prototype: it would cause a prototype chain cycle"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/errors/cyclic_prototype/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TypeError: can't set prototype: it would cause a prototype chain cycle

The JavaScript exception "TypeError: can't set prototype: it would cause a prototype chain cycle" occurs when an object's prototype is set to an object such that the prototype chain becomes circular (`a` and `b` both have each other in their prototype chains).

## Message

```plain
TypeError: Cyclic __proto__ value (V8-based)
TypeError: can't set prototype: it would cause a prototype chain cycle (Firefox)
TypeError: cyclic __proto__ value (Safari)
```

## Error type

`TypeError`

## What went wrong?

A loop, also called a cycle, was introduced in a prototype chain. That means that when walking this prototype chain, the same place would be accessed over and over again, instead of eventually reaching `null`.

This error is thrown at the time of setting the prototype. In an operation like `Object.setPrototypeOf(a, b)`, if `a` already exists in the prototype chain of `b`, this error will be thrown.

## Examples

```js
const a = {};
Object.setPrototypeOf(a, a);
// TypeError: can't set prototype: it would cause a prototype chain cycle
```

```js
const a = {};
const b = {};
const c = {};
Object.setPrototypeOf(a, b);
Object.setPrototypeOf(b, c);
Object.setPrototypeOf(c, a);
// TypeError: can't set prototype: it would cause a prototype chain cycle
```

## See also

- Object Prototypes
- Inheritance and the prototype chain
