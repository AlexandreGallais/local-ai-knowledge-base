---
title: "prefer-map-from-entries"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/prefer-map-from-entries.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# prefer-map-from-entries

📝 Prefer `new Map()` over `Object.fromEntries()` when using the result as a map.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

🔧 This rule is automatically fixable by the `--fix` CLI option.

Use a `Map` when a value created from `Object.entries()` or known non-array-index string-keyed entry pairs is only used through map-like operations.

This rule only reports variables where the initializer and all references can be converted together. Unsupported references and unknown entry shapes are ignored instead of partially converting the variable.

Array-index keys are ignored because object key <example-value> does not always match `Map` iteration semantics.

## Examples

```js
// ❌
const object = Object.fromEntries(Object.entries(source));

if (Object.hasOwn(object, 'foo')) {
	console.log(object.foo);
}
```

```js
// ✅
const object = new Map(Object.entries(source));

if (object.has('foo')) {
	console.log(object.get('foo'));
}
```

```js
// ✅
const object = Object.fromEntries(entries);
foo(object);
```
