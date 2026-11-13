---
title: "no-lonely-if"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/no-lonely-if.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# no-lonely-if

📝 Disallow `if` statements as the only statement in `if` blocks without `else`.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

🔧 This rule is automatically fixable by the `--fix` CLI option.

This rule adds onto the built-in `no-lonely-if` rule, which only disallows `if` statements in `else`, not in `if`. It is recommended to use `unicorn/no-lonely-if` together with the core ESLint `no-lonely-if` rule.

Nested `if` statements add indentation without adding an alternative branch, making control flow harder to scan.

## Examples

```js
// ❌
if (foo) {
	if (bar) {
		// …
	}
}

// ✅
if (foo && bar) {
	// …
}
```

```js
// ❌
if (foo) {
	// …
} else if (bar) {
	if (baz) {
		// …
	}
}

// ✅
if (foo) {
	// …
} else if (bar && baz) {
	// …
}
```

```js
// ✅
if (foo) {
	// …
} else if (bar) {
	if (baz) {
		// …
	}
} else {
	// …
}
```

```js
// ✅
// Built-in rule `no-lonely-if` case https://eslint.org/docs/rules/no-lonely-if
if (foo) {
	// …
} else {
	if (bar) {
		// …
	}
}
```
