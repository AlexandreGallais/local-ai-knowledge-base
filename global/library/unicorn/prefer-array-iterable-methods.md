---
title: "prefer-array-iterable-methods"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/prefer-array-iterable-methods.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# prefer-array-iterable-methods

📝 Prefer iterating an array directly or with `Array#keys()` over `Array#entries()` when the index or value is unused.

💼🚫 This rule is enabled in the ✅ `recommended` config. This rule is _disabled_ in the ☑️ `unopinionated` config.

🔧 This rule is automatically fixable by the `--fix` CLI option.

`Array#entries()` yields `[index, value]` pairs. When a `for…of` loop discards one half of the pair, the `.entries()` call is unnecessary overhead and obscures intent.

When the index is unused, iterate the array directly. When the value is unused, use `Array#keys()`.

This rule intentionally only reports `for…of` loops, and only when the receiver is known to be an array. The transformation is unsafe for other built-ins, for example `Map`, whose `.entries()` and direct iteration both yield `[key, value]`.

Without TypeScript type information, only arrays recognized through syntax (an array literal, `Array()`/`new Array()`, `Array.from()`/`Array.of()`) or a simple type annotation are reported.

## Examples

```js
// ❌
for (const [, value] of array.entries()) {
	foo(value);
}

// ✅
for (const value of array) {
	foo(value);
}
```

```js
// ❌
for (const [index] of array.entries()) {
	foo(index);
}

// ✅
for (const index of array.keys()) {
	foo(index);
}
```

```js
// ✅
for (const [index, value] of array.entries()) {
	foo(index, value);
}
```
