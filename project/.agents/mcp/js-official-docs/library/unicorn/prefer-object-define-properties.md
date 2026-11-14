---
title: "prefer-object-define-properties"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/prefer-object-define-properties.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# prefer-object-define-properties

📝 Prefer `Object.defineProperties()` over multiple `Object.defineProperty()` calls.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

🔧 This rule is automatically fixable by the `--fix` CLI option.

Prefer `Object.defineProperties()` when defining multiple properties on the same object.

A single call keeps related property definitions together and avoids repeating the target object.

This rule only checks adjacent `Object.defineProperty()` expression statements with the same target. `Reflect.defineProperty()` is intentionally ignored because it returns a boolean instead of throwing and there is no `Reflect.defineProperties()` equivalent.

The autofix is skipped when comments would be removed, when duplicate property keys can be detected, when a key or descriptor after the first one reads the target, calls a function, or uses `await` or `yield` (`Object.defineProperties()` evaluates every descriptor before it defines any property), or when the merged object would define the properties in a different order. An object literal iterates integer keys first, then string keys, then symbol keys, so `Object.defineProperty(foo, 'bar', …)` followed by `Object.defineProperty(foo, 0, …)` is reported without a fix. A dynamic key is assumed not to be an integer key.

## Examples

```js
// ❌
Object.defineProperty(foo, 'bar', {
	value: 1,
	writable: true,
});
Object.defineProperty(foo, 'baz', {
	value: 2,
	writable: true,
});

// ✅
Object.defineProperties(foo, {
	bar: {
		value: 1,
		writable: true,
	},
	baz: {
		value: 2,
		writable: true,
	},
});
```
