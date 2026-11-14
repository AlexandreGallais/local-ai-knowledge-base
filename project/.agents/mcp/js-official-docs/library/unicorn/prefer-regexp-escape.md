---
title: "prefer-regexp-escape"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/prefer-regexp-escape.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# prefer-regexp-escape

📝 Prefer `RegExp.escape()` for escaping strings to use in regular expressions.

🚫 Disabled by default.

🔧💡 This rule is automatically fixable by the `--fix` CLI option and manually fixable by editor suggestions.

`RegExp.escape()` escapes a string so it can be safely used as a literal pattern in the `RegExp` constructor.

This rule targets common hand-rolled escaping snippets, including reordered character classes and variants that miss some special characters. It also reports calls to popular escape helpers like `escape-string-regexp`, `lodash.escaperegexp`, and Lodash's `escapeRegExp`.

`RegExp.escape()` handles cases many of these snippets and packages miss, such as leading ASCII letters or digits and punctuators that cannot always be escaped with a leading backslash.

## Examples

```js
// ❌
const escaped = string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// ❌
const escaped = string.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&');

// ❌
import escapeStringRegexp from 'escape-string-regexp';

const escaped = escapeStringRegexp(string);

// ❌
const escaped = _.escapeRegExp(string);

// ✅
const escaped = RegExp.escape(string);
```

```js
// ✅
const escaped = string.replace(/[.*+?^$]/g, '\\$&');

// ✅
const escaped = string.replace(/[.*+?^${}()|[\]\\]/gy, '\\$&');
```

The rule is off by default because `RegExp.escape()` is a modern runtime API.
