---
title: "no-negated-array-predicate"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/no-negated-array-predicate.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# no-negated-array-predicate

📝 Disallow negated array predicate calls.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

🔧 This rule is automatically fixable by the `--fix` CLI option.

Prefer swapping `Array#some()` and `Array#every()` with a negated predicate instead of negating the whole call.

This applies De Morgan's laws in the small, focused case where the callback has a directly returned expression.

In Vue templates, calls inside event handler statement bodies or block statements are reported without fixes.

## Examples

```js
// ❌
const isMissing = !array.some(element => isUnicorn(element));

// ✅
const isMissing = array.every(element => !isUnicorn(element));
```

```js
// ❌
const isNotEveryUnicorn = !array.every(element => isUnicorn(element));

// ✅
const isNotEveryUnicorn = array.some(element => !isUnicorn(element));
```

```js
// ❌
if (!array.some(element => !isUnicorn(element))) {}

// ✅
if (array.every(element => isUnicorn(element))) {}
```

```js
// ✅
if (!array.every(Boolean)) {}
```
