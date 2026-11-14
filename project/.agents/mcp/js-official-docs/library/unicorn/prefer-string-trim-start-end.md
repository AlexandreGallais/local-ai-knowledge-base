---
title: "prefer-string-trim-start-end"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/prefer-string-trim-start-end.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# prefer-string-trim-start-end

📝 Prefer `String#trimStart()` / `String#trimEnd()` over `String#trimLeft()` / `String#trimRight()`.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

🔧 This rule is automatically fixable by the `--fix` CLI option.

`String#trimLeft()` and `String#trimRight()` are deprecated aliases for `String#trimStart()` and `String#trimEnd()`. The newer names use direction-independent wording that works correctly with both left-to-right and right-to-left languages.

## Examples

```js
// ❌ - Deprecated names
const name = '  John  '.trimLeft();

// ✅ - Preferred method
const name = '  John  '.trimStart();
```

```js
// ❌
const value = text.trimRight();

// ✅
const value = text.trimEnd();
```

```js
// ✅ - All three do the same thing
const str = '  hello world  ';
str.trim();      // Remove from both sides
str.trimStart(); // Remove from beginning
str.trimEnd();   // Remove from end
```

## Why direction-independent naming?

`trimStart()` and `trimEnd()` are more appropriate for international text, as "left" and "right" don't make sense in right-to-left languages like Arabic or Hebrew.
