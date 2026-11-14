---
title: "prefer-unicode-code-point-escapes"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/prefer-unicode-code-point-escapes.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# prefer-unicode-code-point-escapes

📝 Prefer Unicode code point escapes over legacy escape sequences.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

🔧💡 This rule is automatically fixable by the `--fix` CLI option and manually fixable by editor suggestions.

Unicode code point escapes are more consistent than older escape forms. They use the actual code point value, which makes astral symbols easier to read than surrogate pairs.

Tagged templates are ignored because tags can observe their raw text. JSX attributes are ignored because backslashes are literal text there.

In strings and untagged template literals, non-printable four-digit `\uXXXX` escapes with shorter equivalents are left to `prefer-short-escape-sequences`. Regex literals continue to use code point escapes.

Regex literals without the `u` or `v` flag are reported with a suggestion instead of an autofix because adding Unicode mode can change how the rest of the regex is interpreted. The suggestion is only provided when the converted regex is still valid with the `u` flag. `require-unicode-regexp` can enforce Unicode regex mode more broadly.

`RegExp` constructor string patterns are intentionally ignored. Safely fixing those patterns requires handling both string escaping and regex escaping.

Printable ASCII hexadecimal and Unicode escapes in strings and untagged template literals are handled by `prefer-literal-ascii`. This rule continues to handle them in regular expressions.

## Examples

```js
// ❌
const foo = '\xA9';
const bar = '\u2661';
const baz = '\uD83D\uDCA9';

// ✅
const foo = '\u{A9}';
const bar = '\u{2661}';
const baz = '\u{1F4A9}';
```

```js
// ❌
const foo = `\xA9${bar}\u2661`;

// ✅
const foo = `\u{A9}${bar}\u{2661}`;
```

```js
// ❌
const foo = /\u0061/u;

// ✅
const foo = /\u{61}/u;
```

```js
// ❌
const foo = /\u0061/;

// ✅
const foo = /\u{61}/u;
```
