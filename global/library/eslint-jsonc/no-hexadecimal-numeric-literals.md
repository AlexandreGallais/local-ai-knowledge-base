---
title: "jsonc/no-hexadecimal-numeric-literals"
tool: "eslint-jsonc"
version: "3.4"
source: "https://github.com/ota-meshi/eslint-plugin-jsonc/blob/a9b64928d3c1d2500f03f126abcd1db1c13c3392/docs/rules/no-hexadecimal-numeric-literals.md"
commit: "a9b64928d3c1d2500f03f126abcd1db1c13c3392"
license: "MIT"
---

# jsonc/no-hexadecimal-numeric-literals

> disallow hexadecimal numeric literals

- :gear: This rule is included in `configs["recommended-with-json"]` and `configs["recommended-with-jsonc"]`.
- :wrench: The `--fix` option on the command line can automatically fix some of the problems reported by this rule.

## :book: Rule Details

This rule disallow hexadecimal numeric literals.

Cannot use hexadecimal numeric literals when in JSON and JSONC.

<eslint-code-block fix>

```json5
/* eslint jsonc/no-hexadecimal-numeric-literals: 'error' */
{
    /* ✓ GOOD */
    "GOOD": 65535,

    /* ✗ BAD */
    "BAD": 0xFFFF
}
```

</eslint-code-block>

## :wrench: Options

Nothing.

## :couple: Related rules

- [jsonc/valid-json-number]

## :rocket: Version

This rule was introduced in eslint-plugin-jsonc v1.1.0

## :mag: Implementation

- Rule source
- Test source
