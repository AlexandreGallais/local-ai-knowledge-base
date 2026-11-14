---
title: "consistent-arrow-return-style"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/consistent-arrow-return-style.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# consistent-arrow-return-style

📝 Enforce a consistent return style for multiline arrow function bodies.

🚫 Disabled by default.

🔧 This rule is automatically fixable by the `--fix` CLI option.

Use concise bodies when the expression fits on one line and an explicit `return` when it spans multiple lines. A line break between `=>` and a single-line expression is ignored.

Only blocks with a single `return` and a single-line argument are converted. Blocks with other statements, bare returns, or multiline return expressions are ignored.

Fixes are omitted when reindenting could change string, template literal, or JSX text, or when removing the block could change how the following token is parsed.

This rule is an alternative to `arrow-body-style`. Do not enable both rules together.

## Examples

```js
// ❌
const getValue = () => getValueFromServer(
	url,
	options,
);

// ✅
const getValue = () => {
	return getValueFromServer(
		url,
		options,
	);
};

// ❌
const getValue = () => {
	return value;
};

// ✅
const getValue = () => value;

// ❌
const getObject = () => ({
	value,
});

// ✅
const getObject = () => {
	return {
		value,
	};
};

// ❌ No fix: contains a comment.
const getValue = () => /* Keep this comment. */
	getValueFromServer(
		url,
		options,
	);
```
