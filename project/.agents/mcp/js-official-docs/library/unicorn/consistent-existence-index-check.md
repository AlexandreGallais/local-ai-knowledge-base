---
title: "consistent-existence-index-check"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/consistent-existence-index-check.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# consistent-existence-index-check

📝 Enforce consistent style for element existence checks with `indexOf()`, `lastIndexOf()`, `findIndex()`, and `findLastIndex()`.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

🔧 This rule is automatically fixable by the `--fix` CLI option.

Enforce consistent style for element existence checks with `indexOf()`, `lastIndexOf()`, `findIndex()`, and `findLastIndex()`.

Prefer using `index === -1` to check if an element does not exist and `index !== -1` to check if an element does exist.

The value `-1` is the sentinel returned by these methods when no match is found, so comparing it directly with `===` or `!==` makes the check read as a not-found sentinel check instead of a numeric range check.

Similar to the `explicit-length-check` rule.

## Examples

```js
const index = foo.indexOf('bar');

// ❌
if (index < 0) {}

// ✅
if (index === -1) {}
```

```js
const index = foo.indexOf('bar');

// ❌
if (index >= 0) {}

// ✅
if (index !== -1) {}
```

```js
const index = foo.indexOf('bar');

// ❌
if (index > -1) {}

// ✅
if (index !== -1) {}
```

```js
const index = foo.lastIndexOf('bar');

// ❌
if (index >= 0) {}

// ✅
if (index !== -1) {}
```

```js
const index = array.findIndex(element => element > 10);

// ❌
if (index < 0) {}

// ✅
if (index === -1) {}
```

```js
const index = array.findLastIndex(element => element > 10);

// ❌
if (index < 0) {}

// ✅
if (index === -1) {}
```
