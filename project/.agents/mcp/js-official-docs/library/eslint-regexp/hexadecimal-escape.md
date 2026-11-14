---
title: "regexp/hexadecimal-escape"
tool: "eslint-regexp"
version: "3.3"
source: "https://github.com/ota-meshi/eslint-plugin-regexp/blob/8200d2990ca2685610c98ce2d0eefef23e35ed8f/docs/rules/hexadecimal-escape.md"
commit: "8200d2990ca2685610c98ce2d0eefef23e35ed8f"
license: "MIT"
---

# regexp/hexadecimal-escape

🔧 This rule is automatically fixable by the `--fix` CLI option.

> enforce consistent usage of hexadecimal escape

## :book: Rule Details

Characters that can use hexadecimal escape can use both hexadecimal escape and unicode escape.

This rule aims to enforce the consistent use of hexadecimal escapes.

<eslint-code-block fix>

```js
/* eslint regexp/hexadecimal-escape: "error" */

/* ✓ GOOD */
var foo = /\x0a/;

/* ✗ BAD */
var foo = /\u000a/;
var foo = /\u{a}/u;
```

</eslint-code-block>

## :wrench: Options

```json5
{
  "regexp/hexadecimal-escape": [
    "error",
    "always", // or "never"
  ]
}
```

- `"always"` ... Unicode escape characters that can use hexadecimal escape must always use hexadecimal escape. This is default.
- `"never"` ... Disallows the use of hexadecimal escapes on all characters.

### `"never"`

<eslint-code-block fix>

```js
/* eslint regexp/hexadecimal-escape: ["error", "never"] */

/* ✓ GOOD */
var foo = /\u000a/;
var foo = /\u{a}/u;

/* ✗ BAD */
var foo = /\x0a/;
```

</eslint-code-block>

## :couple: Related rules

- regexp/unicode-escape

## :rocket: Version

This rule was introduced in eslint-plugin-regexp v0.9.0

## :mag: Implementation

- Rule source
- Test source
