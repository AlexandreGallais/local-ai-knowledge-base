---
title: "no-object-as-default-parameter"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/no-object-as-default-parameter.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# no-object-as-default-parameter

📝 Disallow the use of objects as default parameters.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

Default parameters should not be passed to a function through an object literal. The `foo = {a: false}` parameter works fine if only used with one option. As soon as additional options are added, you risk replacing the whole `foo = {a: false, b: true}` object when passing only one option: `{a: true}`. For this reason, object destructuring should be used instead.

## Examples

```js
// ❌
function foo({a} = {a: false}) {}

// ✅
function foo(options) {
	const {a} = {a: false, ...options};
}
```

```js
// ❌
const abc = (foo = {a: false, b: 123}) => {};

// ✅
const foo = ({a = false, b = 123}) => {};
```

```js
// ✅
const abc = (foo = {}) => {};
```

```js
// ✅
const abc = (foo = false) => {};
```
