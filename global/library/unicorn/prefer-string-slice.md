---
title: "prefer-string-slice"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/prefer-string-slice.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# prefer-string-slice

📝 Prefer `String#slice()` over `String#substr()` and `String#substring()`.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

🔧 This rule is automatically fixable by the `--fix` CLI option.

`String#substr()` is deprecated. `String#substring()` has confusing behavior with negative indices and swaps arguments when the first is greater than the second. `String#slice()` is the better choice: it handles negative indices intuitively and behaves consistently with `Array#slice()`.

This rule intentionally leaves supported one-character `substring()` patterns to `unicorn/prefer-at`, so enable both rules to catch both general string slicing and single-character access patterns.

Fixes assume that `.length` properties are not negative.

## Examples

```js
const str = 'hello world';

// ❌
str.substr(0, 5);

// ✅
str.slice(0, 5);
// → 'hello'
```

```js
const str = 'hello world';

// ❌
str.substring(6, 11);

// ✅
str.slice(6, 11);
// → 'world'
```

```js
const str = 'hello world';

// ❌ substring swaps arguments when start > end
str.substring(5, 0);
// → 'hello' (confusing!)

// ✅ slice handles it intuitively
str.slice(5, 0);
// → '' (empty, as expected)

// ✅ slice handles negative indices
str.slice(-5);
// → 'world' (last 5 characters)
```
