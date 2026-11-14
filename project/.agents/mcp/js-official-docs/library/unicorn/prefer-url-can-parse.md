---
title: "prefer-url-can-parse"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/prefer-url-can-parse.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# prefer-url-can-parse

📝 Prefer `URL.canParse()` over constructing a `URL` in a try/catch for validation.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

🔧 This rule is automatically fixable by the `--fix` CLI option.

Prefer `URL.canParse()` over constructing a `URL` in a `try`/`catch` block for validation.

`URL.canParse()` returns whether a string or stringifiable input can be parsed as a URL without constructing a `URL` object.

This rule intentionally only reports simple boolean validation patterns. It assumes the URL input is a normal string or stringifiable value and does not rewrite arbitrary `try`/`catch` control flow. It skips obviously unsafe argument expressions, such as expressions with side effects or inline values whose stringification/conversion could throw.

## Examples

```js
// ❌
try {
	new URL(value);
	return true;
} catch {
	return false;
}

// ✅
return URL.canParse(value);
```

```js
// ❌
let valid;
try {
	new URL(value, base);
	valid = true;
} catch {
	valid = false;
}

// ✅
let valid;
valid = URL.canParse(value, base);
```
