---
title: "prefer-array-slice"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/prefer-array-slice.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# prefer-array-slice

📝 Prefer `Array#slice()` over `Array#splice()` when reading from the returned array.

💼🚫 This rule is enabled in the ✅ `recommended` config. This rule is _disabled_ in the ☑️ `unopinionated` config.

💡 This rule is manually fixable by editor suggestions.

Prefer `Array#slice()` over `Array#splice()` when reading from the returned array.

`Array#splice()` mutates the source array. When the returned elements are immediately indexed or read with `.at()`, `Array#slice()` expresses the read-only intent without changing the source array.

## Examples

```js
// ❌
const foo = process.argv.splice(2)[0];

// ✅
const foo = process.argv.slice(2)[0];
```

```js
// ❌
const foo = array.splice(index).at(0);

// ✅
const foo = array.slice(index).at(0);
```

```js
// ✅
array.splice(index);
```

```js
// ✅
array.splice(index, deleteCount)[0];
```

Keep `Array#splice()` when intentional mutation is part of the operation.
