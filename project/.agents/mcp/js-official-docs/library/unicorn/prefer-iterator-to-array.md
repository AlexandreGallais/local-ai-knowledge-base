---
title: "prefer-iterator-to-array"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/prefer-iterator-to-array.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# prefer-iterator-to-array

📝 Prefer `Iterator#toArray()` over temporary arrays from iterator spreads.

💼🚫 This rule is enabled in the ✅ `recommended` config. This rule is _disabled_ in the ☑️ `unopinionated` config.

🔧💡 This rule is automatically fixable by the `--fix` CLI option and manually fixable by editor suggestions.

Prefer `Iterator#toArray()` over temporary arrays created with a single iterator spread.

`Iterator#toArray()` makes iterator-to-array conversion explicit and keeps iterator helper chains readable.

## Examples

```js
// ❌
const values = [...map.values()];

// ✅
const values = map.values().toArray();
```

```js
// ❌
const values = [...map.values().map(value => value * 2)];

// ✅
const values = map.values().map(value => value * 2).toArray();
```

This rule is intentionally narrow. It does not report arbitrary iterables because not every iterable has `Iterator#toArray()`.

```js
// ✅
const values = [...set];
```

Calls like `.values()`, `.keys()`, `.entries()`, and `.matchAll()` are reported as suggestions because custom methods with those names may return non-iterator iterables.

Iterable-accepting contexts are intentionally ignored because they do not need an array.

```js
// ✅
new Set([...map.values()]);
```

Mixed arrays and multi-spread arrays are intentionally ignored.

```js
// ✅
const values = [first, ...map.values()];

// ✅
const values = [...foo, ...bar];
```
