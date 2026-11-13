---
title: "no-object-methods-with-collections"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/no-object-methods-with-collections.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# no-object-methods-with-collections

📝 Disallow `Object` methods with `Map` or `Set`.

💼🚫 This rule is enabled in the ✅ `recommended` config. This rule is _disabled_ in the ☑️ `unopinionated` config.

💡 This rule is manually fixable by editor suggestions.

Disallow `Object.keys()`, `Object.values()`, and `Object.entries()` with `Map` or `Set`.

`Map` and `Set` contents are not own enumerable string-keyed properties, so `Object.keys(map)`, `Object.values(map)`, and `Object.entries(map)` usually return an empty array instead of the collection contents.

This rule reports clear `Map`, `ReadonlyMap`, `Set`, and `ReadonlySet` values. It intentionally does not report `WeakMap`, `WeakSet`, unknown values, or userland collection types. If you intentionally attach enumerable properties to a `Map` or `Set`, disable the rule for that line.

## Examples

```js
// ❌
const map = new Map([
	['a', 1],
	['b', 2],
]);

Object.keys(map);

// ✅
Array.from(map.keys());
```

```js
// ❌
const map = new Map([
	['a', 1],
	['b', 2],
]);

Object.values(map);

// ✅
Array.from(map.values());
```

```js
// ❌
const set = new Set(['a', 'b']);

Object.entries(set);

// ✅
Array.from(set.entries());
```
