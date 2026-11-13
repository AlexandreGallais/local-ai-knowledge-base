---
title: "no-useless-collection-argument"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/no-useless-collection-argument.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# no-useless-collection-argument

📝 Disallow useless values or fallbacks in `Set`, `Map`, `WeakSet`, or `WeakMap`.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

🔧💡 This rule is automatically fixable by the `--fix` CLI option and manually fixable by editor suggestions.

It's unnecessary to pass an empty array or string when constructing a `Set`, `Map`, `WeakSet`, or `WeakMap`, since they accept nullish values.

It's also unnecessary to provide a fallback for possible nullish values.

## Examples

```js
// ❌
const set = new Set([]);
// ❌
const set = new Set("");

// ✅
const set = new Set();
```

```js
// ❌
const set = new Set(foo ?? []);
// ❌
const set = new Set(foo ?? "");

// ✅
const set = new Set(foo);
```
