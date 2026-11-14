---
title: "jsonc/no-octal"
tool: "eslint-jsonc"
version: "3.4"
source: "https://github.com/ota-meshi/eslint-plugin-jsonc/blob/a9b64928d3c1d2500f03f126abcd1db1c13c3392/docs/rules/no-octal.md"
commit: "a9b64928d3c1d2500f03f126abcd1db1c13c3392"
license: "MIT"
---

# jsonc/no-octal

> disallow legacy octal literals

- :gear: This rule is included in all of `configs["recommended-with-json"]`, `configs["recommended-with-json5"]` and `configs["recommended-with-jsonc"]`.

## :book: Rule Details

The rule disallows legacy octal literals.

<eslint-code-block>

```json5
/* eslint jsonc/no-octal: 'error' */
{
    /* ✓ GOOD */
    "GOOD": 777,

    /* ✗ BAD */
    "BAD": 0777
}
```

</eslint-code-block>

## :wrench: Options

Nothing.

## :couple: Related rules

- [no-octal]
- [jsonc/valid-json-number]

## :rocket: Version

This rule was introduced in eslint-plugin-jsonc v1.1.0

## :mag: Implementation

- Rule source
- Test source

Taken with ❤️ from ESLint core
