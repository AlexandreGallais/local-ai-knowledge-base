---
title: "jsonc/no-useless-escape"
tool: "eslint-jsonc"
version: "3.4"
source: "https://github.com/ota-meshi/eslint-plugin-jsonc/blob/a9b64928d3c1d2500f03f126abcd1db1c13c3392/docs/rules/no-useless-escape.md"
commit: "a9b64928d3c1d2500f03f126abcd1db1c13c3392"
license: "MIT"
---

# jsonc/no-useless-escape

> disallow unnecessary escape usage

- :gear: This rule is included in all of `configs["recommended-with-json"]`, `configs["recommended-with-json5"]` and `configs["recommended-with-jsonc"]`.
- :bulb: Some problems reported by this rule are manually fixable by editor suggestions.

## :book: Rule Details

This rule flags escapes that can be safely removed without changing behavior.

<eslint-code-block>

```json5
/* eslint jsonc/no-useless-escape: 'error' */
{
    /* ✓ GOOD */
    "GOOD": "\"",

    /* ✗ BAD */
    "BAD": "hol\a"
}
```

</eslint-code-block>

## :wrench: Options

Nothing.

## :couple: Related rules

- [no-useless-escape]

## :rocket: Version

This rule was introduced in eslint-plugin-jsonc v0.1.0

## :mag: Implementation

- Rule source
- Test source

Taken with ❤️ from ESLint core
