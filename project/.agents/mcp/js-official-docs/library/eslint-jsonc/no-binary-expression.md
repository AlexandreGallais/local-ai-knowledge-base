---
title: "jsonc/no-binary-expression"
tool: "eslint-jsonc"
version: "3.4"
source: "https://github.com/ota-meshi/eslint-plugin-jsonc/blob/a9b64928d3c1d2500f03f126abcd1db1c13c3392/docs/rules/no-binary-expression.md"
commit: "a9b64928d3c1d2500f03f126abcd1db1c13c3392"
license: "MIT"
---

# jsonc/no-binary-expression

> disallow binary expression

- :gear: This rule is included in all of `configs["recommended-with-json"]`, `configs["recommended-with-json5"]` and `configs["recommended-with-jsonc"]`.
- :wrench: The `--fix` option on the command line can automatically fix some of the problems reported by this rule.

## :book: Rule Details

This rule disallow binary expressions.

<eslint-code-block fix>

```json5
/* eslint jsonc/no-binary-expression: 'error' */
{
    /* ✓ GOOD */
    "GOOD": 86400,

    /* ✗ BAD */
    "BAD": 60 * 60 * 24
}
```

</eslint-code-block>

## :wrench: Options

Nothing.

## :rocket: Version

This rule was introduced in eslint-plugin-jsonc v2.0.0

## :mag: Implementation

- Rule source
- Test source
