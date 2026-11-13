---
title: "prefer-regexp-test"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/prefer-regexp-test.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# prefer-regexp-test

📝 Prefer `RegExp#test()` over `String#match()`, `String#search()`, and `RegExp#exec()`.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

🔧💡 This rule is automatically fixable by the `--fix` CLI option and manually fixable by editor suggestions.

When you want to know whether a pattern is found in a string, use `RegExp#test()` instead of `String#match()`, `String#search()`, and `RegExp#exec()`, as it exclusively returns a boolean and therefore is more efficient.

In Vue templates, `String#match()` and `String#search()` inside event handler statement bodies or block statements are reported without fixes or suggestions.

## Examples

```js
// ❌
if (string.match(/unicorn/)) {}

// ❌
if (/unicorn/.exec(string)) {}

// ❌
if (string.match(/unicorn/).length > 0) {}

// ❌
if (string.search(/unicorn/) !== -1) {}

// ✅
if (/unicorn/.test(string)) {}
```

```vue
<template>
	<!-- ❌ -->
	<div v-if="/unicorn/.exec(string)">Vue</div>

	<!-- ✅ -->
	<div v-if="/unicorn/.test(string)">Vue</div>
</template>
```
