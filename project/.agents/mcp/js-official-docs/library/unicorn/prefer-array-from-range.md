---
title: "prefer-array-from-range"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/prefer-array-from-range.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# prefer-array-from-range

📝 Prefer `Array.from({length}, …)` when creating range arrays.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

🔧 This rule is automatically fixable by the `--fix` CLI option.

Prefer `Array.from({length}, (_, index) => index)` when directly materializing a range from `Array(length).keys()` or `new Array(length).keys()`.

This rule only reports direct array materialization from `Array` constructor ranges. Lazy iterator use, `values()`, `entries()`, computed members, optional calls, and shadowed `Array` bindings are ignored.

The fix assumes the length is a valid array length. For invalid lengths, `Array(length)` throws (negative or fractional numbers) or creates a one-element array (non-number values), while `Array.from({length})` converts and clamps the length.

## Examples

```js
// ❌
const indexes = [...Array(length).keys()];

// ✅
const indexes = Array.from({length}, (_, index) => index);
```

```js
// ❌
const indexes = Array.from(Array(count + 1).keys());

// ✅
const indexes = Array.from({length: count + 1}, (_, index) => index);
```

```js
// ✅
for (const index of Array(length).keys()) {
	console.log(index);
}
```
