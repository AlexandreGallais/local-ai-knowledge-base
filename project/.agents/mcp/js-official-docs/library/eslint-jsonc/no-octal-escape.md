---
title: "jsonc/no-octal-escape"
tool: "eslint-jsonc"
version: "3.4"
source: "https://github.com/ota-meshi/eslint-plugin-jsonc/blob/a9b64928d3c1d2500f03f126abcd1db1c13c3392/docs/rules/no-octal-escape.md"
commit: "a9b64928d3c1d2500f03f126abcd1db1c13c3392"
license: "MIT"
---

# jsonc/no-octal-escape

> disallow octal escape sequences in string literals

## :book: Rule Details

This rule disallows octal escape sequences in string literals.

<eslint-code-block>

```json5
/* eslint jsonc/no-octal-escape: 'error' */
{
    /* ✓ GOOD */
    "GOOD": "Copyright \u00A9",

    /* ✗ BAD */
    "BAD": "Copyright \251"
}
```

</eslint-code-block>

## :wrench: Options

Nothing.

## :couple: Related rules

- [no-octal-escape]

## :rocket: Version

This rule was introduced in eslint-plugin-jsonc v0.1.0

## :mag: Implementation

- Rule source
- Test source

Taken with ❤️ from ESLint core
