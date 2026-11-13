---
title: "prefer-single-replace"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/prefer-single-replace.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# prefer-single-replace

📝 Enforce combining multiple single-character replacements into a single `String#replaceAll()` with a regular expression.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

🔧 This rule is automatically fixable by the `--fix` CLI option.

A chain of replacements that each swap a single character for the same string scans the whole string once per call. When the replacements are global and share the same result, they can be combined into a single pass using a regular expression character class, which is both faster and clearer.

Only global replacements are handled: `String#replaceAll()` with a single-character string, and `String#replace()`/`String#replaceAll()` with a regex matching one literal character and the global flag. Plain `String#replace('a', …)` is left alone because it only replaces the first occurrence, so it has no character-class equivalent.

Replacement strings containing the prematch (`` $` ``) or postmatch (`$'`) substitution tokens are ignored because their substitutions change once the passes are merged. Replacement strings containing `$&` are ignored when a character is replaced more than once, because the later pass would replace the reintroduced match again.

## Examples

```js
// ❌
const slug = string.replaceAll('a', '-').replaceAll('b', '-').replaceAll('c', '-');

// ✅
const slug = string.replaceAll(/[abc]/g, '-');
```

```js
// ❌
const cleaned = string.replace(/a/g, '_').replaceAll('b', '_');

// ✅
const cleaned = string.replaceAll(/[ab]/g, '_');
```
