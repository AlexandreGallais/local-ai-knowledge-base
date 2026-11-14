---
title: "prefer-string-pad-start-end"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/prefer-string-pad-start-end.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# prefer-string-pad-start-end

📝 Prefer `String#padStart()` and `String#padEnd()` over manual string padding.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

🔧💡 This rule is automatically fixable by the `--fix` CLI option and manually fixable by editor suggestions.

Manual string padding using `String#repeat()` is less clear and can throw a `RangeError` when the string is already longer than the target length. `String#padStart()` and `String#padEnd()` express the intent directly and return the original string when no padding is needed.

This rule only reports static one-code-unit padding strings. Multi-character padding is ignored because `repeat()` concatenation and `padStart()` / `padEnd()` truncation are not equivalent.

Autofixes and suggestions are only offered when the target length is a numeric literal, the padding is literal, and the padded value is a simple identifier.

When the value is longer than the target length, `repeat()` throws for the negative count, while `padStart()` and `padEnd()` return the value unchanged. The fix removes that error.

A padded value known not to be a string, from syntax, TypeScript annotations, or TypeScript type information, is ignored, since `padStart()` and `padEnd()` do not exist on it. Unknown values are still reported.

## Examples

```js
// ❌ - Manual padding with repeat is error-prone
const formatted = '*'.repeat(10 - name.length) + name;

// ✅ - Clearer intent with padStart
const formatted = name.padStart(10, '*');
```

```js
// ❌
const padded = value + ' '.repeat(5 - value.length);

// ✅
const padded = value.padEnd(5, ' ');
```

```js
// ✅ - Practical example: formatting table data
const col1 = 'ID'.padEnd(10);
const col2 = 'Name'.padEnd(20);
const col3 = 'Value'.padStart(10);

// ✅ - Padding numbers for display
const hours = String(hours).padStart(2, '0');
const minutes = String(minutes).padStart(2, '0');
// → Outputs like "09:45"
```

The following patterns are reported with suggestions only, because they truncate strings that are already longer than the target length:

```js
// ❌
const foo = ('*'.repeat(10) + bar).slice(-10);

// 💡
const foo = bar.padStart(10, '*');
```

```js
// ❌
const foo = (bar + '*'.repeat(10)).slice(0, 10);

// 💡
const foo = bar.padEnd(10, '*');
```

## Scope and limitations

`String#padStart()` and `String#padEnd()` never truncate, `String#slice()` does. The `slice()` suggestions above are only equivalent while the target is no longer than the padding width. For a longer target, `('*'.repeat(10) + bar).slice(-10)` keeps the last 10 characters while `bar.padStart(10, '*')` returns `bar` unchanged, so the suggestion changes the result. Check the length before accepting it when the value can exceed the width.
