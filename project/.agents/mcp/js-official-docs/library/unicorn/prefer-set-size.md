---
title: "prefer-set-size"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/prefer-set-size.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# prefer-set-size

📝 Prefer using `Set#size` instead of `Array#length`.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

🔧 This rule is automatically fixable by the `--fix` CLI option.

`Set#size` is a direct way to get the number of elements in a `Set`. Converting a `Set` to an array just to access its `.length` is inefficient and defeats the purpose of using a Set. The `size` property is O(1) and doesn't require any conversion.

## Examples

```js
// ❌
function isUnique(array) {
	return [...new Set(array)].length === array.length;
}

// ✅
function isUnique(array) {
	return new Set(array).size === array.length;
}
```

```js
// ❌
const items = new Set([1, 2, 3, 4, 5]);
if ([...items].length > 3) {
	// do something
}

// ✅
const items = new Set([1, 2, 3, 4, 5]);
if (items.size > 3) {
	// do something
}
```

```js
// ❌
const uniqueCount = [...new Set(userIds)].length;

// ✅
const uniqueCount = new Set(userIds).size;
```
