---
title: "SyntaxError: property name __proto__ appears more than once in object literal"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/errors/duplicate_proto/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SyntaxError: property name __proto__ appears more than once in object literal

The JavaScript exception "property name \_\_proto\_\_ appears more than once in object literal" occurs when an object literal contains multiple occurrences of the `__proto__` field, which is used to set the prototype of this new object.

## Message

```plain
SyntaxError: Duplicate __proto__ fields are not allowed in object literals (V8-based)
SyntaxError: property name __proto__ appears more than once in object literal (Firefox)
SyntaxError: Attempted to redefine __proto__ property. (Safari)
```

## Error type

`SyntaxError`

## What went wrong?

The `__proto__` key, unlike other property keys, is a special syntax in an object literal. It is used to set the prototype of the object being created and is not allowed to appear more than once in an object literal. Note that this restriction only applies to the `__proto__` prototype setter syntax: if it actually has the effect of creating a property called `__proto__`, then it can appear multiple times. See prototype setter for the exact syntax restrictions.

Worth noting that the `__proto__` key in object literals is a special syntax and is not deprecated, unlike the `Object.prototype.__proto__` accessor property.

## Examples

### Invalid cases

```js
const obj = { __proto__: {}, __proto__: { a: 1 } };
```

### Valid cases

```js
// Only setting the prototype once
const obj = { __proto__: { a: 1 } };

// These syntaxes all create a property called "__proto__" and can coexist
// They would overwrite each other and the last one is actually used
const __proto__ = null;
const obj2 = {
  ["__proto__"]: {},
  __proto__,
  __proto__() {},
  get __proto__() {
    return 1;
  },
};
```

## See also

- Object initializer
- Inheritance and the prototype chain
