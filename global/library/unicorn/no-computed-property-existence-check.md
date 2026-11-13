---
title: "no-computed-property-existence-check"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/no-computed-property-existence-check.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# no-computed-property-existence-check

📝 Disallow dynamic object property existence checks.

💼🚫 This rule is enabled in the ✅ `recommended` config. This rule is _disabled_ in the ☑️ `unopinionated` config.

💡 This rule is manually fixable by editor suggestions.

Dynamic property access and the `in` operator check inherited properties too. This can make values like `constructor` and `toString` look present even when the object does not define them.

Use `Object.hasOwn()` when you need to check whether an object has its own property. Prefer `Map#has()` or `Set#has()` when the value is really a lookup table.

## Examples

```js
// ❌
if (object[key]) {}

// ❌
if (key in object) {}

// ✅
if (object[key] === true) {}

// ✅
if (Object.hasOwn(object, key)) {}
```

```js
// ✅
const value = object[key];

// ✅
if ('key' in object) {}

// ✅
if (object['key']) {}
```

When type information is available and the property value is a known `boolean`, the access is a value read rather than an existence check, so it's allowed:

```ts
declare const object: {a: boolean; b: boolean};
declare const key: 'a' | 'b';

// ✅
if (object[key]) {}
```

A receiver that is known to be a `Map`, `Set`, `WeakMap`, `WeakSet`, or string is ignored, since `Object.hasOwn()` is not the replacement there. Use `Map#has()` or `Set#has()` for a collection.
