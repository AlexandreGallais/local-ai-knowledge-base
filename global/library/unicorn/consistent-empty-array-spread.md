---
title: "consistent-empty-array-spread"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/consistent-empty-array-spread.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# consistent-empty-array-spread

📝 Prefer consistent types when spreading a ternary in an array literal.

💼🚫 This rule is enabled in the ✅ `recommended` config. This rule is _disabled_ in the ☑️ `unopinionated` config.

🔧 This rule is automatically fixable by the `--fix` CLI option.

When spreading a ternary in an array, we can use both `[]` and `''` as fallbacks, but it's better to have consistent types in both branches.

## Examples

```js
// ❌
const array = [
	a,
	...(foo ? [b, c] : ''),
];

// ❌
const array = [
	a,
	...(foo ? 'bc' : []),
];

// ✅
const array = [
	a,
	...(foo ? [b, c] : []),
];

// ✅
const array = [
	a,
	...(foo ? 'bc' : ''),
];
```
