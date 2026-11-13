---
title: "no-useless-recursion"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/no-useless-recursion.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# no-useless-recursion

📝 Disallow simple recursive function calls that can be replaced with a loop.

💼🚫 This rule is enabled in the ✅ `recommended` config. This rule is _disabled_ in the ☑️ `unopinionated` config.

Recursive functions can throw a stack overflow error when they run too deeply. Simple tail-recursive functions are usually clearer as loops in JavaScript.

This rule intentionally only reports direct returned self-calls in named functions. More complex recursion can be useful and is left alone.

## Examples

```js
// ❌
function foo(bar) {
	if (bar.baz) {
		return foo(bar.baz);
	}

	return bar;
}
```

```js
// ✅
function foo(bar) {
	while (bar.baz) {
		bar = bar.baz;
	}

	return bar;
}
```

```js
// ✅
function foo(bar) {
	if (Array.isArray(bar)) {
		return bar.map(baz => foo(baz));
	}

	return bar;
}
```
