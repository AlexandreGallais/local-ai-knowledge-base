---
title: "jsonc/no-floating-decimal"
tool: "eslint-jsonc"
version: "3.4"
source: "https://github.com/ota-meshi/eslint-plugin-jsonc/blob/a9b64928d3c1d2500f03f126abcd1db1c13c3392/docs/rules/no-floating-decimal.md"
commit: "a9b64928d3c1d2500f03f126abcd1db1c13c3392"
license: "MIT"
---

# jsonc/no-floating-decimal

> disallow leading or trailing decimal points in numeric literals

- :gear: This rule is included in `configs["recommended-with-json"]` and `configs["recommended-with-jsonc"]`.
- :wrench: The `--fix` option on the command line can automatically fix some of the problems reported by this rule.

## :book: Rule Details

This rule is aimed at eliminating floating decimal points and will warn whenever a numeric value has a decimal point but is missing a number either before or after it.

Cannot use floating decimal points when in JSON and JSONC.

<eslint-code-block fix>

```json5
/* eslint jsonc/no-floating-decimal: 'error' */
{
    /* ✓ GOOD */
    "GOOD": 42.0,

    /* ✗ BAD */
    "BAD": 42.
}
```

</eslint-code-block>

## :wrench: Options

Nothing.

## :couple: Related rules

- [no-floating-decimal]
- [jsonc/valid-json-number]

## :rocket: Version

This rule was introduced in eslint-plugin-jsonc v0.9.0

## :mag: Implementation

- Rule source
- Test source

Taken with ❤️ from ESLint core
