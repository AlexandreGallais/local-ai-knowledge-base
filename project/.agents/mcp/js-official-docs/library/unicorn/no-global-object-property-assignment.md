---
title: "no-global-object-property-assignment"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/no-global-object-property-assignment.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# no-global-object-property-assignment

📝 Disallow assigning properties on the global object.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

Disallow assigning properties on the global object.

Global object mutation makes it hard to see where state is created and can accidentally overwrite existing globals. Use module scope, explicit imports and exports, dependency injection, or a local singleton instead.

If assigning a global property is intentional, disable this rule locally.

Test-environment setup (for example, assigning `globalThis.window` from `jsdom`) and polyfills or shims are the common intentional cases. Rather than disabling the rule on each line, disable it for the whole file or directory through a config override:

```js
{
	files: ['test/**', '**/*.test.js'],
	rules: {
		'unicorn/no-global-object-property-assignment': 'off',
	},
}
```

## Examples

```js
// ❌
globalThis.foo = value;

// ❌
window.foo += 1;

// ❌
self.foo ||= value;
```

```js
// ✅
export const foo = value;

// ✅
const singleton = {
	foo: value,
};

// ✅
globalThis.foo;
```
