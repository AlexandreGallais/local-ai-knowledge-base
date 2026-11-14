---
title: "no-duplicate-set-values"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/no-duplicate-set-values.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# no-duplicate-set-values

📝 Disallow duplicate values in `Set` constructor array literals.

💼🚫 This rule is enabled in the ✅ `recommended` config. This rule is _disabled_ in the ☑️ `unopinionated` config.

`Set` values are unique, so repeated static values in a `Set` constructor array literal are redundant.

This rule also reports repeated reference expressions, like `foo.bar`. It does not model mutations or side effects between elements.

## Examples

```js
// ❌
const set = new Set([
	'foo',
	'bar',
	'foo',
]);

// ✅
const set = new Set([
	'foo',
	'bar',
]);
```

```js
// ❌
const foo = 2;
const set = new Set([foo, 2]);

// ✅
const foo = 2;
const set = new Set([foo, 3]);
```

```js
// ❌
const set = new Set([foo.bar, foo.bar]);

// ✅
const set = new Set([foo.bar, foo.baz]);
```

This rule only checks `new Set([...])` with an array literal argument. It does not check arrays, maps, non-array iterables, or chained `Set#add()` calls.
