---
title: "prefer-block-statement-over-iife"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/prefer-block-statement-over-iife.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# prefer-block-statement-over-iife

📝 Prefer block statements over IIFEs used only for scoping.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

🔧 This rule is automatically fixable by the `--fix` CLI option.

IIFEs were commonly used to create a scope before JavaScript had block-scoped `let` and `const`. Use a block statement when the IIFE is only there for scoping.

This rule intentionally ignores IIFEs that use `return` from the IIFE body, accept arguments, use `async` or generators, or depend on function-specific behavior.

## Examples

```js
// ❌
(() => {
	const value = getValue();
	run(value);
})();

// ✅
{
	const value = getValue();
	run(value);
}
```

```js
// ❌
(function () {
	const value = getValue();
	run(value);
})();

// ✅
{
	const value = getValue();
	run(value);
}
```

```js
// ✅
const value = (() => {
	return getValue();
})();
```

```js
// ✅
(async () => {
	await run();
})();
```
