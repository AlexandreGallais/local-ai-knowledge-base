---
title: "prefer-string-match-all"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/prefer-string-match-all.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# prefer-string-match-all

📝 Prefer `String#matchAll()` over `RegExp#exec()` loops.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

🔧 This rule is automatically fixable by the `--fix` CLI option.

Prefer `String#matchAll()` over `RegExp#exec()` loops when collecting every match from a string.

`matchAll()` expresses collecting every match directly and avoids manual loop control around repeated `exec()` calls.

## Examples

```js
// ❌
const regexp = /foo/g;
const string = 'foofoo';
let match;
while ((match = regexp.exec(string)) !== null) {
	console.log(match);
}

// ✅
const regexp = /foo/g;
const string = 'foofoo';
for (const match of string.matchAll(regexp)) {
	console.log(match);
}
```
