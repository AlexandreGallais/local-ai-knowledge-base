---
title: "prefer-string-repeat"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/prefer-string-repeat.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# prefer-string-repeat

📝 Prefer `String#repeat()` for repeated whitespace.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

🔧 This rule is automatically fixable by the `--fix` CLI option.

Repeated whitespace in string literals and no-substitution template literals is hard to count. Use `String#repeat()` to make the count explicit.

This rule only reports string literals and no-substitution template literals made entirely of the same repeated whitespace character. It does not report repeated words or mixed whitespace.

## Examples

```js
// ❌
const indentation = '    ';

// ✅
const indentation = ' '.repeat(4);
```

```js
// ❌
const padding = '\t\t\t';

// ✅
const padding = '\t'.repeat(3);
```

```js
// ❌
const spaces = '\u2003\u2003\u2003';

// ✅
const spaces = '\u2003'.repeat(3);
```

```js
// ✅
const letters = 'aaa';

// ✅
const words = 'unicorn unicorn unicorn';

// ✅
const mixedWhitespace = ' \t ';
```

## Options

### `minimumRepetitions`

Type: `integer`\
Minimum: `2`\
Default: `3`

The minimum number of repeated whitespace characters before `String#repeat()` is enforced.

```js
/* eslint unicorn/prefer-string-repeat: ["error", {"minimumRepetitions": 2}] */

// ❌
const indentation = '  ';

// ✅
const indentation = ' '.repeat(2);
```
