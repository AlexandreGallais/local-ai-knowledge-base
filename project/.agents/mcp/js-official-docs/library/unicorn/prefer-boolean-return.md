---
title: "prefer-boolean-return"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/prefer-boolean-return.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# prefer-boolean-return

📝 Prefer directly returning boolean expressions over `if` statements.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

🔧 This rule is automatically fixable by the `--fix` CLI option.

This rule simplifies `if` statements whose branches, or adjacent following `return`, only return boolean literals.

When the positive condition is known to produce a boolean, it is returned directly. Other positive conditions are wrapped in `Boolean(...)` to preserve the original boolean return type. Negated forms use `!condition`.

This rule intentionally ignores the final condition in a consecutive series of early returns with the same boolean value. Keeping guard clauses together is usually clearer than rewriting only the last one.

## Examples

```js
// ❌
function isValid(value) {
	if (value > 0) {
		return true;
	}

	return false;
}

// ✅
function isValid(value) {
	return value > 0;
}
```

```js
// ❌
function hasItems(items) {
	if (items.length) {
		return true;
	}

	return false;
}

// ✅
function hasItems(items) {
	return Boolean(items.length);
}
```

```js
// ❌
function isInvalid(value) {
	if (value > 0) {
		return false;
	}

	return true;
}

// ✅
function isInvalid(value) {
	return !(value > 0);
}
```
