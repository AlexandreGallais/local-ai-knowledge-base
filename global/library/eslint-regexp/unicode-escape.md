---
title: "regexp/unicode-escape"
tool: "eslint-regexp"
version: "3.3"
source: "https://github.com/ota-meshi/eslint-plugin-regexp/blob/8200d2990ca2685610c98ce2d0eefef23e35ed8f/docs/rules/unicode-escape.md"
commit: "8200d2990ca2685610c98ce2d0eefef23e35ed8f"
license: "MIT"
---

# regexp/unicode-escape

🔧 This rule is automatically fixable by the `--fix` CLI option.

> enforce consistent usage of unicode escape or unicode codepoint escape

## :book: Rule Details

This rule aims to enforce the consistent use of unicode escapes or unicode code point escapes.

This rule does not check for characters that require surrogate pairs (e.g. `\ud83d\ude00`, `\u{1f600}`) and patterns that do not have the `u` flag.

If you want to enforce a character that requires a surrogate pair to unicode code point escape, use the [regexp/prefer-unicode-codepoint-escapes] rule.

<eslint-code-block fix>

```js
/* eslint regexp/unicode-escape: "error" */

/* ✓ GOOD */
var foo = /\u{41}/u;
var foo = /\u0041/; // do not have the `u` flag
var foo = /\ud83d\ude00/u; // surrogate pair

/* ✗ BAD */
var foo = /\u0041/u;
```

</eslint-code-block>

## :wrench: Options

```json5
{
  "regexp/unicode-escape": [
    "error",
    "unicodeCodePointEscape" // or "unicodeEscape"
  ]
}
```

- `"unicodeCodePointEscape"` ... Unicode escape characters must always use unicode code point escapes. This is default.
- `"unicodeEscape"` ... Unicode code point escape characters must always use unicode escapes.

### `"unicodeEscape"`

<eslint-code-block fix>

```js
/* eslint regexp/unicode-escape: ["error", "unicodeEscape"] */

/* ✓ GOOD */
var foo = /\u0041/u;

/* ✗ BAD */
var foo = /\u{41}/u;
```

</eslint-code-block>

## :couple: Related rules

- [regexp/hexadecimal-escape]
- [regexp/prefer-unicode-codepoint-escapes]
- [require-unicode-regexp]

## :rocket: Version

This rule was introduced in eslint-plugin-regexp v0.9.0

## :mag: Implementation

- Rule source
- Test source
