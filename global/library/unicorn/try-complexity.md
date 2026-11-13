---
title: "try-complexity"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/try-complexity.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# try-complexity

📝 Limit the complexity of `try` blocks.

🚫 Disabled by default.

Large `try` blocks can make it unclear which operation is expected to throw. This rule uses the same cyclomatic complexity signals as ESLint's `complexity` rule, but only for the `try` block itself.

This rule counts decision points, not lines or statements. A `try` block with multiple straight-line statements has a complexity of `1`.

## Examples

```js
// ❌
try {
	if (condition) {
		doSomething();
	}
} catch (error) {
	handleError(error);
}

// ✅
try {
	doSomething();
	doSomethingElse();
} catch (error) {
	handleError(error);
}
```

```js
// ❌
try {
	const value = condition ? a : b;
} catch (error) {
	handleError(error);
}

// ✅
const value = condition ? a : b;

try {
	doSomething(value);
} catch (error) {
	handleError(error);
}
```

## Options

### max

Type: `integer`\
Default: `1`

The maximum allowed complexity of a `try` block.

```js
/* eslint unicorn/try-complexity: ["error", {"max": 2}] */
// ✅
try {
	if (condition) {
		doSomething();
	}
} catch (error) {
	handleError(error);
}
```
